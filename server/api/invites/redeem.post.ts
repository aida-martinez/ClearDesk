import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Authentication required' })
  }

  const { inviteCode } = await readBody(event)
  if (!inviteCode) {
    throw createError({ statusCode: 400, message: 'Invite code is required' })
  }

  const supabase = await serverSupabaseServiceRole(event)

  // 1. Fetch the invite code
  const { data: invite, error: inviteFetchError } = await supabase
    .from('referral_invites')
    .select('*')
    .eq('invite_code', inviteCode)
    .eq('status', 'active')
    .single()

  if (inviteFetchError || !invite) {
    throw createError({ statusCode: 404, message: 'Invalid or expired invite code' })
  }

  // 2. Check expiration
  const isExpired = invite.expires_at && new Date(invite.expires_at) < new Date()
  if (isExpired) {
    throw createError({ statusCode: 400, message: 'Invite code has expired' })
  }

  // 3. Logic for allowing codes based on user status and code type
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const isWaitlisted = profile?.subscription_status === 'waitlisted'

  if (invite.invite_type === 'waitlist_approval' && !isWaitlisted) {
     throw createError({ statusCode: 400, message: 'Waitlist approval codes can only be used by waitlisted users or during new registration.' })
  }

  if (invite.invite_type !== 'friends' && invite.invite_type !== 'waitlist_approval') {
     throw createError({ statusCode: 400, message: 'This type of code cannot be redeemed here.' })
  }

  const targetPlanCode = invite.target_plan_code || '0'

  // 4. Get the plan ID
  const { data: plan, error: planError } = await supabase
    .from('plans')
    .select('id, display_name')
    .eq('code', targetPlanCode)
    .single()

  if (planError || !plan) {
    throw createError({ statusCode: 500, message: 'Target plan not found' })
  }

  // 5. Update the user's subscription and profile
  // Update the existing subscription
  const { error: subUpdateError } = await supabase
    .from('subscriptions')
    .update({ 
      plan_id: plan.id,
      status: 'active' 
    } as any)
    .eq('user_id', user.id)

  if (subUpdateError) {
    throw createError({ statusCode: 500, message: 'Failed to update subscription' })
  }

  // Update profile status
  const { error: profileUpdateError } = await supabase
    .from('profiles')
    .update({ 
      subscription_status: targetPlanCode 
    } as any)
    .eq('id', user.id)

  if (profileUpdateError) {
    throw createError({ statusCode: 500, message: 'Failed to update profile' })
  }

  // 6. Mark code as used
  await supabase
    .from('referral_invites')
    .update({ status: 'used' } as any)
    .eq('invite_code', inviteCode)

  return {
    success: true,
    message: `Plan successfully changed to ${plan.display_name}`,
    plan: targetPlanCode
  }
})

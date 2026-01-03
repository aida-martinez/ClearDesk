import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  
  if (!user) {
    throw createError({ statusCode: 401, message: 'Authentication required' })
  }

  const supabase = await serverSupabaseServiceRole(event)
  
  // Check if user has available invites or is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('available_invites, role')
    .eq('id', user.id)
    .single() as { data: { available_invites: number, role: string } | null }

  const userEmail = user.email?.toLowerCase()
  const isAdminEmail = userEmail === 'aida-martinez@outlook.com'
  const isAdmin = profile?.role === 'admin' || isAdminEmail
  const hasInvites = profile ? profile.available_invites > 0 : false

  if (!isAdmin && !hasInvites) {
    if (!profile) {
        throw createError({ statusCode: 404, message: 'Profile not found' })
    }
    throw createError({ 
      statusCode: 403, 
      message: 'You do not have any available invites' 
    })
  }

  const { planCode, inviteType, expiresInDays } = await readBody(event)

  // Determine the target plan code based on invite type if not explicitly provided
  let targetPlanCode = planCode
  const type = inviteType || 'waitlist_approval'

  if (!targetPlanCode) {
    if (type === 'friends') {
      targetPlanCode = '1' // Friends plan
    } else {
      targetPlanCode = '0' // Free plan
    }
  }

  // Generate invite code
  const prefix = type === 'friends' ? 'FRIENDS-DESK' : 'CLEAR-DESK'
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
  const inviteCode = `${prefix}-${randomStr}`
  
  // Calculate expiration date if specified
  let expiresAt = null
  if (expiresInDays && expiresInDays > 0) {
    expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiresInDays)
  }

  // Create the invite
  const { error: inviteError } = await supabase
    .from('referral_invites')
    .insert({
      invite_code: inviteCode,
      referrer_user_id: user.id,
      invite_type: type,
      target_plan_code: targetPlanCode,
      status: 'active',
      expires_at: expiresAt
    } as any)

  if (inviteError) {
    console.error('Invite Creation Error:', inviteError)
    throw createError({ statusCode: 500, message: `Failed to create invite code: ${inviteError.message}` })
  }

  // Decrement available_invites for non-admin users
  if (!isAdmin && profile) {
    await supabase
      .from('profiles')
      .update({ available_invites: profile.available_invites - 1 } as any)
      .eq('id', user.id)
  }

  return { 
    success: true, 
    inviteCode,
    expiresAt
  }
})

import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabaseAdmin = await serverSupabaseServiceRole(event)

  // 1. If code exists, check validity
  if (body.inviteCode) {
    const { data: invite } = await supabaseAdmin
      .from('referral_invites')
      .select('*')
      .eq('invite_code', body.inviteCode)
      .eq('status', 'active')
      .single()

    // Check if code exists, is active, and NOT expired
    const isExpired = invite?.expires_at && new Date(invite.expires_at) < new Date()

    if (invite && !isExpired) {
      // 2. SUCCESS: Create user directly in Auth
      const { data: userData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true, // Auto-confirm since they have a code
        user_metadata: { 
          source: 'referral', 
          code: body.inviteCode,
          plan: invite.target_plan_code || '0'
        }
      })

      if (signUpError) throw createError({ statusCode: 400, message: signUpError.message })

      const newUser = userData.user

      // If the invite specified a special plan (not '0'), update the subscription
      // The DB trigger handle_new_user already created a '0' (free) subscription.
      if (invite.target_plan_code && invite.target_plan_code !== '0' && newUser) {
        const { data: plan } = await supabaseAdmin
          .from('plans')
          .select('id')
          .eq('code', invite.target_plan_code)
          .single()

        if (plan) {
          // Update the existing subscription created by the DB trigger
          await supabaseAdmin
            .from('subscriptions')
            .update({ plan_id: plan.id })
            .eq('user_id', newUser.id)
          
          // Also update the denormalized status in profiles
          await supabaseAdmin
            .from('profiles')
            .update({ subscription_status: invite.target_plan_code })
            .eq('id', newUser.id)
        }
      }

      // Mark code as used
      await supabaseAdmin.from('referral_invites').update({ status: 'used' }).eq('invite_code', body.inviteCode)

      return { status: 'success', message: 'Welcome! You can now log in.' }
    }
  }

  // 3. WAITLIST / FALLBACK: If no code, invalid code, or expired code
  const { error: waitlistError } = await supabaseAdmin
    .from('waitlist')
    .insert({ email: body.email })

  if (waitlistError) {
    if (waitlistError.code === '23505') throw createError({ statusCode: 400, message: 'You are already on the waitlist!' })
    throw createError({ statusCode: 400, message: 'Waitlist error. Please try again later.' })
  }

  return { status: 'waitlist', message: 'You have been added to our waitlist!' }
})


import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Register Request Body:', body)
  const supabaseAdmin = await serverSupabaseServiceRole(event)

  // 1. If code exists, check validity
  if (body.inviteCode) {
    const { data: invite } = (await supabaseAdmin
      .from('referral_invites')
      .select('*')
      .eq('invite_code', body.inviteCode)
      .eq('status', 'active')
      .single()) as { data: any }

    // Check if code exists, is active, and NOT expired
    const isExpired = invite?.expires_at && new Date(invite.expires_at) < new Date()

    if (invite && !isExpired) {
      // 2. SUCCESS: Create user directly in Auth
      // Both waitlist_approval and friends codes allow skipping the waitlist
      const { data: userData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true, // Auto-confirm since they have a code
        user_metadata: {
          display_name: body.display_name,
          source: 'invite',
          invite_code: body.inviteCode,
          invite_type: invite.invite_type,
          plan: invite.target_plan_code || '0',
        },
      })

      if (signUpError) throw createError({ statusCode: 400, message: signUpError.message })

      const newUser = userData.user

      // 3. Update profile with display name
      if (newUser && body.display_name) {
        await supabaseAdmin
          .from('profiles')
          .update({
            display_name: body.display_name
          } as any)
          .eq('id', newUser.id)
      }

      // If the invite specified a special plan (like 'friends' type), update the subscription
      // target_plan_code '0' is Free, '1' is Friends.
      const targetPlan = invite.target_plan_code || '0'
      
      if (targetPlan !== '0' && newUser) {
        const { data: plan } = (await supabaseAdmin
          .from('plans')
          .select('id')
          .eq('code', targetPlan)
          .single()) as { data: any }

        if (plan) {
          // Update the existing subscription created by the DB trigger
          await supabaseAdmin
            .from('subscriptions')
            .update({ plan_id: plan.id } as any)
            .eq('user_id', newUser.id)

          // Also update the denormalized status in profiles
          await supabaseAdmin
            .from('profiles')
            .update({
              subscription_status: targetPlan,
            } as any)
            .eq('id', newUser.id)
        }
      }

      // Mark code as used
      await supabaseAdmin
        .from('referral_invites')
        .update({ status: 'used' } as any)
        .eq('invite_code', body.inviteCode)

      return { status: 'success', message: 'Welcome! You can now log in.' }
    }
  }

  // 3. WAITLIST / FALLBACK: If no code, invalid code, or expired code
  // We now create the user in Auth immediately to preserve their password,
  // but we set their status to 'waitlisted' to block access.
  const { data: userData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
    user_metadata: {
      display_name: body.display_name,
      source: 'waitlist',
      status: 'waitlisted'
    },
  })

  if (signUpError) {
    if (signUpError.message.includes('already registered')) {
        throw createError({ statusCode: 400, message: 'This email is already registered or on the waitlist.' })
    }
    throw createError({ statusCode: 400, message: signUpError.message })
  }

  const newUser = userData.user

  if (newUser) {
    // 4. Update profile to 'waitlisted'
    // The DB trigger handle_new_user creates the profile, we update it.
    await supabaseAdmin
      .from('profiles')
      .update({
        display_name: body.display_name,
        subscription_status: 'waitlisted'
      } as any)
      .eq('id', newUser.id)
  }

  return { status: 'waitlist', message: 'You have been added to our waitlist! We will notify you when your account is approved.' }
})



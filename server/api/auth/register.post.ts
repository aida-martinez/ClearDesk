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

    if (invite) {
      // 2. SUCCESS: Create user directly in Auth
      const { error: signUpError } = await supabaseAdmin.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true, // Auto-confirm since they have a code
        user_metadata: { source: 'referral', code: body.inviteCode }
      })

      if (signUpError) throw createError({ statusCode: 400, message: signUpError.message })

      // Mark code as used
      await supabaseAdmin.from('referral_invites').update({ status: 'used' }).eq('invite_code', body.inviteCode)

      return { status: 'success', message: 'Welcome! You can now log in.' }
    }
  }

  // 3. WAITLIST: If no code or invalid code, just add to waitlist table
  const { error: waitlistError } = await supabaseAdmin
    .from('waitlist')
    .insert({ email: body.email })

  if (waitlistError) {
    if (waitlistError.code === '23505') throw createError({ statusCode: 400, message: 'You are already on the waitlist!' })
    throw createError({ statusCode: 400, message: 'Waitlist error. Please try again later.' })
  }

  return { status: 'waitlist', message: 'You have been added to our waitlist!' }
})
import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check if user is admin
  if (!(await isAdmin(event))) {
    throw createError({ statusCode: 403, message: 'Admin access required' })
  }

  const { email, planCode } = await readBody(event)

  if (!email) {
    throw createError({ statusCode: 400, message: 'Email is required' })
  }

  const supabase = await serverSupabaseServiceRole(event)
  const currentUser = await serverSupabaseUser(event)

  // Generate a unique invite code
  const inviteCode = `ADMIN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  
  // Create the invite code
  const { error: inviteError } = await supabase
    .from('referral_invites')
    .insert({
      invite_code: inviteCode,
      referrer_user_id: currentUser!.id,
      target_plan_code: planCode || '1', // Default to Friends plan
      status: 'active',
      expires_at: null // Admin codes don't expire by default
    })

  if (inviteError) {
    throw createError({ statusCode: 500, message: 'Failed to create invite code' })
  }

  // Optionally remove from waitlist
  await supabase
    .from('waitlist')
    .delete()
    .eq('email', email)

  return { 
    success: true, 
    inviteCode,
    message: `Invite code created for ${email}. Send them this code to register.`
  }
})

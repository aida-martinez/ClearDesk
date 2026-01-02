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

  // 1. Find the user by email to get their ID
  const { data: userData, error: userError } = await supabase.auth.admin.listUsers()
  if (userError) throw userError
  
  const userToApprove = userData.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  if (!userToApprove) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  // 2. Update status in Auth Metadata
  const { error: authError } = await supabase.auth.admin.updateUserById(userToApprove.id, {
    user_metadata: { ...userToApprove.user_metadata, status: 'active' }
  })
  if (authError) throw authError

  // 3. Update subscription_status and reset created_at to approval date
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ 
      subscription_status: planCode || '0',
      created_at: new Date().toISOString()
    } as any)
    .eq('id', userToApprove.id)


  if (profileError) throw profileError



  return { 
    success: true, 
    message: `User ${email} has been approved and can now log in.`
  }
})


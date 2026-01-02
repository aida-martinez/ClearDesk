import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check if user is admin
  if (!(await isAdmin(event))) {
    throw createError({ statusCode: 403, message: 'Admin access required' })
  }

  const { email } = await readBody(event)

  if (!email) {
    throw createError({ statusCode: 400, message: 'Email is required' })
  }

  const supabase = await serverSupabaseServiceRole(event)

  // 1. Find the user by email to get their ID
  const { data: userData, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) throw listError
  
  const userToDelete = userData.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  
  // 2. If user exists in Auth, delete them (cascades to Profile)
  if (userToDelete) {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userToDelete.id)
    if (deleteError) {
      console.error('Failed to delete auth user:', deleteError)
      // We continue to try cleaning up the waitlist table anyway
    }
  }



  return { success: true, message: `User ${email} has been removed.` }
})


import { serverSupabaseUser, serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'

/**
 * Check if the current user has admin role
 */
export async function isAdmin(event: any): Promise<boolean> {
  const user = await serverSupabaseUser(event)
  if (!user) {
    console.log('isAdmin: No user found in session')
    return false
  }

  const supabase = await serverSupabaseServiceRole(event)
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single() as { data: { role: string } | null, error: any }

  if (error) {
    console.error('isAdmin: Error fetching profile:', error.message)
    // Fallback: Check email if profile query fails
    if (user.email === 'aida-martinez@outlook.com') {
      console.log('isAdmin: Falling back to email check for aida-martinez@outlook.com')
      return true
    }
    return false
  }

  const isUserAdmin = profile?.role === 'admin' || user.email === 'aida-martinez@outlook.com'
  console.log(`isAdmin: User ${user.email} (ID: ${user.id}) role is "${profile?.role}". Admin status: ${isUserAdmin}`)
  
  return isUserAdmin
}

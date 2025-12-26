import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

/**
 * Check if the current user has admin role
 */
export async function isAdmin(event: any): Promise<boolean> {
  const user = await serverSupabaseUser(event)
  if (!user) return false

  const supabase = await serverSupabaseClient(event)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return profile?.role === 'admin'
}

import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'

interface Profile {
  display_name: string | null
  avatar_url: string | null
  role: string
  subscription_status: string
  created_at: string
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Authentication required' })
  }

  const supabaseAdmin = await serverSupabaseServiceRole(event)
  
  // 1. Try to fetch profile by ID (primary method)
  let { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: any | null, error: any }

  // 2. Fallback: If not found by ID, search by Email in Auth and then find profile
  if (!profile || (error && error.code === 'PGRST116')) {
    const { data: authData } = await supabaseAdmin.auth.admin.listUsers()
    const targetUser = authData.users.find(u => u.email?.toLowerCase() === user.email?.toLowerCase())
    
    if (targetUser && targetUser.id !== user.id) {
       // Found another account with same email, let's see if it has a profile
       const { data: altProfile } = await supabaseAdmin
         .from('profiles')
         .select('*')
         .eq('id', targetUser.id)
         .single()
       
       if (altProfile) {
         profile = altProfile
       }
    }
  }

  if (error && error.code !== 'PGRST116') {
    console.error('API /api/me error:', error)
  }

  const userEmail = user.email?.toLowerCase()

  const isAdminEmail = userEmail === 'aida-martinez@outlook.com'

  // Ensure role consistency for the main admin email
  const effectiveRole = 
    profile?.role === 'admin' || isAdminEmail
      ? 'admin' 
      : (profile?.role || 'member')

  // Return a synthetic profile if DB one is missing, to keep frontend happy
  return { 
    profile: {
      display_name: profile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || 'User',
      avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || null,
      role: effectiveRole,
      subscription_status: profile?.subscription_status || '0',
      created_at: profile?.created_at || user.created_at || new Date().toISOString()
    } 
  }
})

import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  
  if (!user) {
    throw createError({ statusCode: 401, message: 'Authentication required' })
  }

  const supabase = await serverSupabaseServiceRole(event)

  // Determine if user is admin to decide which invites to show
  const userEmail = user.email?.toLowerCase()
  const isAdminEmail = userEmail === 'aida-martinez@outlook.com'
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single() as { data: { role: string } | null }

  const isAdmin = profile?.role === 'admin' || isAdminEmail

  let query = supabase
    .from('referral_invites')
    .select('*')
    .eq('status', 'active')

  // If not admin, only show their own
  if (!isAdmin) {
    query = query.eq('referrer_user_id', user.id)
  }

  const { data: invites, error } = await query.order('created_at', { ascending: false })

  if (error) {
    throw createError({ statusCode: 500, message: 'Failed to fetch invites' })
  }

  return invites
})

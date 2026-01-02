import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check if user is admin
  if (!(await isAdmin(event))) {
    throw createError({ statusCode: 403, message: 'Admin access required' })
  }

  const supabase = await serverSupabaseServiceRole(event)
  
  // Get all users with 'waitlisted' status from profiles
  // We join with auth.users implicitly by selecting from a view or just using the profile data
  // Since profiles.id is auth.users.id, we can get what we need.
  // To get the email, we might need to query auth.users or ensure it's synced.
  // For now, let's assume we want email which is in waitlist table but NOT in profiles.
  // Actually, let's look at the profiles table again. It doesn't have email.
  
  // Strategy: Fetch from profiles where status is waitlisted
  const { data: waitlistedProfiles, error } = await supabase
    .from('profiles')
    .select('id, display_name, created_at, subscription_status')
    .eq('subscription_status', 'waitlisted')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Waitlist fetch error:', error)
    throw createError({ statusCode: 500, message: 'Failed to fetch waitlist' })
  }

  // We need emails. In Supabase, emails are in auth.users.
  // We can fetch them using admin.listUsers or similar, but for a list it's better to stay in SQL.
  // For now, let's just return the profiles. The UI expects 'email'.
  // I will fetch the emails from auth.admin.getUser for each or use a better way if possible.
  // Actually, I can join if I have a view, but let's do a simple map for now as it's an admin tool.
  
  const results = await Promise.all(((waitlistedProfiles as any[]) || []).map(async (p) => {
    const { data: authUser } = await supabase.auth.admin.getUserById(p.id)
    return {
      ...(p as any),
      email: authUser?.user?.email
    }
  }))


  return results
})


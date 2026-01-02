import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check if user is admin
  if (!(await isAdmin(event))) {
    throw createError({ statusCode: 403, message: 'Admin access required' })
  }

  const supabase = await serverSupabaseServiceRole(event)

  try {
    // Run queries in parallel for efficiency
    const [
      { count: totalUsers },
      { count: freeUsers },
      { count: premiumUsers },
      { count: pendingWaitlist },
      { count: familyUsers },
      { count: friends }
    ] = await Promise.all([
      // Total active (non-waitlisted) users
      supabase.from('profiles').select('*', { count: 'exact', head: true }).neq('subscription_status', 'waitlisted'),
      
      // Free users (subscription_status = '0')
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('subscription_status', '0'),
      
      // Premium/Pro users (subscription_status = '2')
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('subscription_status', '2'),
      
      // Pending waitlist
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('subscription_status', 'waitlisted'),

      // Family
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('subscription_status', '3'),

      // Friends
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('subscription_status', '1')
    ])

    return {
      totalUsers: totalUsers || 0,
      freeUsers: freeUsers || 0,
      premiumUsers: premiumUsers || 0,
      pendingWaitlist: pendingWaitlist || 0,
      familyUsers: familyUsers || 0,
      friends: friends || 0
    }
  } catch (e: any) {
    throw createError({ 
      statusCode: 500, 
      message: `Failed to fetch stats: ${e.message}` 
    })
  }
})

import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Check if user is admin
  if (!(await isAdmin(event))) {
    throw createError({ statusCode: 403, message: 'Admin access required' })
  }

  const supabase = await serverSupabaseServiceRole(event)
  
  // Get all waitlist entries, ordered by creation date
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({ statusCode: 500, message: 'Failed to fetch waitlist' })
  }

  return data
})

import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  
  // Attempt to fetch from the waitlist table (which normally requires admin)
  const { data, error } = await client.from('waitlist').select('*')
  
  if (error) {
    return { status: 'Error', message: error.message }
  }
  
  return { status: 'Success', message: 'Server is talking to Supabase using the Service Key!' }
})
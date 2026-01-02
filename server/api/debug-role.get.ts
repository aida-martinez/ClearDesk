import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)
  
  if (!user) return { error: 'No user session' }

  const { data: profile } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata
    },
    profile
  }
})

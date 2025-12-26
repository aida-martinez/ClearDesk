import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: userData, error: userError } = await client.auth.getUser()
  if (userError) {
    throw createError({ statusCode: 401, message: userError.message })
  }

  const userId = userData.user?.id
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Authentication required' })
  }

  const { data: profile, error } = await client
    .from('profiles')
    .select('avatar_url, role, subscription_status')
    .eq('id', userId)
    .single()

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return { profile }
})

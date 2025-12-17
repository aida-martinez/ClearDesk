import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )

  const user = useState('supabase-user', () => null)

  // Initialize user from session
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user ?? null

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })

  return {
    provide: {
      supabase,
    },
  }
})

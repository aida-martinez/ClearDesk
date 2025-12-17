export default defineNuxtRouteMiddleware((to) => {
  // Client-side only auth check since we don't have server-side session handling yet
  // Client-side only auth check since we don't have server-side session handling yet
  // if (import.meta.server) return

  // Skip if explicitly public
  if (to.meta.auth === false) {
    return
  }

  const user = useSupabaseUser()

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})

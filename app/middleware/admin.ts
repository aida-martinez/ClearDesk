export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()
    
    if (!user.value) {
        return navigateTo('/login')
    }
    
    // We strictly use the profile table as the source of truth for the admin role

    // Use centralized utility for admin check
    // Check the profile role from our source of truth API
    try {
        const fetch = useRequestFetch()
        const data = await fetch<{ profile: any }>('/api/me')
        if (data?.profile?.role === 'admin') {
            return
        }
    } catch (e) {
        console.error('Admin middleware: verification failed', e)
    }
    
    // If we're here, access is denied
    return navigateTo('/dashboard')
})


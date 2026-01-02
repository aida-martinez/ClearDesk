export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    // 1. Guest-only routes (Login, Register)
    // If user is logged in and trying to access a guest-only page, go to dashboard
    if (to.meta.guestOnly && user.value) {
        return navigateTo('/dashboard')
    }

    // 2. Public routes (Landing Page, etc.)
    // If auth is explicitly false, we don't need to do any further checks
    if (to.meta.auth === false) {
        return
    }

    // 3. Auth-required routes (Dashboard, etc.)
    // If no user is logged in, redirect to login
    if (!user.value) {
        return navigateTo('/login')
    }

    // 4. Waitlist check
    // If user is waitlisted, they can only access /waitlisted
    const userStatus = user.value.user_metadata?.status || 'active'
    if (userStatus === 'waitlisted' && to.path !== '/waitlisted') {
        return navigateTo('/waitlisted')
    }
    
    // If user is NOT waitlisted but tries to access /waitlisted, send to dashboard
    if (userStatus !== 'waitlisted' && to.path === '/waitlisted') {
        return navigateTo('/dashboard')
    }
})


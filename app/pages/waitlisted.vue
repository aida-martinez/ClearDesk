<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

definePageMeta({
    // auth.global.ts is global
})

const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigateTo('/login')
}

// Redirect away if they are no longer waitlisted
const { data: meData } = await useFetch<{ profile: any }>('/api/me')
watchEffect(() => {
    if (meData.value?.profile?.subscription_status !== 'waitlisted') {
        navigateTo('/dashboard')
    }
})

useHead({
    title: 'Waitlist - ClearDesk',
})
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8 text-center">
            <div class="flex justify-center">
                <div class="rounded-full bg-blue-100 p-3">
                    <Icon name="ph:clock-countdown-bold" class="h-12 w-12 text-blue-600" />
                </div>
            </div>
            
            <div>
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                    You're on the list!
                </h2>
                <p class="mt-4 text-sm text-gray-600">
                    Thanks for joining ClearDesk. We're currently approving new members in batches to ensure the best experience for everyone.
                </p>
                <div class="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p class="text-sm font-medium text-blue-800">
                        Status: <span class="capitalize">Pending Approval</span>
                    </p>
                </div>
                <p class="mt-4 text-xs text-gray-500">
                    We'll send an email to <span class="font-medium">{{ user?.email }}</span> as soon as your account is ready.
                </p>
            </div>

            <div class="flex flex-col gap-4">
                <button
                    @click="handleSignOut"
                    class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                >
                    Sign out
                </button>
                <NuxtLink
                    to="/redeem"
                    class="flex w-full justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition-colors hover:bg-emerald-100"
                >
                    Have an invite code?
                </NuxtLink>
                <NuxtLink
                    to="/"
                    class="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                    Back to home
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

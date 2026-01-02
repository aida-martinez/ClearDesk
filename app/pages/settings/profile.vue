<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

// Fetch profile data from our API
const {
    data: meData,
    pending: loading,
    refresh: refreshProfile,
} = await useFetch<{ profile: any }>('/api/me', {
    watch: [user],
    immediate: true,
})

// Fresh profile helper
const profile = computed(() => meData.value?.profile || null)

// Refresh session to get latest metadata on mount
onMounted(async () => {
    if (user.value) {
        await supabase.auth.refreshSession()
        await refreshProfile()
    }
})

const displayName = computed(() => {
    return profile.value?.display_name || user.value?.email || 'User'
})

const email = computed(() => user.value?.email || '')

const memberSince = computed(() => {
    const rawDate =
        profile.value?.created_at || user.value?.created_at
    if (!rawDate) return '...'
    
    const date = new Date(rawDate)
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date)
})


const isAdmin = computed(() => {
    return profile.value?.role === 'admin'
})

const planName = computed(() => {
    if (isAdmin.value) return 'Admin'

    const plan = profile.value?.subscription_status || '0'
    const planNames: Record<string, string> = {
        '0': 'Free Plan',
        '1': 'Friends',
        pro: 'Pro Plan',
        team: 'Team Plan',
    }
    return planNames[plan] || 'Free Plan'
})

const avatarUrl = computed(() => profile.value?.avatar_url)

const initials = computed(() => {
    const name = displayName.value
    if (name.includes('@')) {
        return name.substring(0, 2).toUpperCase()
    }
    return name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
})

useHead({
    title: 'Profile - ClearDesk',
})
</script>

<template>
    <div class="min-h-screen bg-neutral-50 pt-8 pb-12">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-2xl font-semibold text-neutral-900">Profile</h1>
                <p class="mt-1 text-sm text-neutral-500">
                    Manage your account and preferences
                </p>
            </div>

            <!-- Loading State -->

            <div v-if="loading" class="flex items-center justify-center py-12">
                <div
                    class="border-t-primary-500 h-8 w-8 animate-spin rounded-full border-2 border-neutral-200"
                ></div>
            </div>

            <template v-else>
                <!-- Profile Summary Card -->
                <div
                    class="mb-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                    <div class="flex items-start gap-6">
                        <!-- Avatar -->
                        <div class="relative">
                            <div
                                class="bg-primary-500 flex h-20 w-20 items-center justify-center rounded-full text-xl font-medium text-white ring-4 ring-white transition-transform hover:scale-105"
                            >
                                <img
                                    v-if="avatarUrl"
                                    :src="avatarUrl"
                                    alt="Profile"
                                    class="h-full w-full rounded-full object-cover"
                                />
                                <span v-else>{{ initials }}</span>
                            </div>
                            <button
                                class="bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 absolute -right-1 -bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white shadow-md ring-2 ring-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                            >
                                <span class="sr-only">Change Avatar</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="h-4 w-4"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.007 3h3.986a2 2 0 011.6.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7.75a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm8.5 7a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM7 10.5a3 3 0 116 0 3 3 0 01-6 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        <!-- Info -->
                        <div class="pt-1">
                            <h2 class="text-xl font-medium text-neutral-900">
                                {{ displayName }}
                            </h2>
                            <p class="text-sm text-neutral-500">{{ email }}</p>
                            <div class="mt-3 flex items-center gap-3">
                                <span
                                    class="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800"
                                >
                                    {{ planName }}
                                </span>
                                <span class="text-xs text-neutral-400"
                                    >Member since {{ memberSince }}
                                </span>


                            </div>
                        </div>
                    </div>
                </div>

                <!-- Details Card -->
                <div
                    class="mb-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >
                    <div class="divide-y divide-neutral-100">
                        <!-- Display Name -->
                        <div
                            class="flex flex-col gap-4 p-6 sm:flex-row sm:items-start"
                        >
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-400"
                            >
                                <!-- User Icon -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="text-primary-500 h-5 w-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                    />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3
                                    class="text-sm font-medium text-neutral-900"
                                >
                                    Display Name
                                </h3>
                                <div class="mt-1 text-sm text-neutral-500">
                                    {{ displayName }}
                                </div>
                                <button
                                    class="text-primary-600 hover:text-primary-700 mt-2 text-sm font-medium hover:underline"
                                >
                                    Edit name
                                </button>
                            </div>
                        </div>

                        <!-- Email -->
                        <div
                            class="flex flex-col gap-4 p-6 sm:flex-row sm:items-start"
                        >
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-400"
                            >
                                <!-- Email Icon -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="text-primary-500 h-5 w-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3
                                    class="text-sm font-medium text-neutral-900"
                                >
                                    Email Address
                                </h3>
                                <div class="mt-1 text-sm text-neutral-500">
                                    {{ email }}
                                </div>
                                <div class="mt-2 text-xs text-neutral-400">
                                    Email cannot be changed
                                </div>
                            </div>
                        </div>

                        <!-- Password -->
                        <div
                            class="flex flex-col gap-4 p-6 sm:flex-row sm:items-start"
                        >
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-400"
                            >
                                <!-- Lock Icon -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="text-primary-500 h-5 w-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3
                                    class="text-sm font-medium text-neutral-900"
                                >
                                    Password
                                </h3>
                                <div
                                    class="mt-1 font-mono text-sm tracking-wider text-neutral-500"
                                >
                                    ••••••••
                                </div>
                                <button
                                    class="text-primary-600 hover:text-primary-700 mt-2 text-sm font-medium hover:underline"
                                >
                                    Change password
                                </button>
                            </div>
                        </div>

                        <!-- Plan & Billing -->
                        <div
                            class="flex flex-col gap-4 p-6 sm:flex-row sm:items-start"
                        >
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-400"
                            >
                                <!-- Credit Card Icon -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="text-primary-500 h-5 w-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3
                                    class="text-sm font-medium text-neutral-900"
                                >
                                    Plan & Billing
                                </h3>
                                <div class="mt-2 text-sm text-neutral-500">
                                    <span
                                        class="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800"
                                        >{{ planName }}</span
                                    >
                                </div>
                                <div class="mt-2 text-sm text-neutral-500">
                                    <span v-if="!isAdmin"
                                        >You're currently on the
                                        {{ planName }}</span
                                    >
                                    <span v-else
                                        >You have full administrative
                                        access</span
                                    >
                                </div>
                                <button
                                    v-if="!isAdmin"
                                    class="bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/20 focus:ring-primary-500 mt-4 rounded-lg px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:shadow focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                >
                                    Upgrade to Premium
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Danger Zone -->
                <div
                    class="overflow-hidden rounded-2xl border border-red-100 bg-red-50 p-6"
                >
                    <h3 class="text-base font-semibold text-red-600">
                        Danger Zone
                    </h3>
                    <p class="mt-2 text-sm text-neutral-600">
                        Once you delete your account, there is no going back.
                        Please be certain.
                    </p>
                    <div class="mt-4">
                        <button
                            class="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow hover:shadow-red-600/20 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

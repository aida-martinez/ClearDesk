<script setup lang="ts">
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const isLanding = computed(() => route.path === '/')
const isAuthPage = computed(() => ['/login', '/register'].includes(route.path))

// Profile State
const { data: meData, refresh: refreshProfile } = await useFetch<{
    profile: any
}>('/api/me', {
    watch: [user],
    immediate: true,
})

const profile = computed(() => meData.value?.profile || null)

// Dropdown state
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

// Close dropdown when clicking outside
const closeDropdown = (event: MouseEvent) => {
    if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target as Node)
    ) {
        isDropdownOpen.value = false
    }
}

onMounted(async () => {
    document.addEventListener('click', closeDropdown)
    if (user.value) {
        await supabase.auth.refreshSession()
    }
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
})

// Computed properties for display
const isAdmin = computed(() => {
    return profile.value?.role === 'admin'
})

const displayName = computed(() => {
    return profile.value?.display_name || user.value?.email || 'User'
})

const avatarUrl = computed(() => {
    return profile.value?.avatar_url || null
})

const displayBadge = computed(() => {
    if (isAdmin.value) return 'Admin'

    // Get plan from profile
    const planCode = profile.value?.subscription_status || '0'

    // Map plan codes to names
    const planNames: Record<string, string> = {
        '0': 'Free Plan',
        '1': 'Friends',
        pro: 'Pro Plan',
        team: 'Team Plan',
    }

    return planNames[planCode as string] || 'Free Plan'
})

const handleSignOut = async () => {
    await supabase.auth.signOut()
    // Clear profile on sign out
    meData.value = undefined
    navigateTo('/login')
}
</script>

<template>
    <header
        :class="[
            isLanding ? 'fixed top-0 right-0 left-0' : '',
            'z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md transition-all duration-300',
        ]"
    >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <!-- Logo -->
                <NuxtLink :to="user ? '/dashboard' : '/'" class="group">
                    <img
                        src="/images/logo.svg"
                        alt="ClearDesk Logo"
                        class="h-12 w-auto"
                    />
                    <span class="sr-only">ClearDesk</span>
                </NuxtLink>

                <div class="flex items-center gap-4">
                    <!-- CTA Buttons -->
                    <div class="flex items-center gap-4">
                        <template v-if="!user">
                            <div
                                v-if="!isAuthPage"
                                class="flex items-center gap-4"
                            >
                                <NuxtLink
                                    to="/login"
                                    class="hover:text-primary-600 text-sm font-medium text-neutral-600 transition-colors"
                                >
                                    Sign in
                                </NuxtLink>
                                <NuxtLink
                                    to="/register"
                                    class="bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/30 focus:ring-primary-500 hidden items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none sm:inline-flex"
                                >
                                    Join the waitlist
                                </NuxtLink>
                            </div>
                        </template>
                        <template v-else>
                            <NuxtLink
                                to="/new"
                                class="button-action button-action--sm mr-4 flex! items-center justify-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="h-5 w-5"
                                >
                                    <path
                                        d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                                    />
                                </svg>
                                New Responsibility
                            </NuxtLink>
                            <!-- User Dropdown -->
                            <div class="relative" ref="dropdownRef">
                                <button
                                    @click="toggleDropdown"
                                    class="flex cursor-pointer items-center gap-3 rounded-full py-1 pr-1 pl-1 transition-colors hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-200 focus:outline-none"
                                >
                                    <!-- User Avatar -->
                                    <div
                                        class="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100"
                                    >
                                        <img
                                            v-if="avatarUrl"
                                            :src="avatarUrl"
                                            alt="User avatar"
                                            class="h-full w-full object-cover"
                                        />
                                        <div
                                            v-else
                                            class="flex h-full w-full items-center justify-center text-neutral-400"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                class="h-6 w-6"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <!-- Name & Role -->
                                    <div
                                        class="mr-1 hidden shrink-0 flex-col items-start leading-tight sm:flex"
                                    >
                                        <span
                                            class="text-sm font-medium text-neutral-900"
                                        >
                                            {{ displayName }}
                                        </span>
                                    </div>

                                    <!-- Chevron -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="h-5 w-5 text-neutral-400 transition-transform duration-200"
                                        :class="{
                                            'rotate-180': isDropdownOpen,
                                        }"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>

                                <!-- Dropdown Menu -->
                                <transition
                                    enter-active-class="transition duration-200 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <div
                                        v-if="isDropdownOpen"
                                        class="absolute top-full right-0 mt-2 w-64 origin-top-right divide-y divide-neutral-100 rounded-xl border border-neutral-100 bg-white shadow-xl ring-1 ring-black/5 focus:outline-none"
                                    >
                                        <!-- User Info Header -->
                                        <div class="px-4 py-3">
                                            <p
                                                class="truncate text-sm font-medium text-neutral-900"
                                            >
                                                {{ displayName }}
                                            </p>
                                            <p
                                                class="truncate text-xs text-neutral-500"
                                            >
                                                {{ user?.email }}
                                            </p>
                                        </div>

                                        <!-- Links -->
                                        <div class="p-1">
                                            <NuxtLink
                                                to="/settings/profile"
                                                class="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                                @click="isDropdownOpen = false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="800"
                                                    height="800"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    class="h-4 w-4 text-neutral-500 group-hover:text-neutral-900"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <g
                                                        id="Page-1"
                                                        fill="none"
                                                        fill-rule="evenodd"
                                                        stroke="none"
                                                        stroke-width="1"
                                                    >
                                                        <g
                                                            id="Dribbble-Light-Preview"
                                                            fill="#000"
                                                            transform="translate(-180 -2159)"
                                                        >
                                                            <g
                                                                id="icons"
                                                                transform="translate(56 160)"
                                                            >
                                                                <path
                                                                    d="M134 2009c-2.217 0-4.019-1.794-4.019-4s1.802-4 4.019-4 4.019 1.794 4.019 4-1.802 4-4.019 4m3.776.673a5.98 5.98 0 0 0 2.182-5.603c-.397-2.623-2.589-4.722-5.236-5.028-3.652-.423-6.75 2.407-6.75 5.958 0 1.89.88 3.574 2.252 4.673-3.372 1.261-5.834 4.222-6.22 8.218a1.01 1.01 0 0 0 1.004 1.109.99.99 0 0 0 .993-.891c.403-4.463 3.836-7.109 7.999-7.109s7.596 2.646 7.999 7.109a.99.99 0 0 0 .993.891c.596 0 1.06-.518 1.003-1.109-.385-3.996-2.847-6.957-6.22-8.218"
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                                Profile
                                            </NuxtLink>
                                            <NuxtLink
                                                v-if="isAdmin"
                                                to="/admin"
                                                class="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                                @click="isDropdownOpen = false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="h-4 w-4 text-neutral-500 group-hover:text-neutral-900"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                                                    />
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                                                    />
                                                </svg>
                                                Admin Dashboard
                                            </NuxtLink>
                                            <NuxtLink
                                                to="/settings/preferences"

                                                class="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                                @click="isDropdownOpen = false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="h-4 w-4 text-neutral-500 group-hover:text-neutral-900"
                                                >
                                                    <path
                                                        stroke="#000"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M10.255 4.188a1.894 1.894 0 0 1-2.542.987c-1.61-.743-3.28.928-2.538 2.538.45.974.003 2.13-.987 2.542-1.551.646-1.551 2.844 0 3.49a1.894 1.894 0 0 1 .987 2.542c-.743 1.61.928 3.28 2.538 2.538a1.895 1.895 0 0 1 2.542.987c.646 1.551 2.844 1.551 3.49 0a1.894 1.894 0 0 1 2.542-.987c1.61.743 3.28-.928 2.538-2.538a1.894 1.894 0 0 1 .987-2.542c1.551-.646 1.551-2.844 0-3.49a1.895 1.895 0 0 1-.987-2.542c.743-1.61-.928-3.28-2.538-2.538-.973.45-2.13.003-2.542-.987-.646-1.551-2.844-1.551-3.49 0Z"
                                                    />
                                                    <path
                                                        stroke="#000"
                                                        stroke-width="2"
                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                                Preferences
                                            </NuxtLink>
                                        </div>

                                        <!-- Sign Out -->
                                        <div class="p-1">
                                            <button
                                                @click="handleSignOut"
                                                class="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-neutral-50"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="h-4 w-4 text-red-500 group-hover:text-red-600"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                                    />
                                                </svg>
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

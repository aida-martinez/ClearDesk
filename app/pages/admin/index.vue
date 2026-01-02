<script setup lang="ts">
const { data: waitlist, refresh, error } = await useFetch('/api/admin/waitlist')
const { data: statsData, refresh: refreshStats } =
    await useFetch('/api/admin/stats')

useHead({
    title: 'Admin Dashboard - ClearDesk',
})

definePageMeta({
    middleware: 'admin',
})

const searchQuery = ref('')
const filterStatus = ref('Pending')

const filteredWaitlist = computed(() => {
    if (!waitlist.value) return []

    // Safety check: ensure waitlist.value is an array
    if (!Array.isArray(waitlist.value)) {
        console.warn('Waitlist data is not an array:', waitlist.value)
        return []
    }

    return waitlist.value.filter((item) => {
        if (!item) return false

        const term = searchQuery.value.toLowerCase().trim()
        if (!term) return true // Show all if no search

        const emailMatch = item.email && item.email.toLowerCase().includes(term)
        const nameMatch =
            item.display_name && item.display_name.toLowerCase().includes(term)

        return emailMatch || nameMatch
    })
})

const stats = computed(() => {
    return [
        {
            label: 'Total users',
            value: statsData.value?.totalUsers || 0,
            icon: 'ph:users',
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            trend: null,
        },
        {
            label: 'Users in Free plan',
            value: statsData.value?.freeUsers || 0,
            icon: 'ph:smiley',
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            trend: null,
        },
        {
            label: 'Users in Premium plan',
            value: statsData.value?.premiumUsers || 0,
            icon: 'ph:crown',
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            trend: null,
        },
         {
            label: 'Users in Family plan',
            value: statsData.value?.familyUsers || 0,
            icon: 'ph:users',
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            trend: null,
        },
        {
            label: 'Friends',
            value: statsData.value?.friends || 0,
            icon: 'ph:users',
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            trend: null,
        },
        {
            label: 'Pending Approval',
            value: statsData.value?.pendingWaitlist || 0,
            icon: 'ph:clock',
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
            trend: null,
        },
    ]
})

const approving = ref<string | null>(null)
const rejecting = ref<string | null>(null)

async function approveUser(user: any) {
    if (approving.value) return
    approving.value = user.email

    try {
        await $fetch('/api/admin/approve-waitlist', {
            method: 'POST',
            body: { email: user.email },
        })
        await refresh()
        await refreshStats()
    } catch (e: any) {
        console.error(e)
        alert(e.message || 'Failed to approve user')
    } finally {
        approving.value = null
    }
}

async function rejectUser(user: any) {
    if (
        !confirm(
            `Are you sure you want to remove ${user.email} from the waitlist?`
        )
    )
        return

    if (rejecting.value) return
    rejecting.value = user.email

    try {
        await $fetch('/api/admin/reject-waitlist', {
            method: 'POST',
            body: { email: user.email },
        })
        await refresh()
        await refreshStats()
    } catch (e: any) {
        console.error(e)
        alert(e.message || 'Failed to reject user')
    } finally {
        rejecting.value = null
    }
}

// Format date helper
function formatDate(dateStr: string) {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

// Get initials
function getInitials(name: string) {
    if (!name) return '??'
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
}

// Random colors for avatars
const avatarColors = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
]
function getAvatarColor(email: string) {
    let hash = 0
    for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash)
    }
    return avatarColors[Math.abs(hash) % avatarColors.length]
}
</script>

<template>
    <div class="min-h-screen bg-gray-50/50 p-8">
        <div class="mx-auto max-w-7xl space-y-8">
            <AppBreadcrumbs :items="[{ label: 'Admin' }]" />

            <!-- Error State -->
            <div
                v-if="error"
                class="mb-6 rounded-lg border border-red-100 bg-red-50 p-4 text-red-600"
            >
                <p class="font-bold">Error loading data:</p>
                <p>{{ error.message }}</p>
                <button
                    @click="refresh()"
                    class="mt-2 text-sm underline hover:text-red-800"
                >
                    Retry
                </button>
            </div>

            <!-- Header -->
            <div class="flex items-start justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <p class="mt-1 text-gray-500">
                        Manage your app and waitlist
                    </p>
                </div>
                <div class="flex gap-3">
                    <NuxtLink
                        to="/admin/invites"
                        class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                    >
                        <Icon name="ph:ticket" class="h-4 w-4" />
                        Manage Invites
                    </NuxtLink>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="flex h-32 flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                    <div class="flex items-start justify-between">
                        <div
                            :class="[
                                stat.bg,
                                stat.color,
                                'inline-flex items-center justify-center rounded-lg p-2.5',
                            ]"
                        >
                            <Icon :name="stat.icon" class="h-6 w-6" />
                        </div>
                        <Icon
                            v-if="stat.trend === 'up'"
                            name="ph:trend-up"
                            class="h-5 w-5 text-emerald-500"
                        />
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-gray-900">
                            {{ stat.value }}
                        </div>
                        <div class="text-sm font-medium text-gray-500">
                            {{ stat.label }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Waitlist Management Section -->
            <div
                class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
                <!-- Section Header -->
                <div
                    class="flex flex-col items-center justify-between gap-4 border-b border-gray-100 p-6 sm:flex-row"
                >
                    <h2 class="text-lg font-semibold text-gray-900">
                        Waitlist Management
                    </h2>
                    <button
                        class="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600"
                    >
                        <Icon name="ph:check-circle-bold" class="h-4 w-4" />
                        Approve All Pending ({{ filteredWaitlist.length }})
                    </button>
                </div>

                <!-- Filters -->
                <div
                    class="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/30 p-4 sm:flex-row"
                >
                    <div class="relative flex-1">
                        <Icon
                            name="ph:magnifying-glass"
                            class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by name or email..."
                            class="w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon name="ph:funnel" class="h-5 w-5 text-gray-400" />
                        <select
                            v-model="filterStatus"
                            class="cursor-pointer rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="Pending">Pending</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead
                            class="border-b border-gray-100 bg-white text-xs font-semibold tracking-wider text-gray-500 uppercase"
                        >
                            <tr>
                                <th class="px-6 py-4">User</th>
                                <th class="px-6 py-4">Email</th>
                                <th class="px-6 py-4">Joined</th>
                                <th class="px-6 py-4">Source</th>
                                <th class="px-6 py-4">Status</th>
                                <th class="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            <tr v-if="filteredWaitlist.length === 0">
                                <td
                                    colspan="6"
                                    class="px-6 py-12 text-center text-gray-500"
                                >
                                    <div
                                        class="flex flex-col items-center justify-center gap-2"
                                    >
                                        <Icon
                                            name="ph:magnifying-glass"
                                            class="h-8 w-8 text-gray-300"
                                        />
                                        <p>No users found</p>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                v-for="user in filteredWaitlist"
                                :key="user.email"
                                class="group transition-colors hover:bg-gray-50/80"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-3">
                                        <div
                                            :class="[
                                                getAvatarColor(
                                                    user.email || ''
                                                ),
                                                'flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-white shadow-sm',
                                            ]"
                                        >
                                            {{
                                                getInitials(
                                                    user.display_name ||
                                                        user.email
                                                )
                                            }}
                                        </div>
                                        <span class="font-medium text-gray-900">
                                            {{
                                                user.display_name || 'Anonymous'
                                            }}
                                        </span>
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
                                >
                                    <div class="flex items-center gap-2">
                                        <Icon
                                            name="ph:envelope-simple"
                                            class="h-4 w-4 text-gray-300"
                                        />
                                        {{ user.email }}
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
                                >
                                    <div class="flex items-center gap-2">
                                        <Icon
                                            name="ph:calendar-blank"
                                            class="h-4 w-4 text-gray-300"
                                        />
                                        {{ formatDate(user.created_at) }}
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 text-sm whitespace-nowrap text-gray-600"
                                >
                                    {{ user.source || 'Landing Page' }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="inline-flex items-center rounded-full border border-amber-100 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600"
                                    >
                                        Pending
                                    </span>
                                </td>
                                <td
                                    class="px-6 py-4 text-right whitespace-nowrap"
                                >
                                    <div
                                        class="flex items-center justify-end gap-2"
                                    >
                                        <button
                                            @click="approveUser(user)"
                                            :disabled="approving === user.email"
                                            class="rounded-full p-2 text-emerald-500 transition-colors hover:bg-emerald-50 disabled:opacity-50"
                                            title="Approve"
                                        >
                                            <Icon
                                                v-if="approving === user.email"
                                                name="ph:spinner-gap"
                                                class="h-5 w-5 animate-spin"
                                            />
                                            <Icon
                                                v-else
                                                name="ph:check-circle"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                        <button
                                            @click="rejectUser(user)"
                                            :disabled="!!rejecting"
                                            class="rounded-full p-2 text-red-400 transition-colors hover:bg-red-50 disabled:opacity-50"
                                            title="Reject"
                                        >
                                            <Icon
                                                v-if="rejecting === user.email"
                                                name="ph:spinner-gap"
                                                class="h-5 w-5 animate-spin"
                                            />
                                            <Icon
                                                v-else
                                                name="ph:x-circle"
                                                class="h-5 w-5"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination / Footer -->
                <div
                    class="border-t border-gray-100 bg-gray-50/50 p-4 text-xs text-gray-500"
                >
                    Showing {{ filteredWaitlist.length }} users
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const inviteCode = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

useHead({
    title: 'Redeem Invite Code - ClearDesk',
})

async function redeemCode() {
    if (!inviteCode.value) return
    
    loading.value = true
    error.value = ''
    success.value = ''

    try {
        const res = await $fetch('/api/invites/redeem', {
            method: 'POST',
            body: { inviteCode: inviteCode.value },
        })
        success.value = res.message
        inviteCode.value = ''
        
        // Refresh session/user data if needed
        // await useSupabaseUser().refresh() 
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            navigateTo('/tasks')
        }, 2000)
    } catch (e: any) {
        error.value = e.data?.message || e.message || 'Failed to redeem code'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div class="text-center">
                <h2 class="text-3xl font-extrabold text-gray-900">
                    Redeem Invite Code
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Enter your code below to upgrade or change your plan.
                </p>
            </div>

            <div class="mt-8 space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div v-if="success" class="rounded-lg bg-emerald-50 p-4 text-emerald-700">
                    <div class="flex items-center gap-2">
                        <Icon name="ph:check-circle" class="h-5 w-5" />
                        <span class="font-medium">{{ success }}</span>
                    </div>
                </div>

                <div v-if="error" class="rounded-lg bg-red-50 p-4 text-red-700">
                    <div class="flex items-center gap-2">
                        <Icon name="ph:warning-circle" class="h-5 w-5" />
                        <span class="font-medium">{{ error }}</span>
                    </div>
                </div>

                <div v-if="!success" class="space-y-4">
                    <div>
                        <label for="invite-code" class="block text-sm font-medium text-gray-700">
                            Invite Code
                        </label>
                        <input
                            id="invite-code"
                            v-model="inviteCode"
                            type="text"
                            placeholder="EMAIL-XXXXXX"
                            class="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-lg font-mono tracking-wider transition-all outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    <button
                        @click="redeemCode"
                        :disabled="loading || !inviteCode"
                        class="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                    >
                        <Icon v-if="loading" name="ph:spinner-gap" class="h-5 w-5 animate-spin" />
                        {{ loading ? 'Processing...' : 'Redeem Code' }}
                    </button>
                </div>

                <div v-else class="text-center">
                    <p class="text-sm text-gray-500">Redirecting to your dashboard...</p>
                </div>
            </div>
            
            <div class="text-center">
                <NuxtLink to="/settings/profile" class="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                    Back to Profile
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

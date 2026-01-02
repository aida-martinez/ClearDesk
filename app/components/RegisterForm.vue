<template>
    <div class="w-full">
        <form
            @submit.prevent="handleRegister"
            v-if="status.type !== 'registered'"
            class="flex flex-col gap-6"
        >
            <AuthInput
                v-model="displayName"
                label="Display Name"
                placeholder="John Doe"
                required
            >
                <template #icon>
                    <IconsSmilyFaceIcon class="h-5 w-5" />
                </template>
            </AuthInput>

            <AuthInput
                v-model="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                required
            >
                <template #icon>
                    <IconsEmailIcon class="h-5 w-5" />
                </template>
            </AuthInput>

            <AuthInput
                v-model="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                required
            >
                <template #icon>
                    <IconsLockIcon class="h-5 w-5" />
                </template>
            </AuthInput>

            <AuthInput
                v-model="inviteCode"
                label="Invite Code (Optional)"
                placeholder="Enter code"
            >
                <template #icon>
                    <IconsShieldIcon class="h-5 w-5" />
                </template>
            </AuthInput>

            <button
                type="submit"
                :disabled="loading"
                class="bg-primary-500 hover:bg-primary-600 shadow-primary-500/20 mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-semibold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
                {{ loading ? 'Creating account...' : 'Create Account' }}
                <IconsArrowRightIcon v-if="!loading" class="h-5 w-5" />
            </button>
        </form>

        <div
            v-if="status.message"
            :class="[
                'mt-6 rounded-xl p-4 text-center text-sm font-medium transition-all',
                status.type === 'error'
                    ? 'border border-red-100 bg-red-50 text-red-600'
                    : 'border border-green-100 bg-green-50 text-green-600',
            ]"
        >
            {{ status.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
const displayName = ref('')
const email = ref('')
const password = ref('')
const inviteCode = ref('')
const status = ref<{
    type: 'success' | 'error' | 'waitlist' | 'registered' | ''
    message: string
}>({ type: '', message: '' })
const loading = ref(false)

async function handleRegister() {
    loading.value = true
    status.value = { type: '', message: '' }
    try {
        const response: any = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                display_name: displayName.value,
                email: email.value,
                password: password.value,
                inviteCode: inviteCode.value,
            },
        })
        status.value = {
            type: response.status as any,
            message: response.message,
        }
    } catch (err: any) {
        status.value = {
            type: 'error',
            message: err.data?.message || 'Something went wrong',
        }
    } finally {
        loading.value = false
    }
}
</script>

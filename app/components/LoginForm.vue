<template>
    <form @submit.prevent="handleLogin" class="flex w-full flex-col gap-6">
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

        <div class="flex flex-col gap-4">
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

            <div class="flex justify-end">
                <button
                    type="button"
                    class="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
                >
                    Forgot password?
                </button>
            </div>
        </div>

        <button
            type="submit"
            :disabled="loading"
            class="bg-primary-500 hover:bg-primary-600 shadow-primary-500/20 mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-semibold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
            {{ loading ? 'Signing in...' : 'Sign In' }}
            <IconsArrowRightIcon v-if="!loading" class="h-5 w-5" />
        </button>

        <p v-if="errorMsg" class="text-error text-center text-sm font-medium">
            {{ errorMsg }}
        </p>
    </form>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    errorMsg.value = ''
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) {
            errorMsg.value = error.message
        } else {
            navigateTo('/dashboard')
        }
    } catch (err: any) {
        errorMsg.value = 'An unexpected error occurred'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="register-container mt-20">
        <h2 class="mb-10 text-center text-3xl font-light">
            Join <span class="text-primary font-semibold">ClearDeck</span>
        </h2>
        <form
            @submit.prevent="handleRegister"
            v-if="status.type !== 'registered'"
            class="mx-auto flex max-w-lg flex-col gap-4"
        >
            <input v-model="email" type="email" placeholder="Email" required />
            <input
                v-model="password"
                type="password"
                placeholder="Password"
                required
            />
            <input v-model="inviteCode" placeholder="Invite Code (Optional)" />
            <button :disabled="loading" type="submit" class="button-action">
                {{ loading ? 'Processing...' : 'Get Access' }}
            </button>
        </form>

        <div
            v-if="status.message"
            :class="['alert', status.type]"
            class="my-10 text-center"
        >
            {{ status.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const inviteCode = ref('')
const status = ref<{
    type: 'success' | 'error' | 'waitlist' | ''
    message: string
}>({ type: '', message: '' })
const loading = ref(false)

async function handleRegister() {
    loading.value = true
    try {
        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
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

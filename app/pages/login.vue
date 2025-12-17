<template>
    <section>
        <div class="mx-auto mt-20 max-w-2xl">
            <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                <input v-model="email" type="email" placeholder="Email" />
                <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                />
                <button type="submit" class="button-action">Log In</button>
                <p v-if="errorMsg">{{ errorMsg }}</p>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false,
})
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })
    if (error) errorMsg.value = error.message
    else navigateTo('/dashboard') // Send them to their tasks
}
</script>

<template>
    <AuthBase
        title="Create account"
        toggle-text="Already have an account?"
        :toggle-action="{ label: 'Sign In', to: '/login' }"
    >
        <RegisterForm />
    </AuthBase>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false,
    layout: false,
    guestOnly: true,
})
</script>

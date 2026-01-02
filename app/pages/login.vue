<template>
    <AuthBase
        title="Welcome back"
        toggle-text="Don't have an account?"
        :toggle-action="{ label: 'Create one', to: '/register' }"
    >
        <LoginForm />
    </AuthBase>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false,
    layout: false, // We use our own layout in AuthBase
    guestOnly: true,
})
</script>

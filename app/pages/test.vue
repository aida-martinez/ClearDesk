<template>
    <div style="font-family: sans-serif; padding: 2rem">
        <h1>ClearDeck Connection Test</h1>
        <p>{{ connectionStatus }}</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false,
})

const client = useSupabaseClient()
const connectionStatus = ref('Testing...')

// Try to fetch a single row from your profiles table
// Even if it's empty, a "success" response means the connection works.
onMounted(async () => {
    const { data, error } = await client.from('profiles').select('*').limit(1)

    if (error) {
        connectionStatus.value = `❌ Connection Error: ${error.message}`
    } else {
        connectionStatus.value = `✅ Connected to Supabase! (Found ${data.length} profiles)`
    }
})
</script>

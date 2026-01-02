<script setup lang="ts">
import { ref } from 'vue'

useHead({
    title: 'Manage Invites - ClearDesk',
})

definePageMeta({
    middleware: 'admin',
})

const planOptions = [
    { label: 'Friends Plan', value: '1' },
    { label: 'Pro Plan', value: '2' },
]

const form = ref({
    planCode: '1',
    expiresInDays: 30,
})

const generatedCode = ref('')
const loading = ref(false)
const error = ref('')

async function generateCode() {
    loading.value = true
    generatedCode.value = ''
    error.value = ''

    try {
        const res = await $fetch('/api/invites/create', {
            method: 'POST',
            body: {
                planCode: form.value.planCode, // Note: backend create.post.ts uses planCode
                expiresInDays: parseInt(form.value.expiresInDays.toString()),
            },
        })
        generatedCode.value = res.inviteCode
    } catch (e: any) {
        error.value = e.message || 'Error generating code'
    } finally {
        loading.value = false
    }
}

function copyCode() {
    navigator.clipboard.writeText(generatedCode.value)
    // simple visual feedback could be added
}
</script>

<template>
    <div class="min-h-screen bg-gray-50/50 p-8">
        <div class="mx-auto max-w-2xl space-y-8">
            <AppBreadcrumbs
                :items="[
                    { label: 'Admin', to: '/admin' },
                    { label: 'Invites' },
                ]"
            />

            <!-- Header -->
            <div class="flex items-center gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                        Invite Codes
                    </h1>
                    <p class="mt-1 text-gray-500">
                        Generate new codes for users
                    </p>
                </div>
            </div>

            <!-- Generator Card -->
            <div
                class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
                <div class="border-b border-gray-100 p-6">
                    <h2 class="text-lg font-semibold text-gray-900">
                        Generate New Code
                    </h2>
                </div>

                <div class="space-y-6 p-6">
                    <!-- Plan Selection -->
                    <div>
                        <label
                            class="mb-2 block text-sm font-medium text-gray-700"
                            >Target Plan</label
                        >
                        <div class="grid grid-cols-2 gap-4">
                            <button
                                v-for="plan in planOptions"
                                :key="plan.value"
                                @click="form.planCode = plan.value"
                                :class="[
                                    'rounded-xl border px-4 py-3 text-left transition-all',
                                    form.planCode === plan.value
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300',
                                ]"
                            >
                                <div class="font-semibold">
                                    {{ plan.label }}
                                </div>
                                <div class="mt-1 text-xs opacity-75">
                                    Unlock {{ plan.label }} features
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Expiry -->
                    <div>
                        <label
                            class="mb-2 block text-sm font-medium text-gray-700"
                            >Expires In (Days)</label
                        >
                        <div class="relative">
                            <input
                                v-model="form.expiresInDays"
                                type="number"
                                min="1"
                                class="w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-4 transition-all outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                            <div
                                class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-400"
                            >
                                Days
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="error"
                        class="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                    >
                        {{ error }}
                    </div>

                    <button
                        @click="generateCode"
                        :disabled="loading"
                        class="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <Icon
                            v-if="loading"
                            name="ph:spinner-gap"
                            class="h-5 w-5 animate-spin"
                        />
                        <Icon v-else name="ph:magic-wand" class="h-5 w-5" />
                        {{ loading ? 'Generating...' : 'Generate Code' }}
                    </button>
                </div>
            </div>

            <!-- Result Card -->
            <div
                v-if="generatedCode"
                class="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center space-y-4 rounded-xl border border-emerald-100 bg-emerald-50 p-6 text-center duration-500"
            >
                <div
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-500 shadow-sm"
                >
                    <Icon name="ph:check" class="h-6 w-6" />
                </div>
                <div>
                    <h3 class="text-lg font-bold text-gray-900">
                        Code Generated!
                    </h3>
                    <p class="text-sm text-emerald-700">
                        Share this code with the new user.
                    </p>
                </div>

                <div
                    class="flex w-full items-center gap-2 rounded-lg border border-emerald-200 bg-white p-2 pl-4"
                >
                    <code
                        class="flex-1 font-mono text-lg font-bold tracking-wider text-gray-800"
                        >{{ generatedCode }}</code
                    >
                    <button
                        @click="copyCode"
                        class="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        title="Copy to clipboard"
                    >
                        <Icon name="ph:copy" class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

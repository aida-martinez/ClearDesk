<template>
    <div class="flex min-h-screen flex-col bg-white">
        <!-- Simplified Header for Auth Pages -->
        <header
            class="flex w-full items-center justify-between px-4 py-6 sm:px-8"
        >
            <NuxtLink to="/" class="flex items-center gap-2">
                <img
                    src="/images/logo.svg"
                    alt="ClearDesk"
                    class="h-10 w-auto"
                />
            </NuxtLink>

            <NuxtLink
                v-if="secondaryAction"
                :to="secondaryAction.to"
                class="bg-primary-500 hover:bg-primary-600 rounded-xl px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:shadow-md"
            >
                {{ secondaryAction.label }}
            </NuxtLink>
        </header>

        <main
            class="flex flex-1 flex-col items-center justify-center px-4 py-12"
        >
            <div class="flex w-full max-w-[440px] flex-col items-center">
                <h1
                    class="mb-10 text-center text-3xl font-semibold text-neutral-800"
                >
                    {{ title }}
                </h1>

                <slot />

                <div class="mt-8 text-center text-neutral-500">
                    <span v-if="toggleText">{{ toggleText }} </span>
                    <NuxtLink
                        :to="toggleAction.to"
                        class="text-primary-500 ml-1 font-medium hover:underline"
                    >
                        {{ toggleAction.label }}
                    </NuxtLink>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
interface Action {
    label: string
    to: string
}

defineProps<{
    title: string
    secondaryAction?: Action
    toggleText?: string
    toggleAction: Action
}>()
</script>

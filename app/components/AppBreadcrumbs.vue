<script setup lang="ts">
defineProps<{
    items: {
        label: string
        to?: string
    }[]
}>()
</script>

<template>
    <nav class="mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Icon name="ph:house" class="h-4 w-4" />
        <ol class="inline-flex items-center space-x-1 md:space-x-2">
            <li
                v-for="(item, index) in items"
                :key="item.label"
                class="inline-flex items-center"
            >
                <template v-if="index > 0">
                    <Icon
                        name="ph:caret-right"
                        class="mx-1 h-4 w-4 text-gray-400"
                    />
                </template>

                <NuxtLink
                    v-if="item.to && index < items.length - 1"
                    :to="item.to"
                    class="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                    {{ item.label }}
                </NuxtLink>
                <span v-else class="text-sm font-medium text-gray-900">
                    {{ item.label }}
                </span>
            </li>
        </ol>
    </nav>
</template>

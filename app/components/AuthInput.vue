<template>
    <div class="relative flex flex-col gap-2">
        <label v-if="label" class="ml-1 text-sm font-medium text-neutral-600">
            {{ label }}
        </label>
        <div class="group relative">
            <div
                class="group-focus-within:text-primary-500 pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center text-neutral-400 transition-colors"
            >
                <slot name="icon" />
            </div>
            <input
                :type="type === 'password' && showsPassword ? 'text' : type"
                :value="modelValue"
                @input="
                    $emit(
                        'update:modelValue',
                        ($event.target as HTMLInputElement).value
                    )
                "
                v-bind="$attrs"
                class="focus:border-primary-500 focus:ring-primary-500/10 block w-full rounded-2xl border border-neutral-200 bg-white py-4 pr-12 pl-14 text-neutral-900 placeholder-neutral-400 transition-all placeholder:font-light focus:ring-4 focus:outline-none"
            />
            <button
                v-if="type === 'password'"
                type="button"
                @click="showsPassword = !showsPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 transition-colors hover:text-neutral-600"
            >
                <IconsEyeIcon v-if="!showsPassword" class="h-5 w-5" />
                <div v-else class="relative">
                    <IconsEyeIcon class="h-5 w-5" />
                    <div
                        class="absolute inset-0 flex items-center justify-center"
                    >
                        <div class="h-[2px] w-6 rotate-45 bg-neutral-400"></div>
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: string
    label?: string
    type?: string
}>()

const emit = defineEmits(['update:modelValue'])

const showsPassword = ref(false)
</script>

<script setup lang="ts">
const route = useRoute()
const isLanding = computed(() => route.path === '/')
</script>

<template>
    <header
        :class="[
            isLanding ? 'fixed top-0 right-0 left-0' : '',
            'z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md transition-all duration-300',
        ]"
    >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <!-- Logo -->
                <NuxtLink to="/" class="group">
                    <img
                        src="/images/logo.svg"
                        alt="ClearDesk Logo"
                        class="h-12 w-auto"
                    />
                    <span class="sr-only">ClearDesk</span>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden items-center gap-8 md:flex">
                    <!-- No links shown in design header specificially, but adding standard ones is safe -->
                </nav>

                <!-- CTA Buttons -->
                <div class="flex items-center gap-4">
                    <NuxtLink
                        to="/login"
                        class="hover:text-primary-600 text-sm font-medium text-neutral-600 transition-colors"
                    >
                        Sign in
                    </NuxtLink>
                    <NuxtLink
                        to="/register"
                        class="bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/30 focus:ring-primary-500 hidden items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none sm:inline-flex"
                    >
                        Join the waitlist
                    </NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

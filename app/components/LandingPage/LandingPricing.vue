<template>
    <section class="bg-neutral-50 py-12 md:py-18 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div class="mb-16 text-center">
                <h2
                    class="mb-4 text-3xl font-light text-pretty text-neutral-900"
                >
                    Generous free tier. Cheap premium.
                </h2>
                <p class="text-lg text-balance text-neutral-600">
                    Start for free. Upgrade when you're ready.
                </p>
            </div>

            <div
                class="mx-auto grid max-w-3xl grid-cols-1 gap-8 lg:max-w-7xl lg:grid-cols-3"
            >
                <!-- Free Tier -->
                <div
                    class="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm"
                >
                    <div class="grow">
                        <h3 class="text-lg font-semibold text-neutral-900">
                            Free
                        </h3>
                        <p class="mb-6 text-sm text-neutral-500">
                            Perfect to get started. Free forever.
                        </p>
                        <div class="mb-8 text-5xl font-light text-neutral-900">
                            $0<span class="text-lg font-normal text-neutral-400"
                                >/mo</span
                            >
                        </div>
                        <ul class="mb-8 space-y-4">
                            <li
                                v-for="feat in freeFeatures"
                                :key="feat"
                                class="flex items-center text-sm text-neutral-600"
                            >
                                <Icon
                                    name="heroicons:check-circle"
                                    class="text-success mr-3 h-5 w-5"
                                />
                                {{ feat }}
                            </li>
                        </ul>
                    </div>
                    <NuxtLink
                        to="/register"
                        class="block w-full rounded-lg border border-neutral-200 px-5 py-3 text-center font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                    >
                        Join the waitlist
                    </NuxtLink>
                </div>

                <!-- Premium Tier -->
                <div
                    class="border-primary-200 ring-primary-500 ring-opacity-10 relative flex flex-col overflow-hidden rounded-2xl border bg-white p-8 shadow-xl ring-2"
                >
                    <div class="absolute top-2 right-2">
                        <span
                            class="bg-primary-50 text-primary-600 border-primary-100 inline-flex items-center rounded-full border px-3 py-2 text-sm font-medium tracking-wide"
                            >Most Popular</span
                        >
                    </div>
                    <div class="grow">
                        <h3 class="text-lg font-semibold text-neutral-900">
                            Premium
                        </h3>
                        <p class="mb-6 text-sm text-neutral-500">
                            For life admin mastery.
                        </p>
                        <div class="mb-8 text-5xl font-light text-neutral-900">
                            $5<span class="text-lg font-normal text-neutral-400"
                                >/mo</span
                            >
                        </div>
                        <ul class="mb-8 space-y-4">
                            <li
                                v-for="feat in premiumFeatures"
                                :key="feat"
                                class="flex items-center text-sm text-neutral-600"
                            >
                                <Icon
                                    name="heroicons:check-circle"
                                    class="text-primary-500 mr-3 h-5 w-5"
                                />
                                {{ feat }}
                            </li>
                        </ul>
                    </div>
                    <NuxtLink
                        to="/register"
                        class="bg-primary-500 hover:bg-primary-600 shadow-primary-500/30 block w-full rounded-lg px-5 py-3 text-center font-semibold text-white shadow-lg transition-all"
                    >
                        Go Premium
                    </NuxtLink>
                </div>

                <!-- Family Tier -->
                <div
                    class="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm"
                >
                    <div class="grow">
                        <h3 class="text-lg font-semibold text-neutral-900">
                            Family plan
                        </h3>
                        <p class="mb-6 text-sm text-neutral-500">
                            For family use.
                        </p>
                        <div class="mb-8 text-5xl font-light text-neutral-900">
                            $8<span class="text-lg font-normal text-neutral-400"
                                >/mo</span
                            >
                        </div>
                        <ul class="mb-8 space-y-4">
                            <li
                                v-for="feat in familyFeatures"
                                :key="feat"
                                class="flex items-center text-sm text-neutral-600"
                            >
                                <Icon
                                    name="heroicons:check-circle"
                                    class="text-success mr-3 h-5 w-5"
                                />
                                {{ feat }}
                            </li>
                        </ul>
                    </div>
                    <NuxtLink
                        to="/register"
                        class="block w-full rounded-lg border border-neutral-200 px-5 py-3 text-center font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                    >
                        Go For it
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const freeFeatures = [
    'Up to 10 responsabilities',
    'Basic email reminders',
    'Simple dashboard',
    'Mobile friendly interface',
]
const premiumFeatures = [
    'Unlimited recurring tasks',
    'Custom reminder timing',
    'Priority support',
    'Advanced categories',
    'Recurring patterns',
]
const familyFeatures = [
    'All in Premium',
    'Up to 5 users',
    'Team dashboard',
    'Shared responsabilities',
]
</script>

<template>
  <section class="py-24 bg-neutral-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-light text-neutral-900 mb-4">Generous free tier. Cheap premium.</h2>
        <p class="text-lg text-neutral-600">Start for free. Upgrade when you're ready.</p>
      </div>

      <div class="grid grid-cols-3 max-w-3xl lg:max-w-7xl mx-auto gap-8">
        <!-- Free Tier -->
        <div class="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden flex flex-col">
          <div class="grow">
            <h3 class="font-semibold text-lg text-neutral-900">Free</h3>
            <p class="text-sm text-neutral-500 mb-6">Perfect to get started. Free forever.</p>
            <div class="text-5xl font-light text-neutral-900 mb-8">$0<span class="text-lg font-normal text-neutral-400">/mo</span></div>
            <ul class="space-y-4 mb-8">
              <li v-for="feat in freeFeatures" :key="feat" class="flex items-center text-sm text-neutral-600">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-success mr-3" />
                {{ feat }}
              </li>
            </ul>
          </div>
          <NuxtLink to="/waitlist" class="block w-full px-5 py-3 text-center rounded-lg border border-neutral-200 font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors">
            Join the waitlist
          </NuxtLink>
        </div>

        <!-- Premium Tier -->
        <div class="bg-white p-8 rounded-2xl border border-primary-200 shadow-xl relative overflow-hidden ring-2 ring-primary-500 ring-opacity-10 flex flex-col">
          <div class="absolute top-2 right-2">
            <span class="inline-flex items-center px-3 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium tracking-wide border border-primary-100">Most Popular</span>
          </div>
          <div class="grow">
            <h3 class="font-semibold text-lg text-neutral-900">Premium</h3>
            <p class="text-sm text-neutral-500 mb-6">For life admin mastery.</p>
            <div class="text-5xl font-light text-neutral-900 mb-8">$5<span class="text-lg font-normal text-neutral-400">/mo</span></div>
            <ul class="space-y-4 mb-8">
              <li v-for="feat in premiumFeatures" :key="feat" class="flex items-center text-sm text-neutral-600">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary-500 mr-3" />
                {{ feat }}
              </li>
            </ul>
          </div>
          <NuxtLink to="/register" class="block w-full px-5 py-3 text-center rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 shadow-lg shadow-primary-500/30 transition-all">
            Go Premium
          </NuxtLink >
        </div>
        
        <!-- Family Tier -->
        <div class="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden flex flex-col">
          <div class="grow">
            <h3 class="font-semibold text-lg text-neutral-900">Family plan</h3>
            <p class="text-sm text-neutral-500 mb-6">For family use.</p>
            <div class="text-5xl font-light text-neutral-900 mb-8">$8<span class="text-lg font-normal text-neutral-400">/mo</span></div>
            <ul class="space-y-4 mb-8">
              <li v-for="feat in familyFeatures" :key="feat" class="flex items-center text-sm text-neutral-600">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-success mr-3" />
                {{ feat }}
              </li>
            </ul>
          </div>
          <NuxtLink to="/register" class="block w-full px-5 py-3 text-center rounded-lg border border-neutral-200 font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors">
            Go For it
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const freeFeatures = ['Up to 10 responsabilities', 'Basic email reminders', 'Simple dashboard', 'Mobile friendly interface']
const premiumFeatures = ['Unlimited recurring tasks', 'Custom reminder timing', 'Priority support', 'Advanced categories', 'Recurring patterns']
const familyFeatures = ['All in Premium', 'Up to 5 users', 'Team dashboard', 'Shared responsabilities']
</script>

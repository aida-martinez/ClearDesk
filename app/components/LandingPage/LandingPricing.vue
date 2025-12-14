<template>
  <section class="py-24 bg-neutral-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-neutral-900 mb-4">Generous free tier. Cheap premium.</h2>
        <p class="text-neutral-600">Start for free. Upgrade whenever you're ready.</p>
      </div>

      <div class="grid max-w-lg lg:max-w-4xl mx-auto lg:grid-cols-2 gap-8 items-start">
        <!-- Free Tier -->
        <div class="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden">
          <h3 class="font-bold text-lg text-neutral-900">Free</h3>
          <p class="text-sm text-neutral-500 mb-6">Forever free for basic needs.</p>
          <div class="text-4xl font-bold text-neutral-900 mb-8">$0<span class="text-lg font-normal text-neutral-400">/mo</span></div>
          <ul class="space-y-4 mb-8">
            <li v-for="feat in freeFeatures" :key="feat" class="flex items-center text-sm text-neutral-600">
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-success mr-3" />
              {{ feat }}
            </li>
          </ul>
          <button class="w-full py-3 rounded-lg border border-neutral-200 font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors">
            Get Started
          </button>
        </div>

        <!-- Premium Tier -->
        <div class="bg-white p-8 rounded-2xl border border-primary-200 shadow-xl relative overflow-hidden ring-2 ring-primary-500 ring-opacity-10 transform lg:-translate-y-4">
          <div class="absolute top-0 right-0 p-4">
            <span class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">Most Popular</span>
          </div>
          <h3 class="font-bold text-lg text-neutral-900">Premium</h3>
          <p class="text-sm text-neutral-500 mb-6">For power users.</p>
          <div class="text-4xl font-bold text-neutral-900 mb-8">$5<span class="text-lg font-normal text-neutral-400">/mo</span></div>
          <ul class="space-y-4 mb-8">
            <li v-for="feat in premiumFeatures" :key="feat" class="flex items-center text-sm text-neutral-600">
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary-500 mr-3" />
              {{ feat }}
            </li>
          </ul>
          <button class="w-full py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 shadow-lg shadow-primary-500/30 transition-all">
            Go Premium
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const freeFeatures = ['Up to 10 recurring tasks', 'Basic email notifications', 'Mobile friendly interface', 'Secure data encryption']
const premiumFeatures = ['Unlimited recurring tasks', 'Custom notification times', 'Priority support', 'Advanced categories', 'Exporting options']
</script>

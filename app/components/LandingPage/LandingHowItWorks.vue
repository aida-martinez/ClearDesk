<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-neutral-900 mb-4">How it works</h2>
      <p class="text-neutral-600 mb-16">Simple, straightforward, and stress free.</p>

      <div class="grid md:grid-cols-3 gap-12 relative">
        <!-- Steps -->
        <div v-for="(step, idx) in steps" :key="idx" class="relative">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mb-6 shadow-sm z-10 relative">
            <Icon :name="step.icon" class="w-8 h-8" />
            <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-warning text-white text-xs font-bold flex items-center justify-center">
              {{ idx + 1 }}
            </div>
          </div>
          <h3 class="font-bold text-neutral-900 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-neutral-600 max-w-xs mx-auto">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { icon: 'heroicons:plus', title: 'Add your recurring tasks', desc: 'Add bill payments, prescriptions, home maintenance, and chores.' },
  { icon: 'heroicons:bell', title: 'We notify you just in time', desc: 'Get a gentle nudge when something needs your attention.' },
  { icon: 'heroicons:check', title: 'Stay on top of life', desc: 'Mark things done and feel the satisfaction of a clear deck.' },
]
</script>

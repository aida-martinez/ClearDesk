<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-light text-neutral-900 mb-4">How it works</h2>
      <p class="text-lg text-neutral-600 mb-16">Simple, straightforward, and stress-free.</p>

      <div class="grid md:grid-cols-3 gap-12 relative">
        <!-- Steps -->
        <div v-for="(step, idx) in steps" :key="idx" class="relative">
          <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center mb-6 shadow-sm z-10 relative">
            <Icon :name="step.icon" class="size-12 text-white" />
            <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-warning text-white text-xs font-bold flex items-center justify-center">
              {{ idx + 1 }}
            </div>
          </div>
          <h3 class="font-light text-neutral-900 mb-2">{{ step.title }}</h3>
          <p class="text-base text-neutral-600 max-w-xs mx-auto">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { icon: 'heroicons:plus', title: 'Add your responsibilities', desc: 'Add the things you want to remember, license renewals, bill payments, annual checkups, subscriptions.' },
  { icon: 'heroicons:bell', title: 'We\'ll notify you just in advance', desc: 'Get email reminders before things are due, so you have time to deal with them without stress.' },
  { icon: 'heroicons:check-circle', title: 'Stay on top of life admin', desc: 'Keep everything clear and organized, without turning your life into a calendar.' },
]
</script>

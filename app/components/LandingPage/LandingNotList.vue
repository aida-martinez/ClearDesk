<template>
  <section class="py-12 md:py-18 lg:py-24 bg-neutral-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl text-pretty font-light mb-4">What ClearDesk is <span class="italic text-neutral-400">not</span></h2>
      <p class="text-lg text-neutral-300 mb-12 md:mb-16 max-w-2xl mx-auto">We're intentionally different from other tools. Here's what we don't do:</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div v-for="(notItem, idx) in notList" :key="idx" class="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 transition-colors">
          <div class="w-14 h-14 mx-auto rounded-full bg-neutral-700/50 flex items-center justify-center mb-4 text-neutral-400">
            <Icon :name="notItem.icon" class="size-7 text-secondary-500" />
          </div>
          <p class="text-base font-medium text-neutral-300">{{ notItem.label }}</p>
        </div>
      </div>
      
      <p class="mt-16 text-base font-light text-neutral-300 italic">No calendar grids. No time blocks. No hustle culture. Just calm clarity.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const notList = [
  { icon: 'heroicons:calendar-20-solid', label: 'Not a calendar' },
  { icon: 'heroicons:clock', label: 'Not a daily planner' },
  { icon: 'heroicons:cursor-arrow-ripple-20-solid', label: 'Not a project manager' },
  { icon: 'heroicons:users', label: 'Not for teams or work' },
  { icon: 'heroicons:presentation-chart-line', label: 'Not a productivity tool' },
]
</script>

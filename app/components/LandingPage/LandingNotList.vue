<template>
  <section class="py-24 bg-neutral-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold mb-4">What ClearDesk is <span class="italic text-neutral-400">not</span></h2>
      <p class="text-neutral-400 mb-16 max-w-2xl mx-auto">We're tired of bloatware. Here is what we removed.</p>

      <div class="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <div v-for="(notItem, idx) in notList" :key="idx" class="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 transition-colors">
          <div class="w-10 h-10 mx-auto rounded-full bg-neutral-700/50 flex items-center justify-center mb-4 text-neutral-400">
            <Icon :name="notItem.icon" class="w-5 h-5" />
          </div>
          <p class="text-sm font-medium text-neutral-300">{{ notItem.label }}</p>
        </div>
      </div>
      
      <p class="mt-16 text-sm text-neutral-500">We intentionally stripped away features to focus on what actually matters: clarity.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const notList = [
  { icon: 'heroicons:users', label: 'Team features' },
  { icon: 'heroicons:chart-bar', label: 'Project management' },
  { icon: 'heroicons:chat-bubble-left-right', label: 'Slack integration' },
  { icon: 'heroicons:video-camera', label: 'Video calls' },
  { icon: 'heroicons:presentation-chart-line', label: 'Gantt charts' },
]
</script>

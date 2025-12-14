<template>
  <section class="py-24 bg-neutral-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-neutral-900 mb-4">A simple place for life's recurring responsibilities</h2>
        <p class="text-neutral-600">ClearDesk gives you a lightweight way to track all your renewals, chores, and maintenance tasks without cluttering your lifestyle.</p>
      </div>

      <div class="grid sm:grid-cols-2 gap-x-12 gap-y-12">
        <div v-for="(item, idx) in features" :key="idx" class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-lg bg-secondary-50 text-secondary-600 flex items-center justify-center">
              <Icon :name="item.icon" class="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 class="font-bold text-neutral-900 mb-2">{{ item.title }}</h3>
            <p class="text-sm text-neutral-600">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { icon: 'heroicons:bell-alert', title: 'Clear Overview', desc: 'See everything that needs your attention in one single, clean view.' },
  { icon: 'heroicons:envelope', title: 'Email Reminders', desc: 'Recieve digests straight to your inbox, so you never miss a beat.' },
  { icon: 'heroicons:arrow-path', title: 'Recurring Made Easy', desc: 'Set it and forget it. Flexible recurrence rules for any task.' },
  { icon: 'heroicons:face-smile', title: 'Reduce Mental Load', desc: 'Free your mind from remembering when to change the air filters.' },
]
</script>

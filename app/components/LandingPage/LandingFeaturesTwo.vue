<template>
  <section class="py-24 bg-neutral-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-18">
        <h2 class="text-3xl font-light text-neutral-900 mb-4">A simple place for life's recurring responsibilities</h2>
        <p class="text-lg text-neutral-600">ClearDesk gives you a lightweight way to track bills, renewals, chores, and health tasks without turning your life into a calendar.</p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid sm:grid-cols-2 gap-x-12 gap-y-12">
        <div v-for="(item, idx) in features" :key="idx" class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-400 text-secondary-600 flex items-center justify-center">
              <component :is="item.icon" class="w-10 h-auto text-white" />
            </div>
          </div>
          <div>
            <h3 class="text-xl font-light text-neutral-900 mb-2">{{ item.title }}</h3>
            <p class="text-base text-neutral-600">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EyeIcon from '../Icons/EyeIcon.vue'
import EmailIcon from '../Icons/EmailIcon.vue'
import ShieldIcon from '../Icons/ShieldIcon.vue'
import SmilyFaceIcon from '../Icons/SmilyFaceIcon.vue'

const features = [
  { icon: EyeIcon, title: 'Clear Overview', desc: 'See everything that needs your attention in one calm, organized view. No clutter, no chaos.' },
  { icon: EmailIcon, title: 'Email Reminders', desc: 'Get notified before things are due, not calendar blocks, just helpful reminders when you need them.' },
  { icon: ShieldIcon, title: 'Recurring Made Easy', desc: 'Add things once. ClearDesk tracks renewals, subscriptions, and checkups automatically.' },
  { icon: SmilyFaceIcon, title: 'Reduces Mental Load', desc: 'Stop keeping a mental checklist. Let ClearDesk remember so you don\'t have to.' },
]
</script>

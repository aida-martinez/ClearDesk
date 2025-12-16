<template>
  <section class="py-12 md:py-18 lg::py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-8 md:mb-14">
        <h2 class="text-2xl sm:text-3xl text-pretty font-light text-neutral-900 mb-4">Life admin shouldn't feel like work</h2>
        <p class="text-lg text-neutral-600">You have enough to juggle. Keeping track of recurring responsibilities shouldn't add to the load.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(feature, idx) in features" :key="idx" class="bg-neutral-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-lg bg-white text-primary-500 flex items-center justify-center mb-8">
            <component :is="feature.icon" class="h-8 w-auto text-primary-500" />
          </div>
          <h3 class="font-semibold text-neutral-900 mb-4">{{ feature.title }}</h3>
          <p class="text-base text-neutral-600 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BrainIcon from '../Icons/BrainIcon.vue'
import CalendarIcon from '../Icons/CalendarIcon.vue'
import ThunderIcon from '../Icons/ThunderIcon.vue'

const features = [
  { icon: BrainIcon, title: 'Mental Load', desc: 'Trying to remember when to renew your license, pay bills, or schedule appointments add invisible stress.' },
  { icon: CalendarIcon, title: 'Calendar Overload', desc: 'You don\'t need another calendar filling up with events. Some things just need to stay on your radar.' },
  { icon: ThunderIcon, title: 'Overcomplicated Tools', desc: 'Project managers and productivity apps are too much. You just want to know what needs attention.' },
]
</script>

<template>
  <section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-neutral-900 mb-4">Life admin shouldn't feel like work</h2>
        <p class="text-neutral-600">You have enough on your plate. Keeping track of recurring responsibilities shouldn't add to the stress.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(feature, idx) in features" :key="idx" class="bg-neutral-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div class="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center mb-4">
            <Icon :name="feature.icon" class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-neutral-900 mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-neutral-600 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { icon: 'heroicons:document-text', title: 'Minimal Input', desc: 'Designed to be as frictionless as possible. Add tasks in seconds.' },
  { icon: 'heroicons:calendar', title: 'Calendar Overload', desc: 'Keep your calendar specifically for events, not tasks.' },
  { icon: 'heroicons:sparkles', title: 'Uncomplicated', desc: 'Focus on what you need to do, not how to manage the system.' },
]
</script>

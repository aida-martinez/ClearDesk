<template>
    <section class="relative bg-neutral-50 pt-20 pb-32 overflow-hidden lg:pt-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-left space-y-7">
                    <div class="inline-flex items-center px-5 py-3 rounded-full bg-primary-50 text-primary-600 text-sm font-medium tracking-wide border border-primary-100">
                        Not a calendar. Not a planner.
                    </div>
                    <h1 class="text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight leading-[1.1]">
                        Life admin, without the calendar.
                    </h1>
                    <p class="text-lg text-neutral-600 leading-relaxed max-w-lg">
                        Keep track of recurring reponsabilities, like renewing your driver's license, paying bills, or scheduling checkups, without scheduling your life.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                    <NuxtLink to="/register" class="px-8 py-3.5 text-base font-semibold text-white bg-primary-500 rounded-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        Join the waitlist
                    </NuxtLink >
                    <!-- <NuxtLink to="/demo" class="px-8 py-3.5 text-base font-semibold text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300">
                        See how it works
                    </NuxtLink > -->
                    </div>
                </div>
    
                <!-- Hero Image / Dashboard Mockup -->
                <div class="relative lg:ml-auto w-full max-w-lg">
                    <div class="relative rounded-2xl bg-white shadow-2xl border border-neutral-100 overflow-hidden transform rotate-2">
                    <div class="h-8 bg-neutral-50 border-b border-neutral-100 flex items-center px-4 gap-2">
                        <div class="w-2.5 h-2.5 rounded-full bg-error"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-warning"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-success"></div>
                    </div>
                    <div class="p-6 space-y-4">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="font-bold text-neutral-900">Your Dashboard</h3>
                            <button class="text-xs bg-primary-500 text-white px-2 py-1 rounded">+ Add Item</button>
                        </div>
                        <!-- Mock Items -->
                        <div v-for="item in items" :key="item.title" class="flex items-center p-3 rounded-lg bg-neutral-50 border border-neutral-100 hover:border-primary-200 transition-colors">
                            <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-3">
                                <Icon name="heroicons:check-circle" class="w-5 h-5" />
                            </div>
                            <div class="flex-1">
                                <div class="text-base">{{ item.title }}</div>
                                <div class="text-sm text-neutral-500">{{ item.category }}</div>
                            </div>
                            <div class="text-sm text-neutral-400 flex items-center gap-2">
                                <Icon :name="item.icon" class="w-5 h-5 text-warning" />
                               {{ item.timeframe }}
                            </div>
                        </div>
                    </div>
                    </div>
                    <!-- Floating Badge -->
                    <div class="absolute -top-6 -right-6 animate-bounce">
                        <div class="bg-secondary-400 text-white text-xs font-bold px-5 py-3 rounded-lg shadow-lg flex items-center gap-2">
                            <Icon name="heroicons:bell" class="inline-block size-5" />
                            <p class="text-base">Reminder sent!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const items = [
  {  title: 'Driver\'s LIcense Renawal', category: 'Government ID', timeframe: '2 weeks', icon: '' },
  {  title: 'Annual Helth Checkup', category: 'Healthcare', timeframe: '1 month', icon: '' },
  {  title: 'Car Insurance Renewal', category: 'Insurance', timeframe: '3 days', icon: 'heroicons:exclamation-circle-16-solid' },
  {  title: 'Passport renewal', category: 'Government ID', timeframe: '4 months', icon: '' },
]
</script>

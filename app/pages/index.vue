<template>
  <div class="min-h-screen font-sans bg-white selection:bg-brand-100 selection:text-brand-900">
    <main class="pt-20">
      <!-- Hero Section -->
      <section class="relative pt-20 pb-32 overflow-hidden lg:pt-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="text-left space-y-8">
                 <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium tracking-wide border border-blue-100 uppercase">
                    Early Access Now Open
                 </div>
                 <h1 class="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                    Life admin, <br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">without the calendar.</span>
                 </h1>
                 <p class="text-lg text-gray-600 leading-relaxed max-w-lg">
                    Stop treating your personal life like a business meeting. Be your own admin assistant, without treating your life like a calendar.
                 </p>
                 <div class="flex flex-col sm:flex-row gap-4">
                    <button class="px-8 py-3.5 text-base font-semibold text-white bg-brand-500 rounded-lg shadow-lg shadow-brand-500/30 hover:bg-brand-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                       Create Your Account
                    </button>
                    <button class="px-8 py-3.5 text-base font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                       Watch the Video
                    </button>
                 </div>
              </div>

              <!-- Hero Image / Dashboard Mockup -->
              <div class="relative lg:ml-auto w-full max-w-lg">
                 <div class="relative rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div class="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                       <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                       <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                       <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div class="p-6 space-y-4">
                       <div class="flex justify-between items-center mb-6">
                          <h3 class="font-bold text-gray-900">Your Dashboard</h3>
                          <button class="text-xs bg-brand-500 text-white px-2 py-1 rounded">+ Add New</button>
                       </div>
                       <!-- Mock Items -->
                       <div v-for="i in 3" :key="i" class="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-brand-200 transition-colors">
                          <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-500 flex items-center justify-center mr-3">
                             <Icon name="heroicons:check-circle" class="w-5 h-5" />
                          </div>
                          <div class="flex-1">
                             <div class="h-2 w-24 bg-gray-200 rounded mb-1.5"></div>
                             <div class="h-1.5 w-16 bg-gray-100 rounded"></div>
                          </div>
                          <div class="text-xs text-gray-400">2 days</div>
                       </div>
                    </div>
                 </div>
                 <!-- Floating Badge -->
                 <div class="absolute -top-6 -right-6 animate-bounce">
                    <span class="bg-teal-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">New Features!</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- Section: Life admin shouldn't feel like work -->
      <section class="py-24 bg-gray-50">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-16">
               <h2 class="text-3xl font-bold text-gray-900 mb-4">Life admin shouldn't feel like work</h2>
               <p class="text-gray-600">You have enough on your plate. Keeping track of recurring responsibilities shouldn't add to the stress.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
               <div v-for="(feature, idx) in features1" :key="idx" class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div class="w-10 h-10 rounded-lg bg-blue-50 text-brand-500 flex items-center justify-center mb-4">
                     <Icon :name="feature.icon" class="w-6 h-6" />
                  </div>
                  <h3 class="font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ feature.desc }}</p>
               </div>
            </div>
         </div>
      </section>

      <!-- Section: A simple place... -->
      <section class="py-24 bg-white">
         <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
               <h2 class="text-3xl font-bold text-gray-900 mb-4">A simple place for life's recurring responsibilities</h2>
               <p class="text-gray-600">ClearDesk gives you a lightweight way to track all your renewals, chores, and maintenance tasks without cluttering your lifestyle.</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-x-12 gap-y-12">
               <div v-for="(item, idx) in features2" :key="idx" class="flex gap-4">
                  <div class="flex-shrink-0">
                     <div class="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                        <Icon :name="item.icon" class="w-6 h-6" />
                     </div>
                  </div>
                  <div>
                     <h3 class="font-bold text-gray-900 mb-2">{{ item.title }}</h3>
                     <p class="text-sm text-gray-600">{{ item.desc }}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- Dark Section: What ClearDesk is NOT -->
      <section class="py-24 bg-gray-900 text-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 class="text-3xl font-bold mb-4">What ClearDesk is <span class="italic text-gray-400">not</span></h2>
             <p class="text-gray-400 mb-16 max-w-2xl mx-auto">We're tired of bloatware. Here is what we removed.</p>

             <div class="grid grid-cols-2 lg:grid-cols-5 gap-6">
                <div v-for="(notItem, idx) in notList" :key="idx" class="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-colors">
                   <div class="w-10 h-10 mx-auto rounded-full bg-gray-700/50 flex items-center justify-center mb-4 text-gray-400">
                      <Icon :name="notItem.icon" class="w-5 h-5" />
                   </div>
                   <p class="text-sm font-medium text-gray-300">{{ notItem.label }}</p>
                </div>
             </div>
             
             <p class="mt-16 text-sm text-gray-500">We intentionally stripped away features to focus on what actually matters: clarity.</p>
          </div>
      </section>

      <!-- How it works -->
      <section class="py-24 bg-white">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p class="text-gray-600 mb-16">Simple, straightforward, and stress free.</p>

            <div class="grid md:grid-cols-3 gap-12 relative">
               <!-- Steps -->
               <div v-for="(step, idx) in steps" :key="idx" class="relative">
                  <div class="w-16 h-16 mx-auto rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-6 shadow-sm z-10 relative">
                     <Icon :name="step.icon" class="w-8 h-8" />
                     <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 text-white text-xs font-bold flex items-center justify-center">
                        {{ idx + 1 }}
                     </div>
                  </div>
                  <h3 class="font-bold text-gray-900 mb-2">{{ step.title }}</h3>
                  <p class="text-sm text-gray-600 max-w-xs mx-auto">{{ step.desc }}</p>
               </div>
            </div>
         </div>
      </section>

      <!-- Pricing -->
      <section class="py-24 bg-gray-50">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
               <h2 class="text-3xl font-bold text-gray-900 mb-4">Generous free tier. Cheap premium.</h2>
               <p class="text-gray-600">Start for free. Upgrade whenever you're ready.</p>
            </div>

            <div class="grid max-w-lg lg:max-w-4xl mx-auto lg:grid-cols-2 gap-8 items-start">
               <!-- Free Tier -->
               <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <h3 class="font-bold text-lg text-gray-900">Free</h3>
                  <p class="text-sm text-gray-500 mb-6">Forever free for basic needs.</p>
                  <div class="text-4xl font-bold text-gray-900 mb-8">$0<span class="text-lg font-normal text-gray-400">/mo</span></div>
                  <ul class="space-y-4 mb-8">
                     <li v-for="feat in freeFeatures" :key="feat" class="flex items-center text-sm text-gray-600">
                        <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500 mr-3" />
                        {{ feat }}
                     </li>
                  </ul>
                  <button class="w-full py-3 rounded-lg border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                     Get Started
                  </button>
               </div>

               <!-- Premium Tier -->
               <div class="bg-white p-8 rounded-2xl border border-brand-200 shadow-xl relative overflow-hidden ring-2 ring-brand-500 ring-opacity-10 transform lg:-translate-y-4">
                   <div class="absolute top-0 right-0 p-4">
                      <span class="inline-block px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">Most Popular</span>
                   </div>
                  <h3 class="font-bold text-lg text-gray-900">Premium</h3>
                  <p class="text-sm text-gray-500 mb-6">For power users.</p>
                  <div class="text-4xl font-bold text-gray-900 mb-8">$5<span class="text-lg font-normal text-gray-400">/mo</span></div>
                  <ul class="space-y-4 mb-8">
                     <li v-for="feat in premiumFeatures" :key="feat" class="flex items-center text-sm text-gray-600">
                        <Icon name="heroicons:check-circle" class="w-5 h-5 text-brand-500 mr-3" />
                        {{ feat }}
                     </li>
                  </ul>
                  <button class="w-full py-3 rounded-lg bg-brand-500 text-white font-semibold hover:bg-brand-600 shadow-lg shadow-brand-500/30 transition-all">
                     Go Premium
                  </button>
               </div>
            </div>
         </div>
      </section>

      <!-- Bottom CTA -->
      <section class="py-24 bg-gradient-to-br from-brand-500 to-teal-400 text-center text-white">
         <div class="max-w-4xl mx-auto px-4">
            <h2 class="text-4xl font-bold mb-6">Clear your deck.</h2>
            <p class="text-brand-50 mb-10 text-lg">Start organizing your life admin today—without the calendar.</p>
            <button class="px-8 py-3.5 bg-white text-brand-600 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
               Get Started for Free
            </button>
            <p class="mt-6 text-xs text-brand-100 opacity-80">No credit card required.</p>
         </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
const features1 = [
  { icon: 'heroicons:document-text', title: 'Minimal Input', desc: 'Designed to be as frictionless as possible. Add tasks in seconds.' },
  { icon: 'heroicons:calendar', title: 'Calendar Overload', desc: 'Keep your calendar specifically for events, not tasks.' },
  { icon: 'heroicons:sparkles', title: 'Uncomplicated', desc: 'Focus on what you need to do, not how to manage the system.' },
]

const features2 = [
  { icon: 'heroicons:bell-alert', title: 'Clear Overview', desc: 'See everything that needs your attention in one single, clean view.' },
  { icon: 'heroicons:envelope', title: 'Email Reminders', desc: 'Recieve digests straight to your inbox, so you never miss a beat.' },
  { icon: 'heroicons:arrow-path', title: 'Recurring Made Easy', desc: 'Set it and forget it. Flexible recurrence rules for any task.' },
  { icon: 'heroicons:face-smile', title: 'Reduce Mental Load', desc: 'Free your mind from remembering when to change the air filters.' },
]

const notList = [
  { icon: 'heroicons:users', label: 'Team features' },
  { icon: 'heroicons:chart-bar', label: 'Project management' },
  { icon: 'heroicons:chat-bubble-left-right', label: 'Slack integration' },
  { icon: 'heroicons:video-camera', label: 'Video calls' },
  { icon: 'heroicons:presentation-chart-line', label: 'Gantt charts' },
]

const steps = [
  { icon: 'heroicons:plus', title: 'Add your recurring tasks', desc: 'Add bill payments, prescriptions, home maintenance, and chores.' },
  { icon: 'heroicons:bell', title: 'We notify you just in time', desc: 'Get a gentle nudge when something needs your attention.' },
  { icon: 'heroicons:check', title: 'Stay on top of life', desc: 'Mark things done and feel the satisfaction of a clear deck.' },
]

const freeFeatures = ['Up to 10 recurring tasks', 'Basic email notifications', 'Mobile friendly interface', 'Secure data encryption']
const premiumFeatures = ['Unlimited recurring tasks', 'Custom notification times', 'Priority support', 'Advanced categories', 'Exporting options']
</script>

<style scoped>
/* Any custom scoped styles if tailwind isn't enough */
</style>
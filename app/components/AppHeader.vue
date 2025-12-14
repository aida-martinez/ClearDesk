<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-3000">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-2 group">
             <img src="/images/logo.svg" alt="ClearDesk Logo" class="h-8 w-auto transition-transform group-hover:scale-105" />
             <span class="sr-only">ClearDesk</span>
          </NuxtLink>

          <div class="size-8 rounded-full bg-brand-50"></div>
          <div class="size-8 rounded-full bg-brand-100"></div>
          <div class="size-8 rounded-full bg-brand-200"></div>
          <div class="size-8 rounded-full bg-brand-300"></div>
          <div class="size-8 rounded-full bg-brand-400"></div>
          <div class="size-8 rounded-full bg-brand-500"></div>
          <div class="size-8 rounded-full bg-brand-600"></div>
          <div class="size-8 rounded-full bg-brand-700"></div>
          <div class="size-8 rounded-full bg-brand-800"></div>
          <div class="size-8 rounded-full bg-brand-900"></div>
          <div class="size-8 rounded-full bg-brand-950"></div>
          <div class="size-8 rounded-full bg-slate-850"></div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
           <!-- No links shown in design header specificially, but adding standard ones is safe -->
        </nav>

        <!-- CTA Buttons -->
        <div class="flex items-center gap-4">
           <NuxtLink to="/login" class="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
             Sign in
           </NuxtLink>
           <NuxtLink to="/signup" class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all bg-brand-500 rounded-full hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
             Get Started
           </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

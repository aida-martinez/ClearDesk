<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 transition-all duration-3000">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="group">
            <img src="/images/logo.svg" alt="ClearDesk Logo" class="h-12 w-auto" />
            <span class="sr-only">ClearDesk</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
           <!-- No links shown in design header specificially, but adding standard ones is safe -->
        </nav>

        <!-- CTA Buttons -->
        <div class="flex items-center gap-4">
           <NuxtLink to="/login" class="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
             Sign in
           </NuxtLink>
           <NuxtLink to="/signup" class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all bg-primary-500 rounded-full hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
             Get Started
           </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

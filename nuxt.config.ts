// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],

  modules: [
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [],
    },
  },

  icon: {
    cssLayer: 'icon',
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  runtimeConfig: {
    // This maps to NUXT_SUPABASE_SERVICE_KEY
    supabaseServiceKey: '', 

    public: {
      // These map to NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_KEY
      supabaseUrl: '',
      supabaseKey: ''
    }
  },
})
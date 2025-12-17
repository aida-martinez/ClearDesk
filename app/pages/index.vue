<script setup lang="ts">
definePageMeta({
    auth: false,
})
</script>

<template>
    <div
        class="selection:bg-primary-100 selection:text-primary-900 min-h-screen bg-white font-sans"
    >
        <main class="pt-20">
            <!-- Hero Section -->
            <LandingPageLandingHero />

            <!-- Section: Life admin shouldn't feel like work -->
            <LandingPageLandingFeaturesOne />

            <!-- Section: A simple place... -->
            <LandingPageLandingFeaturesTwo />

            <!-- Dark Section: What ClearDesk is NOT -->
            <LandingPageLandingNotList />

            <!-- How it works -->
            <LandingPageLandingHowItWorks />

            <!-- Pricing -->
            <LandingPageLandingPricing />

            <!-- Bottom CTA -->
            <LandingPageLandingCta />
        </main>
    </div>
</template>

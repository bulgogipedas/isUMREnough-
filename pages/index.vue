<script setup lang="ts">
/**
 * Landing Page - Finara Financial Calculator
 * 
 * A professional, mobile-first landing page that introduces the app,
 * creates trust, and leads users to the calculator.
 */

// SEO Configuration
useHead({
  title: 'Finara - Kalkulator Beban Hidup Indonesia',
  meta: [
    {
      name: 'description',
      content: 'Cek apakah gaji kamu cukup untuk biaya hidup di Indonesia. Kalkulator beban hidup berdasarkan data BPS 2024 dan UMR seluruh provinsi.',
    },
    {
      name: 'keywords',
      content: 'kalkulator beban hidup, UMR Indonesia, pengeluaran per kapita, BPS 2024, kesehatan finansial, gaji cukup',
    },
    { property: 'og:title', content: 'Finara - Kalkulator Beban Hidup Indonesia' },
    { property: 'og:description', content: 'Cek apakah gaji kamu cukup untuk biaya hidup di Indonesia berdasarkan data BPS 2024.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Finara - Kalkulator Beban Hidup Indonesia' },
    { name: 'twitter:description', content: 'Cek apakah gaji kamu cukup untuk biaya hidup di Indonesia berdasarkan data BPS 2024.' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar -->
    <LandingTheNavbar />

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <LandingHeroSection />

      <!-- Features Section -->
      <LandingFeaturesSection />

      <!-- About Section -->
      <LandingAboutSection />

      <!-- CTA Section -->
      <section class="py-16 lg:py-24 bg-primary-400 relative overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute -top-20 -right-20 w-80 h-80 bg-primary-300 rounded-full blur-3xl opacity-50" />
          <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-500 rounded-full blur-3xl opacity-30" />
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Siap Cek Kesehatan Finansialmu?
          </h2>
          <p class="text-lg lg:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Gratis, tanpa registrasi, dan data kamu aman tidak disimpan di mana pun.
          </p>
          <NuxtLink
            to="/calculator"
            class="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold text-lg rounded-2xl shadow-ios-xl hover:bg-gray-800 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
          >
            Mulai Hitung Sekarang
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <LandingTheFooter />
  </div>
</template>

<style>
/* Global smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for the whole page */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>

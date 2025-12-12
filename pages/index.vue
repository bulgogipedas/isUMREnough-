<script setup lang="ts">
/**
 * Landing Page - Finara Financial Calculator
 * 
 * A premium, modern fintech landing page with mesh gradients,
 * bento grid features, data ticker, and FAQ accordion.
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
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- ============================================== -->
    <!-- MESH GRADIENT BACKGROUND - Fixed, Living Feel -->
    <!-- ============================================== -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <!-- Blob 1: Yellow (top-right) -->
      <div 
        class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-yellow-200 rounded-full blur-3xl opacity-30 animate-blob-1"
      />
      <!-- Blob 2: Blue (bottom-left) -->
      <div 
        class="absolute -bottom-60 -left-40 w-[700px] h-[700px] bg-blue-200 rounded-full blur-3xl opacity-25 animate-blob-2"
      />
      <!-- Blob 3: Gray (center) -->
      <div 
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gray-200 rounded-full blur-3xl opacity-20 animate-blob-3"
      />
      <!-- Subtle overlay for depth -->
      <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30" />
    </div>

    <!-- Navbar -->
    <LandingTheNavbar />

    <!-- Main Content (relative for z-index above blobs) -->
    <main class="relative z-10">
      <!-- Hero Section -->
      <LandingHeroSection />

      <!-- Data Ticker / Marquee -->
      <LandingDataTicker />

      <!-- Features Section (Bento Grid) -->
      <LandingFeaturesSection />

      <!-- About Section -->
      <LandingAboutSection />

      <!-- FAQ Section -->
      <LandingFaqSection />

      <!-- CTA Section -->
      <section class="py-16 lg:py-24 relative overflow-hidden">
        <!-- Glassmorphism CTA Card -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative bg-gradient-to-br from-primary-400 via-primary-300 to-yellow-200 rounded-[2.5rem] p-10 lg:p-16 shadow-ios-xl overflow-hidden">
            <!-- Background decorations -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full blur-3xl opacity-20" />
              <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-500 rounded-full blur-3xl opacity-20" />
            </div>

            <div class="relative text-center">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Siap Cek Kesehatan Finansialmu?
              </h2>
              <p class="text-lg lg:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                Gratis, tanpa registrasi, dan data kamu aman tidak disimpan di mana pun.
              </p>
              <NuxtLink
                to="/calculator"
                class="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold text-lg rounded-2xl shadow-ios-xl hover:bg-gray-800 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 transition-all duration-300"
              >
                Mulai Hitung Sekarang
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <LandingTheFooter class="relative z-10" />
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




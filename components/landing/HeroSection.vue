<script setup lang="ts">
/**
 * Hero Section - Optimized
 * 
 * OPTIMIZATIONS:
 * - Removed infinite float animations (saves CPU)
 * - Static decorative elements (v-once candidates when possible)
 * - Simplified entrance animations
 */
import { ArrowRight, TrendingUp, MapPin, Calculator } from 'lucide-vue-next'
</script>

<template>
  <section class="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden bg-white">
    <!-- Background Decorations (static) -->
    <div v-once class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-200 rounded-full blur-3xl opacity-40" />
      <div class="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gray-200 rounded-full blur-3xl opacity-50" />
      <div class="absolute top-1/3 left-1/4 w-32 h-32 bg-primary-300 rounded-full blur-2xl opacity-30" />
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left animate-fade-in">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
            <TrendingUp class="w-4 h-4 text-primary-600" />
            <span class="text-sm font-semibold text-primary-700">Data BPS 2024</span>
          </div>

          <!-- Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Gaji Kamu
            <span class="text-primary-500 relative">
              Cukup
              <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                <path d="M2 10C50 2 150 2 198 10" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
              </svg>
            </span>
            Nggak<br class="hidden sm:block" />
            Tinggal di Sini?
          </h1>

          <!-- Subheadline -->
          <p class="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Cek kesehatan finansialmu berdasarkan data 
            <span class="font-semibold text-gray-800">real BPS</span> dan 
            <span class="font-semibold text-gray-800">UMR</span> di seluruh Indonesia.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <NuxtLink
              to="/calculator"
              class="group w-full sm:w-auto px-8 py-4 bg-primary-400 text-gray-900 font-bold text-lg rounded-2xl shadow-ios-lg hover:bg-primary-500 hover:shadow-ios-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Calculator class="w-5 h-5" />
              Mulai Hitung Sekarang
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </NuxtLink>
            
            <a
              href="#features"
              class="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 font-semibold text-lg rounded-2xl hover:bg-gray-200 hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              Pelajari Fitur
            </a>
          </div>

          <!-- Stats -->
          <div v-once class="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-gray-100">
            <div class="text-center lg:text-left">
              <p class="text-3xl font-bold text-gray-900">38</p>
              <p class="text-sm text-gray-500">Provinsi</p>
            </div>
            <div class="w-px h-12 bg-gray-200" aria-hidden="true" />
            <div class="text-center lg:text-left">
              <p class="text-3xl font-bold text-gray-900">2024</p>
              <p class="text-sm text-gray-500">Data Terbaru</p>
            </div>
            <div class="w-px h-12 bg-gray-200" aria-hidden="true" />
            <div class="text-center lg:text-left">
              <p class="text-3xl font-bold text-gray-900">100%</p>
              <p class="text-sm text-gray-500">Gratis</p>
            </div>
          </div>
        </div>

        <!-- Visual/Illustration -->
        <div class="flex-1 relative animate-fade-in-delay">
          <!-- Main Card -->
          <div class="relative bg-white rounded-3xl shadow-ios-xl p-6 lg:p-8 border border-gray-100">
            <!-- Floating Elements (static, no animation) -->
            <div class="absolute -top-4 -left-4 bg-primary-400 rounded-2xl p-3 shadow-ios-lg">
              <MapPin class="w-6 h-6 text-gray-900" />
            </div>
            <div class="absolute -bottom-4 -right-4 bg-surplus-light rounded-2xl p-3 shadow-ios-lg">
              <TrendingUp class="w-6 h-6 text-surplus-dark" />
            </div>

            <!-- Mock Calculator Preview (static content) -->
            <div v-once class="space-y-4">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Calculator class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Kalkulator Beban Hidup</p>
                  <p class="text-sm text-gray-500">Simulasi keuangan</p>
                </div>
              </div>

              <!-- Mock Input -->
              <div class="space-y-3">
                <div class="bg-gray-50 rounded-2xl p-4">
                  <p class="text-xs text-gray-500 mb-1">Provinsi</p>
                  <p class="font-semibold text-gray-800">DKI Jakarta</p>
                </div>
                <div class="bg-gray-50 rounded-2xl p-4">
                  <p class="text-xs text-gray-500 mb-1">Penghasilan</p>
                  <p class="font-semibold text-gray-800">Rp 8.000.000</p>
                </div>
                <div class="bg-gray-50 rounded-2xl p-4">
                  <p class="text-xs text-gray-500 mb-1">Tanggungan</p>
                  <p class="font-semibold text-gray-800">2 orang</p>
                </div>
              </div>

              <!-- Mock Result -->
              <div class="bg-surplus-light rounded-2xl p-4 mt-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-surplus-dark font-medium">Status</p>
                    <p class="font-bold text-surplus-dark text-lg">SURPLUS</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-surplus-dark font-medium">Sisa</p>
                    <p class="font-bold text-surplus-dark text-lg">Rp 2.411.030</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in 0.6s ease-out 0.2s forwards;
  opacity: 0;
}
</style>

<script setup lang="ts">
import { CheckCircle, ExternalLink } from 'lucide-vue-next'

const highlights = [
  'Data pengeluaran per kapita dari SUSENAS BPS 2024',
  'Data UMR/UMP resmi 38 provinsi Indonesia',
  'Perhitungan berdasarkan jumlah tanggungan',
  'Analisis surplus/defisit otomatis',
  'Tidak memerlukan login atau registrasi',
  'Open source dan gratis selamanya',
]
</script>

<template>
  <section id="about" class="py-16 lg:py-24 relative overflow-hidden">
    <!-- Background handled by global mesh gradient in index.vue -->
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <!-- Left Content -->
        <div class="flex-1">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm text-primary-700 text-sm font-semibold rounded-full mb-4 border border-white/50 shadow-sm">
            Tentang
          </span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Apa itu <span class="text-primary-500">Finara</span>?
          </h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            <strong class="text-gray-800">Finara</strong> (Financial Ara/Calculator) adalah kalkulator beban hidup yang membantu kamu memahami apakah penghasilanmu cukup untuk biaya hidup di provinsi tertentu di Indonesia.
          </p>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Dengan menggunakan data resmi dari <strong class="text-gray-800">Badan Pusat Statistik (BPS)</strong>, kamu bisa mendapatkan gambaran akurat tentang kondisi finansialmu dibandingkan dengan rata-rata pengeluaran di daerahmu.
          </p>

          <!-- Highlights -->
          <div class="space-y-3">
            <div
              v-for="highlight in highlights"
              :key="highlight"
              class="flex items-start gap-3"
            >
              <CheckCircle class="w-5 h-5 text-surplus flex-shrink-0 mt-0.5" />
              <span class="text-gray-700">{{ highlight }}</span>
            </div>
          </div>
        </div>

        <!-- Right - Data Sources Card (Glassmorphism) -->
        <div class="flex-1 w-full">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-bento border border-white/50">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Sumber Data</h3>
            
            <div class="space-y-4">
              <!-- BPS -->
              <a
                href="https://www.bps.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200 group"
              >
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">📊</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Badan Pusat Statistik
                  </p>
                  <p class="text-sm text-gray-500 truncate">Data pengeluaran per kapita 2024</p>
                </div>
                <ExternalLink class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
              </a>

              <!-- UMR Data -->
              <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">💰</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900">UMP 2024</p>
                  <p class="text-sm text-gray-500">Upah Minimum Provinsi resmi</p>
                </div>
              </div>

              <!-- GeoJSON -->
              <a
                href="https://github.com/superpikar/indonesia-geojson"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200 group"
              >
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">🗺️</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Indonesia GeoJSON
                  </p>
                  <p class="text-sm text-gray-500 truncate">Peta provinsi Indonesia</p>
                </div>
                <ExternalLink class="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>




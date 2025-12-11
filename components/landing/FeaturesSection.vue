<script setup lang="ts">
import { Database, Shield, Zap, MapPin, PiggyBank, BarChart3 } from 'lucide-vue-next'

interface Feature {
  icon: typeof Database
  title: string
  description: string
  color: string
  bgColor: string
}

const features: Feature[] = [
  {
    icon: Database,
    title: 'Data Akurat',
    description: 'Menggunakan data resmi BPS 2024 untuk pengeluaran per kapita dan UMR setiap provinsi.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Shield,
    title: 'Privasi Aman',
    description: 'Data tidak disimpan di server. Semua kalkulasi dilakukan langsung di browser kamu.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Zap,
    title: 'Real-time',
    description: 'Hasil perhitungan instan tanpa loading. Ubah input, langsung lihat hasilnya.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: MapPin,
    title: 'Peta Interaktif',
    description: 'Pilih provinsi langsung dari peta Indonesia yang interaktif dan mudah digunakan.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: PiggyBank,
    title: 'Analisis Lengkap',
    description: 'Lihat breakdown pengeluaran makanan, non-makanan, dan perbandingan dengan UMR.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    icon: BarChart3,
    title: 'Visual Intuitif',
    description: 'Progress bar dan indikator visual yang memudahkan memahami kondisi keuangan.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
]
</script>

<template>
  <section id="features" class="py-16 lg:py-24 bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-1/2 left-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 -translate-x-1/2" />
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
          Fitur Unggulan
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Kenapa Pakai <span class="text-primary-500">Finara</span>?
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Dirancang untuk memberikan insight finansial yang akurat dan mudah dipahami.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="group bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-ios hover:shadow-ios-xl hover:-translate-y-2 transition-all duration-500"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Icon -->
          <div
            :class="[feature.bgColor]"
            class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
          >
            <component
              :is="feature.icon"
              :class="[feature.color]"
              class="w-7 h-7"
            />
          </div>

          <!-- Content -->
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Data Ticker - Infinite Marquee Component
 * 
 * A stock market-style scrolling ticker displaying quick stats
 * about provinces to showcase data richness.
 */

interface TickerItem {
  province: string
  stat: string
  value: string
  type: 'umr' | 'expense' | 'status'
}

const tickerItems: TickerItem[] = [
  { province: 'DKI Jakarta', stat: 'UMR', value: 'Rp 5.067.381', type: 'umr' },
  { province: 'DI Yogyakarta', stat: 'Pengeluaran', value: 'Rp 1.698.000', type: 'expense' },
  { province: 'Jawa Barat', stat: 'Defisit Rata-rata', value: '10%', type: 'status' },
  { province: 'Bali', stat: 'UMR', value: 'Rp 2.971.649', type: 'umr' },
  { province: 'Jawa Tengah', stat: 'Pengeluaran', value: 'Rp 1.542.000', type: 'expense' },
  { province: 'Kalimantan Timur', stat: 'UMR', value: 'Rp 3.454.698', type: 'umr' },
  { province: 'Sulawesi Utara', stat: 'Surplus Rata-rata', value: '15%', type: 'status' },
  { province: 'Papua', stat: 'UMR', value: 'Rp 4.024.000', type: 'umr' },
  { province: 'Sumatera Utara', stat: 'Pengeluaran', value: 'Rp 1.823.000', type: 'expense' },
  { province: 'Riau', stat: 'UMR', value: 'Rp 3.307.634', type: 'umr' },
]

const getTypeColor = (type: TickerItem['type']) => {
  switch (type) {
    case 'umr':
      return 'text-blue-600'
    case 'expense':
      return 'text-orange-600'
    case 'status':
      return 'text-green-600'
    default:
      return 'text-gray-600'
  }
}
</script>

<template>
  <section class="py-4 bg-white/60 backdrop-blur-sm border-y border-gray-100/50 overflow-hidden">
    <div class="relative">
      <!-- Fade edges -->
      <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
      <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />
      
      <!-- Marquee container -->
      <div class="flex animate-marquee">
        <!-- First set of items -->
        <div class="flex items-center gap-8 shrink-0">
          <template v-for="(item, index) in tickerItems" :key="`a-${index}`">
            <div class="flex items-center gap-3 px-4 py-2 whitespace-nowrap">
              <span class="font-semibold text-gray-900">{{ item.province }}</span>
              <span class="text-gray-400">•</span>
              <span class="text-gray-500">{{ item.stat }}</span>
              <span :class="getTypeColor(item.type)" class="font-bold">{{ item.value }}</span>
            </div>
            <span class="text-gray-200 text-lg">|</span>
          </template>
        </div>
        
        <!-- Duplicate for seamless loop -->
        <div class="flex items-center gap-8 shrink-0">
          <template v-for="(item, index) in tickerItems" :key="`b-${index}`">
            <div class="flex items-center gap-3 px-4 py-2 whitespace-nowrap">
              <span class="font-semibold text-gray-900">{{ item.province }}</span>
              <span class="text-gray-400">•</span>
              <span class="text-gray-500">{{ item.stat }}</span>
              <span :class="getTypeColor(item.type)" class="font-bold">{{ item.value }}</span>
            </div>
            <span class="text-gray-200 text-lg">|</span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>


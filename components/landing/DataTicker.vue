<script setup lang="ts">
const { t } = useI18n()

interface TickerItem {
  province: string
  statKey: string
  value: string
  type: 'umr' | 'expense' | 'status'
}

const tickerItems: TickerItem[] = [
  { province: 'DKI Jakarta', statKey: 'ticker.umr', value: 'Rp 5.067.381', type: 'umr' },
  { province: 'DI Yogyakarta', statKey: 'ticker.expense', value: 'Rp 1.698.000', type: 'expense' },
  { province: 'Jawa Barat', statKey: 'ticker.avgDeficit', value: '10%', type: 'status' },
  { province: 'Bali', statKey: 'ticker.umr', value: 'Rp 2.971.649', type: 'umr' },
  { province: 'Jawa Tengah', statKey: 'ticker.expense', value: 'Rp 1.542.000', type: 'expense' },
  { province: 'Kalimantan Timur', statKey: 'ticker.umr', value: 'Rp 3.454.698', type: 'umr' },
  { province: 'Sulawesi Utara', statKey: 'ticker.avgSurplus', value: '15%', type: 'status' },
  { province: 'Papua', statKey: 'ticker.umr', value: 'Rp 4.024.000', type: 'umr' },
  { province: 'Sumatera Utara', statKey: 'ticker.expense', value: 'Rp 1.823.000', type: 'expense' },
  { province: 'Riau', statKey: 'ticker.umr', value: 'Rp 3.307.634', type: 'umr' },
]

const getTypeColor = (type: TickerItem['type']) => {
  switch (type) {
    case 'umr':
      return 'text-blue-600 dark:text-blue-400'
    case 'expense':
      return 'text-orange-600 dark:text-orange-400'
    case 'status':
      return 'text-green-600 dark:text-green-400'
    default:
      return 'text-gray-600 dark:text-slate-400'
  }
}
</script>

<template>
  <section class="py-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-y border-gray-100/50 dark:border-slate-700/50 overflow-hidden">
    <div class="relative">
      <!-- Fade edges -->
      <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/90 dark:from-slate-900/90 to-transparent z-10 pointer-events-none" />
      <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/90 dark:from-slate-900/90 to-transparent z-10 pointer-events-none" />
      
      <!-- Marquee container -->
      <div class="flex animate-marquee">
        <!-- First set of items -->
        <div class="flex items-center gap-8 shrink-0">
          <template v-for="(item, index) in tickerItems" :key="`a-${index}`">
            <div class="flex items-center gap-3 px-4 py-2 whitespace-nowrap">
              <span class="font-semibold text-gray-900 dark:text-white">{{ item.province }}</span>
              <span class="text-gray-400 dark:text-slate-600">•</span>
              <span class="text-gray-500 dark:text-slate-400">{{ t(item.statKey) }}</span>
              <span :class="getTypeColor(item.type)" class="font-bold">{{ item.value }}</span>
            </div>
            <span class="text-gray-200 dark:text-slate-700 text-lg">|</span>
          </template>
        </div>
        
        <!-- Duplicate for seamless loop -->
        <div class="flex items-center gap-8 shrink-0">
          <template v-for="(item, index) in tickerItems" :key="`b-${index}`">
            <div class="flex items-center gap-3 px-4 py-2 whitespace-nowrap">
              <span class="font-semibold text-gray-900 dark:text-white">{{ item.province }}</span>
              <span class="text-gray-400 dark:text-slate-600">•</span>
              <span class="text-gray-500 dark:text-slate-400">{{ t(item.statKey) }}</span>
              <span :class="getTypeColor(item.type)" class="font-bold">{{ item.value }}</span>
            </div>
            <span class="text-gray-200 dark:text-slate-700 text-lg">|</span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

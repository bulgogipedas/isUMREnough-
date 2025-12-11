<script setup lang="ts">
/**
 * ComparisonWidget - Province comparison feature
 * 
 * Redesigned for narrow container (420-480px dashboard panel)
 * - Always vertical stack for reliability
 * - Clear visual hierarchy
 * - No overlapping elements
 */
import { 
  ArrowRightLeft, 
  ChevronDown, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  X,
  ArrowDown
} from 'lucide-vue-next'
import { useCalculatorStore } from '~/stores/calculator'
import { formatCurrency } from '~/utils/formatters'

const store = useCalculatorStore()

// Handle target province selection
const handleTargetSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target.value) {
    const province = store.targetProvinceList.find(p => p.id === target.value)
    if (province) {
      store.selectTargetProvince(province.id, province.name)
    }
  }
}

// Close comparison widget
const handleClose = () => {
  store.setShowComparison(false)
}

// Computed values
const originResult = computed(() => store.calculationResults)
const targetResult = computed(() => store.targetCalculation)
const insight = computed(() => store.comparisonInsight)
const hasComparison = computed(() => originResult.value && targetResult.value && insight.value)

// Format the insight message
const insightMessage = computed(() => {
  if (!insight.value || !store.targetProvinceName) return ''
  
  const diff = Math.abs(insight.value.diffSurplus)
  const formattedDiff = formatCurrency(diff)
  
  if (insight.value.isBetter) {
    return `Pindah ke ${store.targetProvinceName} bisa hemat ${formattedDiff}/bulan`
  } else if (insight.value.diffSurplus < 0) {
    return `Biaya di ${store.targetProvinceName} lebih tinggi ${formattedDiff}/bulan`
  }
  return `Biaya hidup di kedua provinsi hampir sama`
})

// Cost change text
const costChangeText = computed(() => {
  if (!insight.value) return ''
  const pct = Math.abs(insight.value.percentageChange).toFixed(1)
  if (insight.value.percentageChange < 0) {
    return `↓ ${pct}% lebih murah`
  } else if (insight.value.percentageChange > 0) {
    return `↑ ${pct}% lebih mahal`
  }
  return 'Biaya sama'
})

// Difference in surplus for display
const surplusDiff = computed(() => {
  if (!insight.value) return null
  return {
    value: insight.value.diffSurplus,
    formatted: formatCurrency(Math.abs(insight.value.diffSurplus)),
    isPositive: insight.value.diffSurplus > 0,
    isNegative: insight.value.diffSurplus < 0
  }
})
</script>

<template>
  <div class="space-y-4">
    <!-- Header with close button -->
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <ArrowRightLeft class="w-4 h-4 text-primary-500" />
        Bandingkan Kota
      </h3>
      <button
        type="button"
        class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Tutup perbandingan"
        @click="handleClose"
      >
        <X class="w-4 h-4 text-gray-400" />
      </button>
    </div>

    <!-- Target Province Selector -->
    <div class="space-y-1.5">
      <label class="block text-xs font-medium text-gray-600">
        <MapPin class="w-3.5 h-3.5 inline mr-1 text-gray-400" />
        Pilih Kota Tujuan
      </label>
      <div class="relative">
        <select
          :value="store.targetProvinceId || ''"
          class="w-full px-4 py-3 bg-white border-2 border-primary-300 rounded-2xl text-gray-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200 pr-10 text-sm"
          @change="handleTargetSelect"
        >
          <option value="" disabled>Pilih provinsi tujuan...</option>
          <option 
            v-for="province in store.targetProvinceList" 
            :key="province.id" 
            :value="province.id"
          >
            {{ province.name }}
          </option>
        </select>
        <ChevronDown class="w-4 h-4 text-primary-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>

    <!-- Comparison Results -->
    <div v-if="hasComparison" class="space-y-3">
      
      <!-- Comparison Table Style -->
      <div class="bg-gray-50 rounded-2xl overflow-hidden">
        <!-- Table Header -->
        <div class="grid grid-cols-3 gap-2 px-4 py-2.5 bg-gray-100 text-xs font-medium text-gray-500">
          <div>Keterangan</div>
          <div class="text-right">Saat Ini</div>
          <div class="text-right">Tujuan</div>
        </div>

        <!-- Province Names -->
        <div class="grid grid-cols-3 gap-2 px-4 py-3 border-b border-gray-200">
          <div class="text-xs text-gray-500">Provinsi</div>
          <div class="text-right">
            <span class="text-xs font-semibold text-gray-700 truncate block">
              {{ store.selectedProvinceName }}
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold text-primary-600 truncate block">
              {{ store.targetProvinceName }}
            </span>
          </div>
        </div>

        <!-- Pengeluaran Row -->
        <div class="grid grid-cols-3 gap-2 px-4 py-3 border-b border-gray-200">
          <div class="text-xs text-gray-500">Pengeluaran</div>
          <div class="text-right">
            <span class="text-xs font-medium text-gray-700">
              {{ formatCurrency(originResult!.totalExpense) }}
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-medium text-gray-700">
              {{ formatCurrency(targetResult!.totalExpense) }}
            </span>
          </div>
        </div>

        <!-- Surplus Row -->
        <div class="grid grid-cols-3 gap-2 px-4 py-3">
          <div class="text-xs text-gray-500">Sisa/Surplus</div>
          <div class="text-right">
            <span 
              class="text-xs font-bold"
              :class="originResult!.balance >= 0 ? 'text-surplus-dark' : 'text-deficit-dark'"
            >
              {{ formatCurrency(originResult!.balance) }}
            </span>
          </div>
          <div class="text-right">
            <span 
              class="text-xs font-bold"
              :class="targetResult!.balance >= 0 ? 'text-surplus-dark' : 'text-deficit-dark'"
            >
              {{ formatCurrency(targetResult!.balance) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Difference Highlight -->
      <div 
        class="rounded-2xl p-4"
        :class="insight!.isBetter ? 'bg-surplus-light' : insight!.diffSurplus < 0 ? 'bg-deficit-light' : 'bg-gray-100'"
      >
        <!-- Main Insight -->
        <div class="flex items-center gap-3">
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="insight!.isBetter ? 'bg-surplus/20' : insight!.diffSurplus < 0 ? 'bg-deficit/20' : 'bg-gray-200'"
          >
            <TrendingUp 
              v-if="insight!.isBetter" 
              class="w-5 h-5 text-surplus-dark" 
            />
            <TrendingDown 
              v-else-if="insight!.diffSurplus < 0" 
              class="w-5 h-5 text-deficit-dark" 
            />
            <ArrowRightLeft 
              v-else 
              class="w-5 h-5 text-gray-500" 
            />
          </div>
          
          <div class="flex-1 min-w-0">
            <!-- Difference Amount -->
            <div class="flex items-baseline gap-1.5 flex-wrap">
              <span 
                v-if="surplusDiff && surplusDiff.value !== 0"
                class="text-lg font-bold"
                :class="surplusDiff.isPositive ? 'text-surplus-dark' : 'text-deficit-dark'"
              >
                {{ surplusDiff.isPositive ? '+' : '-' }}{{ surplusDiff.formatted }}
              </span>
              <span 
                class="text-xs font-medium"
                :class="insight!.isBetter ? 'text-surplus-dark' : insight!.diffSurplus < 0 ? 'text-deficit-dark' : 'text-gray-600'"
              >
                {{ costChangeText }}
              </span>
            </div>
            
            <!-- Description -->
            <p 
              class="text-xs mt-1 leading-relaxed"
              :class="insight!.isBetter ? 'text-surplus-dark/80' : insight!.diffSurplus < 0 ? 'text-deficit-dark/80' : 'text-gray-500'"
            >
              {{ insightMessage }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- Empty State when no target selected -->
    <div 
      v-else-if="!store.targetProvinceId" 
      class="bg-gray-50 rounded-2xl p-5 text-center"
    >
      <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
        <ArrowDown class="w-5 h-5 text-gray-400" />
      </div>
      <p class="text-xs text-gray-500">
        Pilih kota tujuan untuk melihat perbandingan
      </p>
    </div>
  </div>
</template>

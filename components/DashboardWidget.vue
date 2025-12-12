<script setup lang="ts">
/**
 * Dashboard Widget - Premium iOS Style with Micro-Interactions
 * 
 * Features:
 * - Smooth tab transitions
 * - Balanced Province/Tanggungan layout
 * - Hover effects & animations
 * - Staggered entrance for results
 */
import { ArrowRightLeft, Wallet, MapPin, Users, TrendingUp, TrendingDown, Sparkles, ChevronDown } from 'lucide-vue-next'
import { useCalculatorStore } from '~/stores/calculator'
import type { ProvinceOption } from '~/types'
import { formatCurrency, formatNumber } from '~/utils/formatters'

defineProps<{
  provinceList: ProvinceOption[]
}>()

const store = useCalculatorStore()

// Tab state with transition direction
const activeTab = ref<'analysis' | 'compare'>('analysis')
const tabDirection = ref<'left' | 'right'>('right')

const switchTab = (tab: 'analysis' | 'compare') => {
  tabDirection.value = tab === 'compare' ? 'right' : 'left'
  activeTab.value = tab
}

// Local income display
const incomeDisplay = ref('')

watch(() => store.income, (val) => {
  if (val === 0) {
    incomeDisplay.value = ''
  } else {
    const current = parseFloat(incomeDisplay.value.replace(/\./g, '')) || 0
    if (val !== current) {
      incomeDisplay.value = formatNumber(val)
    }
  }
}, { immediate: true })

const handleIncomeInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const raw = target.value.replace(/[^\d]/g, '')
  const num = parseInt(raw, 10) || 0
  incomeDisplay.value = num > 0 ? formatNumber(num) : ''
  store.setIncome(num)
}

const handleProvinceSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const province = store.provinceList.find(p => p.id === target.value)
  if (province) {
    store.selectProvince(province.id, province.name)
  }
}

// Dependents with animation
const isAdjusting = ref(false)
const adjustDependents = (delta: number) => {
  isAdjusting.value = true
  store.setDependents(store.dependents + delta)
  setTimeout(() => { isAdjusting.value = false }, 150)
}

const handleTargetSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const province = store.provinceList.find(p => p.id === target.value)
  if (province) {
    store.selectTargetProvince(province.id, province.name)
  }
}

// Computed
const result = computed(() => store.calculationResults)
const targetResult = computed(() => store.targetCalculation)
const hasIncome = computed(() => store.income > 0)
const hasProvince = computed(() => store.selectedProvinceId && store.currentProvince)
const isReady = computed(() => hasIncome.value && hasProvince.value)
const provinceData = computed(() => store.currentProvince)

// Purchase power
const purchasePower = computed(() => {
  if (!result.value || !hasIncome.value) return null
  const balance = result.value.balance
  if (balance >= 5000000) return { label: 'SULTAN', emoji: '👑', color: 'from-amber-400 to-yellow-500', textColor: 'text-amber-900', insight: 'Bisa beli iPhone baru tiap bulan!' }
  if (balance >= 3000000) return { label: 'MAPAN', emoji: '💪', color: 'from-emerald-400 to-green-500', textColor: 'text-emerald-900', insight: 'Cukup untuk liburan tiap 3 bulan' }
  if (balance >= 1000000) return { label: 'CUKUP', emoji: '👍', color: 'from-blue-400 to-cyan-500', textColor: 'text-blue-900', insight: 'Masih bisa nabung rutin' }
  if (balance >= 0) return { label: 'PAS', emoji: '😅', color: 'from-slate-400 to-gray-500', textColor: 'text-slate-900', insight: 'Harus pintar atur keuangan' }
  return { label: 'DEFISIT', emoji: '😰', color: 'from-red-400 to-rose-500', textColor: 'text-red-900', insight: 'Perlu cari penghasilan tambahan' }
})

// Budget bar
const budgetBar = computed(() => {
  if (!result.value || store.income === 0) return { expense: 0, savings: 0 }
  const expensePercent = Math.min((result.value.totalExpense / store.income) * 100, 100)
  const savingsPercent = Math.max(100 - expensePercent, 0)
  return { expense: expensePercent, savings: savingsPercent }
})

// National average
const nationalAverage = computed(() => {
  const provinces = Object.values(store.provinceData)
  if (provinces.length === 0) return 0
  const total = provinces.reduce((sum, p) => sum + (p.expenditurePerCapita || 0), 0)
  return Math.round(total / provinces.length)
})

// Comparison
const comparison = computed(() => {
  if (!result.value || !targetResult.value) return null
  const diff = targetResult.value.monthlyPerCapita - result.value.monthlyPerCapita
  const percentDiff = ((diff / result.value.monthlyPerCapita) * 100).toFixed(0)
  return {
    diff,
    percentDiff,
    isCheaper: diff < 0,
    savingsPerMonth: result.value.balance - targetResult.value.balance,
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header with Tabs -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Kalkulator</h1>
        <p class="text-xs text-slate-400 tracking-widest uppercase mt-1">Analisis Finansial</p>
      </div>
      
      <!-- Tab Pills - Clean Design -->
      <div class="flex bg-slate-100 rounded-2xl p-1">
        <button
          class="px-4 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-300"
          :class="activeTab === 'analysis' 
            ? 'bg-white text-slate-800 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600'"
          @click="switchTab('analysis')"
        >
          ANALISIS
        </button>
        <button
          class="px-4 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-300"
          :class="activeTab === 'compare' 
            ? 'bg-white text-slate-800 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600'"
          @click="switchTab('compare')"
        >
          BANDINGKAN
        </button>
      </div>
    </div>

    <!-- Tab Content with Transitions -->
    <Transition :name="tabDirection === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
      <!-- ====== ANALYSIS TAB ====== -->
      <div v-if="activeTab === 'analysis'" key="analysis" class="space-y-6">
        <!-- MASSIVE Income Input -->
        <div class="space-y-3">
          <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Wallet class="w-4 h-4" />
            Penghasilan Bulanan
          </label>
          <div class="relative group">
            <span class="absolute left-0 top-1/2 -translate-y-1/2 text-4xl lg:text-5xl font-light text-slate-300 transition-colors group-focus-within:text-amber-400">Rp</span>
            <input
              :value="incomeDisplay"
              type="text"
              inputmode="numeric"
              placeholder="5.000.000"
              class="w-full pl-16 lg:pl-20 pr-4 py-4 text-4xl lg:text-5xl font-bold text-slate-800 bg-transparent border-b-2 border-slate-200 focus:border-amber-400 transition-all duration-300 placeholder:text-slate-200 placeholder:font-light outline-none tracking-tight"
              @input="handleIncomeInput"
            >
            <!-- Focus glow -->
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
          <p class="text-xs text-slate-400">Masukkan total gaji bersih per bulan</p>
        </div>

        <!-- Province & Dependents - BALANCED -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Province - Now with matching height -->
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5" />
              Provinsi
            </label>
            <div class="relative group">
              <select
                :value="store.selectedProvinceId || ''"
                class="w-full h-[72px] px-4 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl appearance-none cursor-pointer transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 focus:ring-2 focus:ring-amber-200 focus:border-amber-300 focus:bg-white"
                @change="handleProvinceSelect"
              >
                <option value="" disabled class="text-slate-400">Pilih provinsi...</option>
                <option v-for="p in provinceList" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none transition-transform group-hover:translate-y-[-45%]" />
            </div>
            <p class="text-[10px] text-slate-400">atau klik pada peta</p>
          </div>

          <!-- Dependents - Same height as Province -->
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <Users class="w-3.5 h-3.5" />
              Tanggungan
            </label>
            <div class="flex items-center justify-between h-[72px] bg-slate-50 border border-slate-200 rounded-2xl px-3 transition-colors hover:border-slate-300 hover:bg-slate-100">
              <button
                :disabled="store.dependents <= 1"
                class="w-12 h-12 rounded-xl bg-white text-slate-600 font-bold text-xl shadow-sm transition-all duration-200 hover:bg-amber-50 hover:text-amber-600 hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:shadow-sm"
                @click="adjustDependents(-1)"
              >−</button>
              <div class="text-center">
                <span 
                  class="text-3xl font-bold text-slate-800 inline-block transition-transform duration-150"
                  :class="{ 'scale-125': isAdjusting }"
                >{{ store.dependents }}</span>
                <p class="text-[10px] text-slate-400 uppercase tracking-widest">orang</p>
              </div>
              <button
                class="w-12 h-12 rounded-xl bg-white text-slate-600 font-bold text-xl shadow-sm transition-all duration-200 hover:bg-amber-50 hover:text-amber-600 hover:shadow-md hover:scale-105 active:scale-95"
                @click="adjustDependents(1)"
              >+</button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <Transition name="fade" mode="out-in">
          <div v-if="!hasIncome" key="empty" class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-8">
            <div class="absolute inset-0 opacity-30 blur-sm pointer-events-none">
              <div class="h-6 w-3/4 bg-slate-200 rounded-full mb-4 mx-auto" />
              <div class="h-16 w-full bg-slate-200 rounded-2xl mb-4" />
              <div class="h-24 w-full bg-slate-200 rounded-2xl" />
            </div>
            
            <div class="relative text-center py-4">
              <div class="w-16 h-16 mx-auto mb-4 bg-white rounded-3xl shadow-lg flex items-center justify-center animate-pulse">
                <Sparkles class="w-8 h-8 text-amber-400" />
              </div>
              <p class="text-slate-500 text-sm mb-2">Rata-rata pengeluaran nasional:</p>
              <p class="text-3xl font-bold text-slate-700 mb-4">{{ formatCurrency(nationalAverage) }}</p>
              <p class="text-amber-600 font-semibold text-sm">
                Masukkan gaji untuk melihat analisis ↑
              </p>
            </div>
          </div>

          <!-- Province Not Selected -->
          <div v-else-if="!hasProvince" key="no-province" class="rounded-3xl bg-slate-50 border border-slate-200 p-8 text-center">
            <div class="w-14 h-14 mx-auto mb-4 bg-white rounded-2xl shadow-md flex items-center justify-center">
              <MapPin class="w-7 h-7 text-slate-400 animate-bounce" />
            </div>
            <p class="text-slate-600 font-medium">Pilih provinsi untuk melihat analisis</p>
            <p class="text-slate-400 text-xs mt-1">Klik pada peta atau gunakan dropdown</p>
          </div>

          <!-- Results with staggered animation -->
          <div v-else-if="isReady && result && provinceData" key="results" class="space-y-6">
            <!-- Purchase Power Badge -->
            <div v-if="purchasePower" class="text-center space-y-3 animate-fade-in">
              <div :class="['inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-default', purchasePower.color]">
                <span class="text-2xl">{{ purchasePower.emoji }}</span>
                <span :class="['text-sm font-bold tracking-widest', purchasePower.textColor]">{{ purchasePower.label }}</span>
              </div>
              <p class="text-slate-500 text-sm">{{ purchasePower.insight }}</p>
            </div>

            <!-- Visual Budget Bar -->
            <div class="bg-slate-50 rounded-3xl p-6 border border-slate-100 animate-fade-in-delay-1">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold tracking-widest text-slate-400 uppercase">Alokasi Gaji</span>
                <span class="text-xs text-slate-500">{{ store.dependents }} orang • {{ store.selectedProvinceName }}</span>
              </div>
              
              <div class="relative h-12 bg-slate-200 rounded-2xl overflow-hidden flex">
                <div
                  class="h-full bg-gradient-to-r from-rose-400 to-orange-400 flex items-center justify-center transition-all duration-1000 ease-out"
                  :style="{ width: budgetBar.expense + '%' }"
                >
                  <span v-if="budgetBar.expense > 25" class="text-white text-xs font-bold tracking-wide">
                    {{ budgetBar.expense.toFixed(0) }}%
                  </span>
                </div>
                <div
                  class="h-full bg-gradient-to-r from-emerald-400 to-green-400 flex items-center justify-center transition-all duration-1000 ease-out"
                  :style="{ width: budgetBar.savings + '%' }"
                >
                  <span v-if="budgetBar.savings > 25" class="text-white text-xs font-bold tracking-wide">
                    {{ budgetBar.savings.toFixed(0) }}%
                  </span>
                </div>
              </div>
              
              <div class="flex justify-between mt-4">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-gradient-to-r from-rose-400 to-orange-400" />
                  <div>
                    <p class="text-xs text-slate-500">Pengeluaran</p>
                    <p class="text-sm font-bold text-slate-700">{{ formatCurrency(result.totalExpense) }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                  <div>
                    <p class="text-xs text-slate-500">Sisa</p>
                    <p :class="['text-sm font-bold', result.balance >= 0 ? 'text-emerald-600' : 'text-rose-600']">
                      {{ formatCurrency(result.balance) }}
                    </p>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-green-400" />
                </div>
              </div>
            </div>

            <!-- Status Card -->
            <div 
              :class="[
                'rounded-3xl p-6 border transition-all duration-500 animate-fade-in-delay-2',
                result.status === 'surplus' ? 'bg-emerald-50 border-emerald-100' : 
                result.status === 'deficit' ? 'bg-rose-50 border-rose-100' : 
                'bg-slate-50 border-slate-100'
              ]"
            >
              <div class="flex items-start gap-4">
                <div :class="[
                  'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform hover:scale-110',
                  result.status === 'surplus' ? 'bg-emerald-100' : 
                  result.status === 'deficit' ? 'bg-rose-100' : 'bg-slate-100'
                ]">
                  <TrendingUp v-if="result.status === 'surplus'" class="w-7 h-7 text-emerald-600" />
                  <TrendingDown v-else-if="result.status === 'deficit'" class="w-7 h-7 text-rose-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Status Keuangan</p>
                  <p :class="[
                    'text-2xl font-bold tracking-tight',
                    result.status === 'surplus' ? 'text-emerald-700' : 
                    result.status === 'deficit' ? 'text-rose-700' : 'text-slate-700'
                  ]">
                    {{ result.status === 'surplus' ? 'Surplus' : result.status === 'deficit' ? 'Defisit' : 'Seimbang' }}
                    <span class="text-lg font-normal ml-1">
                      {{ result.status !== 'neutral' ? formatCurrency(Math.abs(result.balance)) : '' }}
                    </span>
                  </p>
                  <p class="text-sm text-slate-600 mt-2">{{ store.analysisText }}</p>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-4 animate-fade-in-delay-3">
              <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-default">
                <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">UMP</p>
                <p class="text-xl font-bold text-slate-800">{{ formatCurrency(provinceData.ump) }}</p>
                <p :class="['text-xs font-semibold mt-1', store.income >= provinceData.ump ? 'text-emerald-600' : 'text-rose-600']">
                  {{ store.income >= provinceData.ump ? '✓ Di atas UMP' : '✗ Di bawah UMP' }}
                </p>
              </div>
              <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-default">
                <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Biaya Hidup</p>
                <p class="text-xl font-bold text-slate-800">{{ formatCurrency(result.monthlyPerCapita) }}</p>
                <p class="text-xs text-slate-400 mt-1">per kapita/bulan</p>
              </div>
            </div>

            <p class="text-[10px] text-slate-400 text-center tracking-widest uppercase">
              Data SUSENAS BPS 2024
            </p>
          </div>
        </Transition>
      </div>

      <!-- ====== COMPARE TAB ====== -->
      <div v-else key="compare" class="space-y-6">
        <!-- Origin & Target - Balanced -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <span>📍</span> Asal
            </label>
            <div class="relative group">
              <select
                :value="store.selectedProvinceId || ''"
                class="w-full h-14 px-4 text-sm font-semibold bg-blue-50 border border-blue-200 rounded-2xl appearance-none cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 focus:ring-2 focus:ring-blue-200"
                @change="handleProvinceSelect"
              >
                <option value="" disabled>Pilih...</option>
                <option v-for="p in provinceList" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <span>🎯</span> Tujuan
            </label>
            <div class="relative group">
              <select
                :value="store.targetProvinceId || ''"
                class="w-full h-14 px-4 text-sm font-semibold bg-amber-50 border border-amber-200 rounded-2xl appearance-none cursor-pointer transition-all duration-200 hover:border-amber-300 hover:bg-amber-100 focus:ring-2 focus:ring-amber-200"
                @change="handleTargetSelect"
              >
                <option value="" disabled>Pilih...</option>
                <option 
                  v-for="p in provinceList.filter(p => p.id !== store.selectedProvinceId)" 
                  :key="p.id" 
                  :value="p.id"
                >{{ p.name }}</option>
              </select>
              <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- Income -->
        <div class="space-y-2">
          <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Wallet class="w-4 h-4" />
            Penghasilan
          </label>
          <div class="relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-light text-slate-300 transition-colors group-focus-within:text-amber-400">Rp</span>
            <input
              :value="incomeDisplay"
              type="text"
              inputmode="numeric"
              placeholder="5.000.000"
              class="w-full pl-14 pr-4 py-4 text-2xl font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl transition-all duration-200 hover:border-slate-300 focus:ring-2 focus:ring-amber-200 focus:border-amber-300 focus:bg-white"
              @input="handleIncomeInput"
            >
          </div>
        </div>

        <!-- Comparison Results -->
        <Transition name="fade" mode="out-in">
          <div v-if="store.selectedProvinceId && store.targetProvinceId && hasIncome && result && targetResult && comparison" key="comparison-result" class="space-y-6">
            <!-- Tug of War Bar -->
            <div class="bg-slate-50 rounded-3xl p-6 border border-slate-100 animate-fade-in">
              <p class="text-xs font-bold tracking-widest text-slate-400 uppercase text-center mb-4">Perbandingan Biaya Hidup</p>
              
              <div class="relative h-14 bg-slate-200 rounded-2xl overflow-hidden flex">
                <div class="h-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center w-1/2 transition-all duration-500">
                  <span class="text-white text-xs font-bold">{{ formatCurrency(result.monthlyPerCapita) }}</span>
                </div>
                <div class="h-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center w-1/2 transition-all duration-500">
                  <span class="text-amber-900 text-xs font-bold">{{ formatCurrency(targetResult.monthlyPerCapita) }}</span>
                </div>
                
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-full shadow-lg border border-slate-200 animate-bounce-once">
                  <span :class="['text-xs font-bold', comparison.isCheaper ? 'text-emerald-600' : 'text-rose-600']">
                    {{ comparison.isCheaper ? '' : '+' }}{{ comparison.percentDiff }}%
                  </span>
                </div>
              </div>

              <div class="flex justify-between mt-3 text-xs">
                <span class="text-blue-600 font-semibold">{{ store.selectedProvinceName }}</span>
                <span class="text-amber-600 font-semibold">{{ store.targetProvinceName }}</span>
              </div>
            </div>

            <!-- Verdict Card -->
            <div 
              :class="[
                'rounded-3xl p-6 border text-center animate-fade-in-delay-1 transition-all duration-500',
                comparison.savingsPerMonth > 0 ? 'bg-emerald-50 border-emerald-100' : 
                comparison.savingsPerMonth < 0 ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'
              ]"
            >
              <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Kesimpulan</p>
              
              <template v-if="comparison.savingsPerMonth > 0">
                <p class="text-lg font-bold text-emerald-700 mb-2">
                  Pindah ke {{ store.targetProvinceName }} lebih hemat! 🎉
                </p>
                <div class="bg-white rounded-2xl p-4 border border-emerald-200 inline-block transform hover:scale-105 transition-transform duration-300">
                  <p class="text-2xl font-bold text-emerald-600">+{{ formatCurrency(comparison.savingsPerMonth) }}</p>
                  <p class="text-xs text-emerald-600">lebih banyak tersisa per bulan</p>
                </div>
              </template>
              
              <template v-else-if="comparison.savingsPerMonth < 0">
                <p class="text-lg font-bold text-rose-700 mb-2">
                  Tetap di {{ store.selectedProvinceName }} lebih hemat
                </p>
                <div class="bg-white rounded-2xl p-4 border border-rose-200 inline-block transform hover:scale-105 transition-transform duration-300">
                  <p class="text-2xl font-bold text-rose-600">{{ formatCurrency(comparison.savingsPerMonth) }}</p>
                  <p class="text-xs text-rose-600">kurang tersisa jika pindah</p>
                </div>
              </template>
              
              <template v-else>
                <p class="text-lg font-bold text-slate-700">Biaya hidup sama di kedua kota</p>
              </template>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else key="comparison-empty" class="rounded-3xl bg-slate-50 border border-slate-100 p-10 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-md flex items-center justify-center">
              <ArrowRightLeft class="w-8 h-8 text-slate-300" />
            </div>
            <p class="text-slate-500 font-medium">Pilih dua provinsi dan masukkan gaji</p>
            <p class="text-slate-400 text-xs mt-1">untuk membandingkan biaya hidup</p>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Tab slide transitions */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Staggered fade in animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
.animate-fade-in-delay-1 {
  opacity: 0;
  animation: fadeIn 0.5s ease-out 0.1s forwards;
}
.animate-fade-in-delay-2 {
  opacity: 0;
  animation: fadeIn 0.5s ease-out 0.2s forwards;
}
.animate-fade-in-delay-3 {
  opacity: 0;
  animation: fadeIn 0.5s ease-out 0.3s forwards;
}

/* Bounce once for comparison pill */
@keyframes bounceOnce {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.15); }
}
.animate-bounce-once {
  animation: bounceOnce 0.4s ease-out;
}
</style>

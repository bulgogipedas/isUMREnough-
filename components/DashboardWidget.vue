<script setup lang="ts">
/**
 * Dashboard Widget - Premium iOS Style with Dark Mode & i18n
 */
import { ArrowRightLeft, Wallet, MapPin, Users, TrendingUp, TrendingDown, Sparkles, ChevronDown } from 'lucide-vue-next'
import { useCalculatorStore } from '~/stores/calculator'
import type { ProvinceOption } from '~/types'
import { formatCurrency, formatNumber } from '~/utils/formatters'

defineProps<{
  provinceList: ProvinceOption[]
}>()

const { t } = useI18n()
const store = useCalculatorStore()

// Tab state
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

// Prevent non-numeric input
const handleIncomeKeydown = (e: KeyboardEvent) => {
  // Allow: backspace, delete, tab, escape, enter, arrows
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
  if (allowedKeys.includes(e.key)) return
  
  // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return
  
  // Block non-numeric
  if (!/^\d$/.test(e.key)) {
    e.preventDefault()
  }
}

const handleProvinceSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const province = store.provinceList.find(p => p.id === target.value)
  if (province) {
    store.selectProvince(province.id, province.name)
  }
}

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

// Purchase power with i18n
const purchasePower = computed(() => {
  if (!result.value || !hasIncome.value) return null
  const balance = result.value.balance
  if (balance >= 5000000) return { key: 'sultan', emoji: '👑', color: 'from-amber-400 to-yellow-500', textColor: 'text-amber-900' }
  if (balance >= 3000000) return { key: 'comfortable', emoji: '💪', color: 'from-emerald-400 to-green-500', textColor: 'text-emerald-900' }
  if (balance >= 1000000) return { key: 'enough', emoji: '👍', color: 'from-blue-400 to-cyan-500', textColor: 'text-blue-900' }
  if (balance >= 0) return { key: 'tight', emoji: '😅', color: 'from-slate-400 to-gray-500', textColor: 'text-slate-900' }
  return { key: 'deficit', emoji: '😰', color: 'from-red-400 to-rose-500', textColor: 'text-red-900' }
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
        <h1 class="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{{ t('calculator.title') }}</h1>
        <p class="text-xs text-slate-400 tracking-widest uppercase mt-1">{{ t('calculator.subtitle') }}</p>
      </div>
      
      <!-- Tab Pills -->
      <div class="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
        <button
          class="px-4 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-300"
          :class="activeTab === 'analysis' 
            ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'"
          @click="switchTab('analysis')"
        >
          {{ t('calculator.tabs.analysis') }}
        </button>
        <button
          class="px-4 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-300"
          :class="activeTab === 'compare' 
            ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'"
          @click="switchTab('compare')"
        >
          {{ t('calculator.tabs.compare') }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <Transition :name="tabDirection === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
      <!-- ====== ANALYSIS TAB ====== -->
      <div v-if="activeTab === 'analysis'" key="analysis" class="space-y-6">
        <!-- Income Input -->
        <div class="space-y-3">
          <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Wallet class="w-4 h-4" />
            {{ t('calculator.income.label') }}
          </label>
          <div class="relative group">
            <span class="absolute left-0 top-1/2 -translate-y-1/2 text-4xl lg:text-5xl font-light text-slate-300 dark:text-slate-600 transition-colors group-focus-within:text-amber-400">Rp</span>
            <input
              :value="incomeDisplay"
              type="text"
              inputmode="numeric"
              :placeholder="t('calculator.income.placeholder')"
              class="w-full pl-16 lg:pl-20 pr-4 py-4 text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-amber-400 transition-all duration-300 placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:font-light outline-none tracking-tight"
              @input="handleIncomeInput"
              @keydown="handleIncomeKeydown"
            >
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
          <p class="text-xs text-slate-400">{{ t('calculator.income.helper') }}</p>
        </div>

        <!-- Province & Dependents -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Province -->
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5" />
              {{ t('calculator.province.label') }}
            </label>
            <div class="relative group">
              <select
                :value="store.selectedProvinceId || ''"
                class="w-full h-[72px] px-4 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl appearance-none cursor-pointer transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 focus:border-amber-300 dark:focus:border-amber-600"
                @change="handleProvinceSelect"
              >
                <option value="" disabled class="text-slate-400">{{ t('calculator.province.placeholder') }}</option>
                <option v-for="p in provinceList" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
            <p class="text-[10px] text-slate-400">{{ t('calculator.province.helper') }}</p>
          </div>

          <!-- Dependents -->
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <Users class="w-3.5 h-3.5" />
              {{ t('calculator.dependents.label') }}
            </label>
            <div class="flex items-center justify-between h-[72px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 transition-colors">
              <button
                :disabled="store.dependents <= 1"
                class="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xl shadow-sm transition-all duration-200 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-30"
                @click="adjustDependents(-1)"
              >−</button>
              <div class="text-center">
                <span 
                  class="text-3xl font-bold text-slate-800 dark:text-white inline-block transition-transform duration-150"
                  :class="{ 'scale-125': isAdjusting }"
                >{{ store.dependents }}</span>
                <p class="text-[10px] text-slate-400 uppercase tracking-widest">{{ t('calculator.dependents.unit') }}</p>
              </div>
              <button
                class="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xl shadow-sm transition-all duration-200 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 hover:shadow-md hover:scale-105 active:scale-95"
                @click="adjustDependents(1)"
              >+</button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <Transition name="fade" mode="out-in">
          <div v-if="!hasIncome" key="empty" class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 p-8">
            <div class="relative text-center py-4">
              <div class="w-16 h-16 mx-auto mb-4 bg-white dark:bg-slate-700 rounded-3xl shadow-lg flex items-center justify-center animate-pulse">
                <Sparkles class="w-8 h-8 text-amber-400" />
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm mb-2">{{ t('empty.noIncome.title') }}</p>
              <p class="text-3xl font-bold text-slate-700 dark:text-white mb-4">{{ formatCurrency(nationalAverage) }}</p>
              <p class="text-amber-600 dark:text-amber-400 font-semibold text-sm">{{ t('empty.noIncome.cta') }}</p>
            </div>
          </div>

          <div v-else-if="!hasProvince" key="no-province" class="rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 text-center">
            <div class="w-14 h-14 mx-auto mb-4 bg-white dark:bg-slate-700 rounded-2xl shadow-md flex items-center justify-center">
              <MapPin class="w-7 h-7 text-slate-400 animate-bounce" />
            </div>
            <p class="text-slate-600 dark:text-slate-300 font-medium">{{ t('empty.noProvince.title') }}</p>
            <p class="text-slate-400 text-xs mt-1">{{ t('empty.noProvince.subtitle') }}</p>
          </div>

          <!-- Results -->
          <div v-else-if="isReady && result && provinceData" key="results" class="space-y-6">
            <!-- Purchase Power Badge -->
            <div v-if="purchasePower" class="text-center space-y-3 animate-fade-in">
              <div :class="['inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-default', purchasePower.color]">
                <span class="text-2xl">{{ purchasePower.emoji }}</span>
                <span :class="['text-sm font-bold tracking-widest', purchasePower.textColor]">{{ t(`purchasePower.${purchasePower.key}.label`) }}</span>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm">{{ t(`purchasePower.${purchasePower.key}.insight`) }}</p>
            </div>

            <!-- Budget Bar -->
            <div class="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 animate-fade-in-delay-1">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold tracking-widest text-slate-400 uppercase">{{ t('results.allocation') }}</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">{{ store.dependents }} {{ t('calculator.dependents.unit') }} • {{ store.selectedProvinceName }}</span>
              </div>
              
              <div class="relative h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden flex">
                <div
                  class="h-full bg-gradient-to-r from-rose-400 to-orange-400 flex items-center justify-center transition-all duration-1000 ease-out"
                  :style="{ width: budgetBar.expense + '%' }"
                >
                  <span v-if="budgetBar.expense > 25" class="text-white text-xs font-bold tracking-wide">{{ budgetBar.expense.toFixed(0) }}%</span>
                </div>
                <div
                  class="h-full bg-gradient-to-r from-emerald-400 to-green-400 flex items-center justify-center transition-all duration-1000 ease-out"
                  :style="{ width: budgetBar.savings + '%' }"
                >
                  <span v-if="budgetBar.savings > 25" class="text-white text-xs font-bold tracking-wide">{{ budgetBar.savings.toFixed(0) }}%</span>
                </div>
              </div>
              
              <div class="flex justify-between mt-4">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-gradient-to-r from-rose-400 to-orange-400" />
                  <div>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ t('results.expense') }}</p>
                    <p class="text-sm font-bold text-slate-700 dark:text-white">{{ formatCurrency(result.totalExpense) }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                  <div>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ t('results.remaining') }}</p>
                    <p :class="['text-sm font-bold', result.balance >= 0 ? 'text-emerald-600' : 'text-rose-600']">{{ formatCurrency(result.balance) }}</p>
                  </div>
                  <div class="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-green-400" />
                </div>
              </div>
            </div>

            <!-- Status Card -->
            <div :class="[
              'rounded-3xl p-6 border transition-all duration-500 animate-fade-in-delay-2',
              result.status === 'surplus' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 
              result.status === 'deficit' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800' : 
              'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'
            ]">
              <div class="flex items-start gap-4">
                <div :class="[
                  'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0',
                  result.status === 'surplus' ? 'bg-emerald-100 dark:bg-emerald-800' : 
                  result.status === 'deficit' ? 'bg-rose-100 dark:bg-rose-800' : 'bg-slate-100 dark:bg-slate-700'
                ]">
                  <TrendingUp v-if="result.status === 'surplus'" class="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  <TrendingDown v-else-if="result.status === 'deficit'" class="w-7 h-7 text-rose-600 dark:text-rose-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">{{ t('results.status') }}</p>
                  <p :class="[
                    'text-2xl font-bold tracking-tight',
                    result.status === 'surplus' ? 'text-emerald-700 dark:text-emerald-400' : 
                    result.status === 'deficit' ? 'text-rose-700 dark:text-rose-400' : 'text-slate-700 dark:text-white'
                  ]">
                    {{ result.status === 'surplus' ? t('results.surplus') : result.status === 'deficit' ? t('results.deficit') : t('results.balanced') }}
                    <span class="text-lg font-normal ml-1">{{ result.status !== 'neutral' ? formatCurrency(Math.abs(result.balance)) : '' }}</span>
                  </p>
                  <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">{{ store.analysisText }}</p>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-4 animate-fade-in-delay-3">
              <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">{{ t('results.ump') }}</p>
                <p class="text-xl font-bold text-slate-800 dark:text-white">{{ formatCurrency(provinceData.ump) }}</p>
                <p :class="['text-xs font-semibold mt-1', store.income >= provinceData.ump ? 'text-emerald-600' : 'text-rose-600']">
                  {{ store.income >= provinceData.ump ? '✓ ' + t('results.aboveUmp') : '✗ ' + t('results.belowUmp') }}
                </p>
              </div>
              <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">{{ t('results.costOfLiving') }}</p>
                <p class="text-xl font-bold text-slate-800 dark:text-white">{{ formatCurrency(result.monthlyPerCapita) }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ t('results.perCapita') }}</p>
              </div>
            </div>

            <p class="text-[10px] text-slate-400 text-center tracking-widest uppercase">{{ t('app.dataSource') }}</p>
          </div>
        </Transition>
      </div>

      <!-- ====== COMPARE TAB ====== -->
      <div v-else key="compare" class="space-y-6">
        <!-- Origin & Target -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <span>📍</span> {{ t('calculator.origin') }}
            </label>
            <div class="relative">
              <select
                :value="store.selectedProvinceId || ''"
                class="w-full h-14 px-4 text-sm font-semibold bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-slate-700 dark:text-slate-200 rounded-2xl appearance-none cursor-pointer"
                @change="handleProvinceSelect"
              >
                <option value="" disabled>{{ t('calculator.province.placeholder') }}</option>
                <option v-for="p in provinceList" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <span>🎯</span> {{ t('calculator.target') }}
            </label>
            <div class="relative">
              <select
                :value="store.targetProvinceId || ''"
                class="w-full h-14 px-4 text-sm font-semibold bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-slate-700 dark:text-slate-200 rounded-2xl appearance-none cursor-pointer"
                @change="handleTargetSelect"
              >
                <option value="" disabled>{{ t('calculator.province.placeholder') }}</option>
                <option v-for="p in provinceList.filter(p => p.id !== store.selectedProvinceId)" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- Income -->
        <div class="space-y-2">
          <label class="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <Wallet class="w-4 h-4" />
            {{ t('calculator.income.label') }}
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-light text-slate-300 dark:text-slate-600">Rp</span>
            <input
              :value="incomeDisplay"
              type="text"
              inputmode="numeric"
              :placeholder="t('calculator.income.placeholder')"
              class="w-full pl-14 pr-4 py-4 text-2xl font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 outline-none"
              @input="handleIncomeInput"
              @keydown="handleIncomeKeydown"
            >
          </div>
        </div>

        <!-- Comparison Results -->
        <Transition name="fade" mode="out-in">
          <div v-if="store.selectedProvinceId && store.targetProvinceId && hasIncome && result && targetResult && comparison" key="comparison-result" class="space-y-6">
            <!-- Tug of War Bar -->
            <div class="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 animate-fade-in">
              <p class="text-xs font-bold tracking-widest text-slate-400 uppercase text-center mb-4">{{ t('comparison.title') }}</p>
              
              <div class="relative h-14 bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden flex">
                <div class="h-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center w-1/2">
                  <span class="text-white text-xs font-bold">{{ formatCurrency(result.monthlyPerCapita) }}</span>
                </div>
                <div class="h-full bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center w-1/2">
                  <span class="text-amber-900 text-xs font-bold">{{ formatCurrency(targetResult.monthlyPerCapita) }}</span>
                </div>
                
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-600">
                  <span :class="['text-xs font-bold', comparison.isCheaper ? 'text-emerald-600' : 'text-rose-600']">
                    {{ comparison.isCheaper ? '' : '+' }}{{ comparison.percentDiff }}%
                  </span>
                </div>
              </div>

              <div class="flex justify-between mt-3 text-xs">
                <span class="text-blue-600 dark:text-blue-400 font-semibold">{{ store.selectedProvinceName }}</span>
                <span class="text-amber-600 dark:text-amber-400 font-semibold">{{ store.targetProvinceName }}</span>
              </div>
            </div>

            <!-- Verdict Card -->
            <div :class="[
              'rounded-3xl p-6 border text-center animate-fade-in-delay-1',
              comparison.savingsPerMonth > 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 
              comparison.savingsPerMonth < 0 ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800' : 
              'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'
            ]">
              <p class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">{{ t('comparison.conclusion') }}</p>
              
              <template v-if="comparison.savingsPerMonth > 0">
                <p class="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                  {{ t('comparison.cheaper', { province: store.targetProvinceName }) }} 🎉
                </p>
                <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-700 inline-block">
                  <p class="text-2xl font-bold text-emerald-600">+{{ formatCurrency(comparison.savingsPerMonth) }}</p>
                  <p class="text-xs text-emerald-600 dark:text-emerald-400">{{ t('comparison.moreSavings') }}</p>
                </div>
              </template>
              
              <template v-else-if="comparison.savingsPerMonth < 0">
                <p class="text-lg font-bold text-rose-700 dark:text-rose-400 mb-2">
                  {{ t('comparison.expensive', { province: store.selectedProvinceName }) }}
                </p>
                <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-rose-200 dark:border-rose-700 inline-block">
                  <p class="text-2xl font-bold text-rose-600">{{ formatCurrency(comparison.savingsPerMonth) }}</p>
                  <p class="text-xs text-rose-600 dark:text-rose-400">{{ t('comparison.lessSavings') }}</p>
                </div>
              </template>
              
              <template v-else>
                <p class="text-lg font-bold text-slate-700 dark:text-white">{{ t('comparison.same') }}</p>
              </template>
            </div>
          </div>

          <div v-else key="comparison-empty" class="rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-10 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-white dark:bg-slate-700 rounded-2xl shadow-md flex items-center justify-center">
              <ArrowRightLeft class="w-8 h-8 text-slate-300 dark:text-slate-500" />
            </div>
            <p class="text-slate-500 dark:text-slate-400 font-medium">{{ t('empty.compare.title') }}</p>
            <p class="text-slate-400 text-xs mt-1">{{ t('empty.compare.subtitle') }}</p>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}
.slide-right-enter-from { opacity: 0; transform: translateX(20px); }
.slide-right-leave-to { opacity: 0; transform: translateX(-20px); }
.slide-left-enter-from { opacity: 0; transform: translateX(-20px); }
.slide-left-leave-to { opacity: 0; transform: translateX(20px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
.animate-fade-in-delay-1 { opacity: 0; animation: fadeIn 0.5s ease-out 0.1s forwards; }
.animate-fade-in-delay-2 { opacity: 0; animation: fadeIn 0.5s ease-out 0.2s forwards; }
.animate-fade-in-delay-3 { opacity: 0; animation: fadeIn 0.5s ease-out 0.3s forwards; }
</style>

<script setup lang="ts">
/**
 * Dashboard Widget - Orchestrates all dashboard sub-components
 * 
 * OPTIMIZATIONS:
 * - Uses store getters directly (no unnecessary props)
 * - Computed properties for derived state
 */
import { ArrowRightLeft } from 'lucide-vue-next'
import { useCalculatorStore } from '~/stores/calculator'
import type { ProvinceOption } from '~/types'

defineProps<{
  provinceList: ProvinceOption[]
}>()

const store = useCalculatorStore()

// Handle province selection from InputForm
const handleProvinceSelect = (provinceId: string) => {
  const province = store.provinceList.find(p => p.id === provinceId)
  if (province) {
    store.selectProvince(province.id, province.name)
  }
}

// Toggle comparison widget
const handleToggleComparison = () => {
  store.toggleComparison()
}

// Computed values from store
const result = computed(() => store.calculationResults)
const isReady = computed(() => store.selectedProvinceId && store.currentProvince)
const provinceData = computed(() => store.currentProvince)
const analysisText = computed(() => store.analysisText)
const showComparison = computed(() => store.showComparison)
</script>

<template>
  <div class="space-y-6">
    <!-- Header (static content) -->
    <DashboardHeader />

    <!-- Input Section -->
    <DashboardInputForm
      :province-list="provinceList"
      :selected-province-id="store.selectedProvinceId"
      :income="store.income"
      :dependents="store.dependents"
      @update:selected-province-id="handleProvinceSelect"
      @update:income="store.setIncome"
      @update:dependents="store.setDependents"
    />

    <!-- Results Section - Empty State -->
    <DashboardEmptyState v-if="!isReady" />

    <!-- Results Section - With Data -->
    <template v-else-if="result && provinceData">
      <!-- Status Card -->
      <DashboardResultStatus
        :status="result.status"
        :province-name="store.selectedProvinceName"
      />

      <!-- Analysis Card -->
      <DashboardAnalysisCard
        :total-expense="result.totalExpense"
        :income="store.income"
        :dependents="store.dependents"
        :income-vs-expense-ratio="result.incomeVsExpenseRatio"
      />

      <!-- Summary Card -->
      <DashboardSummaryCard
        :ump="provinceData.ump"
        :monthly-per-capita="result.monthlyPerCapita"
        :balance="result.balance"
        :analysis-text="analysisText"
      />

      <!-- Breakdown Card -->
      <DashboardBreakdownCard
        :expenditure-food="result.expenditureFood"
        :expenditure-non-food="result.expenditureNonFood"
        :total-expense="result.totalExpense"
        :income="store.income"
        :balance="result.balance"
      />

      <!-- UMP Comparison Card -->
      <DashboardUmpComparisonCard
        :ump-comparison="result.umpComparison"
        :province-name="store.selectedProvinceName"
      />

      <!-- Compare Button -->
      <button
        type="button"
        class="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-2xl text-primary-700 font-medium text-sm transition-all duration-200 active:scale-[0.98]"
        @click="handleToggleComparison"
      >
        <ArrowRightLeft class="w-4 h-4" />
        {{ showComparison ? 'Sembunyikan Perbandingan' : '🔀 Bandingkan dengan Kota Lain' }}
      </button>

      <!-- Comparison Widget with Slide Transition -->
      <Transition name="slide-expand">
        <BaseCard v-if="showComparison">
          <DashboardComparisonWidget />
        </BaseCard>
      </Transition>

      <!-- Info Note (static) -->
      <p v-once class="text-xs text-gray-400 text-center px-4">
        * Data pengeluaran per kapita berdasarkan Survei Sosial Ekonomi Nasional (SUSENAS) BPS 2024
      </p>
    </template>
  </div>
</template>

<style scoped>
/* Slide expand transition */
.slide-expand-enter-active,
.slide-expand-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.slide-expand-enter-from,
.slide-expand-leave-to {
  opacity: 0;
  transform: translateY(-12px);
  max-height: 0;
}

.slide-expand-enter-to,
.slide-expand-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1000px;
}
</style>

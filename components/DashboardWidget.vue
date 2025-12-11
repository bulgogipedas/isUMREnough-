<script setup lang="ts">
/**
 * Dashboard Widget - Orchestrates all dashboard sub-components
 * 
 * This component manages the calculator interface, handling user inputs
 * and displaying calculation results through modular sub-components.
 */
import { useCalculatorStore } from '~/stores/calculator'
import type { ProvinceOption } from '~/types'

// Sub-components are auto-imported by Nuxt with folder prefix (Dashboard*)

const props = defineProps<{
  provinceList: ProvinceOption[]
}>()

const store = useCalculatorStore()

// Handle province selection from InputForm
const handleProvinceSelect = (provinceId: string) => {
  const province = props.provinceList.find(p => p.id === provinceId)
  if (province) {
    store.selectProvince(province.id, province.name)
  }
}

// Computed values from store
const result = computed(() => store.calculationResult)
const isReady = computed(() => store.isCalculationReady)
const provinceData = computed(() => store.currentProvinceData)
const analysisText = computed(() => store.analysisText)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
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

      <!-- Info Note -->
      <div class="text-xs text-gray-400 text-center px-4">
        <p>
          * Data pengeluaran per kapita berdasarkan Survei Sosial Ekonomi Nasional (SUSENAS) BPS 2024
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Receipt } from 'lucide-vue-next'
import { formatCurrency } from '~/utils/formatters'
import { useStatusConfig } from '~/composables/useStatusConfig'

const props = defineProps<{
  totalExpense: number
  income: number
  dependents: number
  incomeVsExpenseRatio: number
}>()

const { getProgressBarColor, calculateProgressWidth } = useStatusConfig()

const progressColor = computed(() => getProgressBarColor(props.incomeVsExpenseRatio))
const progressWidth = computed(() => calculateProgressWidth(props.incomeVsExpenseRatio, 100))
const ratioTextColor = computed(() => 
  props.incomeVsExpenseRatio >= 100 ? 'text-surplus-dark' : 'text-deficit-dark'
)
</script>

<template>
  <BaseCard>
    <h3 class="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
      <Receipt class="w-4 h-4 text-gray-500" />
      Analisis Kelayakan Hidup
    </h3>
    
    <div class="grid grid-cols-2 gap-4 mb-5">
      <!-- Total Kebutuhan -->
      <div class="bg-gray-50 rounded-2xl p-4">
        <p class="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
          Total Kebutuhan ({{ dependents }} Orang)
        </p>
        <p class="text-xl font-bold text-gray-900">
          {{ formatCurrency(totalExpense) }}
        </p>
      </div>
      
      <!-- Gaji Anda -->
      <div class="bg-blue-50 rounded-2xl p-4">
        <p class="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">
          Gaji Anda
        </p>
        <p class="text-xl font-bold text-gray-900">
          {{ formatCurrency(income) }}
        </p>
      </div>
    </div>
    
    <!-- Progress Bar - Kekuatan Gaji vs Kebutuhan -->
    <div class="mb-2">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600">Kekuatan Gaji vs Kebutuhan</span>
        <span class="text-sm font-bold" :class="ratioTextColor">
          {{ incomeVsExpenseRatio.toFixed(0) }}%
        </span>
      </div>
      <div class="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          :class="progressColor"
          :style="{ width: progressWidth }"
        />
      </div>
    </div>
  </BaseCard>
</template>



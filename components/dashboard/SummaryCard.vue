<script setup lang="ts">
import { PiggyBank } from 'lucide-vue-next'
import { formatCurrency } from '~/utils/formatters'
import { useStatusConfig } from '~/composables/useStatusConfig'

const props = defineProps<{
  ump: number
  monthlyPerCapita: number
  balance: number
  analysisText: string
}>()

const { getBalanceColor } = useStatusConfig()

const balanceColor = computed(() => getBalanceColor(props.balance))
const formattedBalance = computed(() => {
  const prefix = props.balance >= 0 ? '' : '-'
  return `${prefix}${formatCurrency(Math.abs(props.balance))}`
})
</script>

<template>
  <BaseCard>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <PiggyBank class="w-4 h-4 text-gray-500" />
        Rincian Sisa & UMR
      </h3>
      <span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
        Data BPS 2024 (Updated)
      </span>
    </div>
    
    <div class="grid grid-cols-3 gap-3 mb-5">
      <!-- Standar UMR -->
      <div class="text-center">
        <p class="text-xs text-gray-500 mb-1">Standar UMR</p>
        <p class="text-sm font-bold text-gray-800">
          {{ formatCurrency(ump) }}
        </p>
      </div>
      
      <!-- Pengeluaran/Kapita -->
      <div class="text-center">
        <p class="text-xs text-gray-500 mb-1">Pengeluaran/Kapita</p>
        <p class="text-sm font-bold text-gray-800">
          {{ formatCurrency(monthlyPerCapita) }}
        </p>
      </div>
      
      <!-- Net Cashflow -->
      <div class="text-center">
        <p class="text-xs text-gray-500 mb-1">Net Cashflow</p>
        <p class="text-sm font-bold" :class="balanceColor">
          {{ formattedBalance }}
        </p>
      </div>
    </div>
    
    <!-- Analysis Text -->
    <div class="bg-gray-50 rounded-xl p-4">
      <p class="text-sm text-gray-600 leading-relaxed">
        <span class="font-semibold text-gray-800">Analisis:</span>
        {{ analysisText }}
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/formatters'
import { useStatusConfig } from '~/composables/useStatusConfig'

const props = defineProps<{
  expenditureFood: number
  expenditureNonFood: number
  totalExpense: number
  income: number
  balance: number
}>()

const { getBalanceColor, getBalanceBgColor } = useStatusConfig()

const balanceColor = computed(() => getBalanceColor(props.balance))
const balanceBgColor = computed(() => getBalanceBgColor(props.balance))
</script>

<template>
  <BaseCard>
    <h3 class="text-sm font-semibold text-gray-700 mb-4">
      Rincian Pengeluaran Bulanan
    </h3>
    
    <div class="space-y-3">
      <div class="flex justify-between items-center py-2 border-b border-gray-100">
        <span class="text-gray-600 text-sm">Pengeluaran Makanan</span>
        <span class="font-medium text-gray-800">
          {{ formatCurrency(expenditureFood) }}
        </span>
      </div>
      
      <div class="flex justify-between items-center py-2 border-b border-gray-100">
        <span class="text-gray-600 text-sm">Pengeluaran Non-Makanan</span>
        <span class="font-medium text-gray-800">
          {{ formatCurrency(expenditureNonFood) }}
        </span>
      </div>
      
      <div class="flex justify-between items-center py-2 border-b border-gray-100">
        <span class="text-gray-600 text-sm">Total Pengeluaran</span>
        <span class="font-semibold text-gray-800">
          {{ formatCurrency(totalExpense) }}
        </span>
      </div>
      
      <div class="flex justify-between items-center py-2 border-b border-gray-100">
        <span class="text-gray-600 text-sm">Penghasilan Anda</span>
        <span class="font-semibold text-gray-800">
          {{ formatCurrency(income) }}
        </span>
      </div>
      
      <div 
        class="flex justify-between items-center py-3 px-4 -mx-4 rounded-xl"
        :class="balanceBgColor"
      >
        <span class="font-semibold text-gray-700">Saldo Akhir</span>
        <span class="font-bold text-lg" :class="balanceColor">
          {{ formatCurrency(balance) }}
        </span>
      </div>
    </div>
  </BaseCard>
</template>

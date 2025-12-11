<script setup lang="ts">
import { Calculator, MapPin, Wallet, Users, ChevronDown } from 'lucide-vue-next'
import type { ProvinceOption } from '~/types'
import { formatNumber } from '~/utils/formatters'

const props = defineProps<{
  provinceList: ProvinceOption[]
  selectedProvinceId: string | null
  income: number
  dependents: number
}>()

const emit = defineEmits<{
  'update:selectedProvinceId': [id: string]
  'update:income': [value: number]
  'update:dependents': [value: number]
}>()

// Local state for formatted income display
const incomeDisplay = ref('')

// Sync income display with prop
watch(() => props.income, (newVal) => {
  const currentParsed = parseFloat(incomeDisplay.value.replace(/\./g, '')) || 0
  if (newVal !== currentParsed) {
    incomeDisplay.value = newVal > 0 ? formatNumber(newVal) : ''
  }
}, { immediate: true })

// Handle income input
const handleIncomeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const rawValue = target.value.replace(/[^\d]/g, '')
  const numValue = parseInt(rawValue, 10) || 0
  incomeDisplay.value = numValue > 0 ? formatNumber(numValue) : ''
  emit('update:income', numValue)
}

// Handle province selection
const handleProvinceSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target.value) {
    emit('update:selectedProvinceId', target.value)
  }
}

// Handle dependents change
const handleDependentsChange = (delta: number) => {
  const newValue = Math.max(1, props.dependents + delta)
  emit('update:dependents', newValue)
}
</script>

<template>
  <BaseCard>
    <h2 class="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
      <Calculator class="w-5 h-5 text-primary-500" />
      Data Keuangan
    </h2>

    <div class="space-y-5">
      <!-- Province Selection Dropdown -->
      <div class="space-y-1.5">
        <label class="block text-sm font-medium text-gray-700">
          <MapPin class="w-4 h-4 inline mr-1.5 text-gray-400" />
          Provinsi
        </label>
        <div class="relative">
          <select
            :value="selectedProvinceId || ''"
            class="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 pr-10"
            @change="handleProvinceSelect"
          >
            <option value="" disabled>Pilih provinsi...</option>
            <option 
              v-for="province in provinceList" 
              :key="province.id" 
              :value="province.id"
            >
              {{ province.name }}
            </option>
          </select>
          <ChevronDown class="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <p class="text-xs text-gray-500">
          Atau klik langsung pada peta di sebelah kiri
        </p>
      </div>

      <!-- Income Input -->
      <div class="space-y-1.5">
        <label class="block text-sm font-medium text-gray-700">
          <Wallet class="w-4 h-4 inline mr-1.5 text-gray-400" />
          Penghasilan Bulanan
        </label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            Rp
          </span>
          <input
            :value="incomeDisplay"
            type="text"
            inputmode="numeric"
            placeholder="0"
            class="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
            @input="handleIncomeInput"
          >
        </div>
        <p class="text-xs text-gray-500">
          Masukkan total penghasilan bersih per bulan
        </p>
      </div>

      <!-- Dependents Input -->
      <div class="space-y-1.5">
        <label class="block text-sm font-medium text-gray-700">
          <Users class="w-4 h-4 inline mr-1.5 text-gray-400" />
          Jumlah Tanggungan
        </label>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="w-12 h-12 rounded-xl bg-gray-100 text-gray-700 font-bold text-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="dependents <= 1"
            @click="handleDependentsChange(-1)"
          >
            −
          </button>
          <div class="flex-1 text-center">
            <span class="text-3xl font-bold text-gray-900">{{ dependents }}</span>
            <p class="text-xs text-gray-500 mt-1">orang</p>
          </div>
          <button
            type="button"
            class="w-12 h-12 rounded-xl bg-gray-100 text-gray-700 font-bold text-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            @click="handleDependentsChange(1)"
          >
            +
          </button>
        </div>
        <p class="text-xs text-gray-500 text-center">
          Termasuk diri sendiri dan anggota keluarga yang ditanggung
        </p>
      </div>
    </div>
  </BaseCard>
</template>


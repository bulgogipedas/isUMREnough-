<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import type { FinancialStatus } from '~/types'
import { useStatusConfig } from '~/composables/useStatusConfig'

const props = defineProps<{
  status: FinancialStatus
  provinceName: string
}>()

const { getStatusConfig } = useStatusConfig()

const config = computed(() => getStatusConfig(props.status))
</script>

<template>
  <BaseCard
    :class="config.bg"
    class="!shadow-none"
  >
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Status Keuangan
        </p>
        <p class="text-2xl md:text-3xl font-bold" :class="config.text">
          {{ config.label }}
        </p>
      </div>
      <div 
        class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border" 
        :class="config.border"
      >
        <AlertCircle class="w-4 h-4" :class="config.text" />
        <span class="text-sm font-medium" :class="config.text">
          di {{ provinceName }}
        </span>
      </div>
    </div>
  </BaseCard>
</template>



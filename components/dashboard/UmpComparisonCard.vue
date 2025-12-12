<script setup lang="ts">
const props = defineProps<{
  umpComparison: number
  provinceName: string
}>()

const progressWidth = computed(() => {
  // Scale to 200% max, displayed as 100% width
  return `${Math.min(props.umpComparison, 200) / 2}%`
})

const progressColor = computed(() => 
  props.umpComparison >= 100 ? 'bg-surplus' : 'bg-primary-400'
)
</script>

<template>
  <BaseCard>
    <h3 class="text-sm font-semibold text-gray-700 mb-3">
      Perbandingan dengan UMR {{ provinceName }}
    </h3>
    
    <!-- Progress bar -->
    <div class="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
      <div
        class="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
        :class="progressColor"
        :style="{ width: progressWidth }"
      />
      <!-- 100% marker -->
      <div class="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400" />
    </div>
    
    <div class="flex justify-between text-xs text-gray-500">
      <span>0%</span>
      <span class="font-semibold text-gray-700">
        {{ umpComparison.toFixed(0) }}% dari UMR
      </span>
      <span>200%</span>
    </div>
  </BaseCard>
</template>



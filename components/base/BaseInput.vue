<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'number' | 'email'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  prefix?: string
  suffix?: string
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const inputId = computed(() => `input-${Math.random().toString(36).substring(2, 9)}`)
</script>

<template>
  <div class="space-y-1.5">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <!-- Input wrapper -->
    <div class="relative">
      <!-- Prefix -->
      <span
        v-if="prefix"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none"
      >
        {{ prefix }}
      </span>

      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        class="w-full px-4 py-3.5 bg-white border rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
        :class="[
          prefix && 'pl-12',
          suffix && 'pr-16',
          error
            ? 'border-deficit focus:ring-deficit/30'
            : 'border-gray-200 focus:ring-primary-400',
          disabled && 'bg-gray-50 cursor-not-allowed opacity-60'
        ]"
      >

      <!-- Suffix -->
      <span
        v-if="suffix"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none"
      >
        {{ suffix }}
      </span>
    </div>

    <!-- Hint or Error -->
    <p
      v-if="hint && !error"
      class="text-xs text-gray-500"
    >
      {{ hint }}
    </p>
    <p
      v-if="error"
      class="text-xs text-deficit"
    >
      {{ error }}
    </p>
  </div>
</template>

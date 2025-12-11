<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = {
  primary: `
    bg-primary-400 text-gray-900 font-semibold
    hover:bg-primary-500 hover:shadow-ios-lg hover:-translate-y-0.5
    active:translate-y-0 active:shadow-ios
    focus:ring-primary-400
  `,
  secondary: `
    bg-gray-100 text-gray-800 font-semibold
    hover:bg-gray-200 hover:shadow-ios hover:-translate-y-0.5
    active:translate-y-0
    focus:ring-gray-300
  `,
  ghost: `
    bg-transparent text-gray-700 font-medium
    hover:bg-gray-100
    focus:ring-gray-200
  `,
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 shadow-ios focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      block && 'w-full',
      (disabled || loading) && 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-ios'
    ]"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  padding: 'md',
})

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <div
    class="bg-white rounded-3xl shadow-ios transition-all duration-300 ease-out"
    :class="[
      paddingClasses[props.padding],
      props.hoverable && 'hover:shadow-ios-lg hover:-translate-y-1 cursor-pointer'
    ]"
  >
    <slot />
  </div>
</template>

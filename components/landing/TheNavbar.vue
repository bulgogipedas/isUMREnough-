<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const navLinks = [
  { label: 'Fitur', href: '#features' },
  { label: 'Tentang', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

// Close menu on route change
const route = useRoute()
watch(() => route.fullPath, closeMenu)

// Close menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu()
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => window.removeEventListener('keydown', handleEscape))
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center shadow-ios group-hover:shadow-ios-lg transition-all duration-300">
            <span class="text-xl">💰</span>
          </div>
          <span class="text-xl font-bold text-gray-900">
            Fin<span class="text-primary-500">ara</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            {{ link.label }}
          </a>
          <NuxtLink
            to="/calculator"
            class="px-6 py-2.5 bg-primary-400 text-gray-900 font-semibold rounded-full shadow-ios hover:bg-primary-500 hover:shadow-ios-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Mulai Hitung
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6 text-gray-700" />
          <X v-else class="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-ios-lg"
      >
        <div class="px-4 py-4 space-y-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="closeMenu"
            class="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-200"
          >
            {{ link.label }}
          </a>
          <NuxtLink
            to="/calculator"
            class="block w-full px-4 py-3 bg-primary-400 text-gray-900 font-semibold rounded-xl shadow-ios hover:bg-primary-500 transition-all duration-200 mt-2 text-center"
          >
            Mulai Hitung
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>




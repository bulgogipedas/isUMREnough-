<script setup lang="ts">
import { Menu, X, Sun, Moon, Globe } from 'lucide-vue-next'

const { t, locale, setLocale } = useI18n()
const colorMode = useColorMode()

const isMenuOpen = ref(false)
const isLangMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  isLangMenuOpen.value = false
}

const closeMenu = () => {
  isMenuOpen.value = false
  isLangMenuOpen.value = false
}

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value
}

const switchLanguage = (lang: string) => {
  setLocale(lang)
  isLangMenuOpen.value = false
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navLinks = computed(() => [
  { label: t('nav.features'), href: '#features' },
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.faq'), href: '#faq' },
])

// Close menu on route change
const route = useRoute()
watch(() => route.fullPath, closeMenu)

// Close menus on click outside
onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.lang-menu')) {
      isLangMenuOpen.value = false
    }
  }
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu()
  }
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center shadow-ios group-hover:shadow-ios-lg transition-all duration-300">
            <span class="text-xl">💰</span>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">
            Fin<span class="text-primary-500 dark:text-primary-400">ara</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-6">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
          >
            {{ link.label }}
          </a>
          
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            :title="colorMode.value === 'dark' ? t('theme.light') : t('theme.dark')"
          >
            <Transition name="rotate" mode="out-in">
              <Sun v-if="colorMode.value === 'dark'" class="w-5 h-5 text-yellow-500" />
              <Moon v-else class="w-5 h-5 text-slate-600" />
            </Transition>
          </button>

          <!-- Language Switcher -->
          <div class="relative lang-menu">
            <button
              @click.stop="toggleLangMenu"
              class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            >
              <Globe class="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase">{{ locale }}</span>
            </button>
            
            <Transition name="dropdown">
              <div
                v-if="isLangMenuOpen"
                class="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-ios-lg dark:shadow-none dark:border dark:border-slate-700 overflow-hidden min-w-[120px]"
              >
                <button
                  @click="switchLanguage('id')"
                  :class="[
                    'w-full px-4 py-2.5 text-left text-sm font-medium transition-colors',
                    locale === 'id' 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  ]"
                >
                  🇮🇩 Indonesia
                </button>
                <button
                  @click="switchLanguage('en')"
                  :class="[
                    'w-full px-4 py-2.5 text-left text-sm font-medium transition-colors',
                    locale === 'en' 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  ]"
                >
                  🇺🇸 English
                </button>
              </div>
            </Transition>
          </div>

          <NuxtLink
            to="/calculator"
            class="px-6 py-2.5 bg-primary-400 text-gray-900 font-semibold rounded-full shadow-ios hover:bg-primary-500 hover:shadow-ios-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            {{ t('hero.cta') }}
          </NuxtLink>
        </div>

        <!-- Mobile Controls -->
        <div class="flex lg:hidden items-center gap-2">
          <!-- Theme Toggle (Mobile) -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            <Sun v-if="colorMode.value === 'dark'" class="w-5 h-5 text-yellow-500" />
            <Moon v-else class="w-5 h-5 text-gray-600" />
          </button>

          <!-- Language Toggle (Mobile) -->
          <button
            @click="switchLanguage(locale === 'id' ? 'en' : 'id')"
            class="px-2 py-1 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            {{ locale === 'id' ? 'EN' : 'ID' }}
          </button>

          <!-- Menu Button -->
          <button
            @click="toggleMenu"
            class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle menu"
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6 text-gray-700 dark:text-slate-300" />
            <X v-else class="w-6 h-6 text-gray-700 dark:text-slate-300" />
          </button>
        </div>
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
        class="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-ios-lg"
      >
        <div class="px-4 py-4 space-y-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="closeMenu"
            class="block px-4 py-3 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors duration-200"
          >
            {{ link.label }}
          </a>
          <NuxtLink
            to="/calculator"
            class="block w-full px-4 py-3 bg-primary-400 text-gray-900 font-semibold rounded-xl shadow-ios hover:bg-primary-500 transition-all duration-200 mt-2 text-center"
          >
            {{ t('hero.cta') }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.3s ease;
}
.rotate-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}
.rotate-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

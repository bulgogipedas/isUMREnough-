<script setup lang="ts">
/**
 * Calculator Page - Premium "Glass Cockpit" Design
 * With Dark Mode & i18n Support
 */
import { ArrowLeft, Sun, Moon } from 'lucide-vue-next'
import { useCalculatorStore } from '~/stores/calculator'

const { t, locale, setLocale } = useI18n()
const colorMode = useColorMode()
const store = useCalculatorStore()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => colorMode.value === 'dark')

const toggleLanguage = () => {
  setLocale(locale.value === 'id' ? 'en' : 'id')
}

onMounted(async () => {
  if (!store.isDataLoaded) {
    try {
      store.setLoading(true)
      await store.loadExpenditureData()
    } catch {
      store.setError('Gagal memuat data pengeluaran')
    } finally {
      store.setLoading(false)
    }
  }
})

useHead({
  title: 'Kalkulator - Finara',
  meta: [
    { name: 'description', content: 'Hitung beban hidup dan kesehatan finansial berdasarkan data BPS Indonesia.' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-500">
    <!-- Subtle gradient overlay -->
    <div class="fixed inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 pointer-events-none transition-colors duration-500" />

    <!-- Minimal Header -->
    <header class="relative z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-3 sticky top-0 transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <ArrowLeft class="w-5 h-5 text-slate-400" />
          </NuxtLink>
          
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/50 dark:shadow-amber-900/20">
              <span class="text-lg">💰</span>
            </div>
            <div class="hidden sm:block">
              <h1 class="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-tight">
                Fin<span class="text-amber-500 dark:text-amber-400">ara</span>
              </h1>
              <p class="text-[10px] text-slate-400 tracking-wide">{{ t('app.tagline').toUpperCase() }}</p>
            </div>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2">
          <!-- Theme Toggle - Pill Style -->
          <button
            @click="toggleTheme"
            class="relative flex items-center w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-full p-0.5 transition-colors duration-300 border border-slate-300 dark:border-slate-600"
            :title="isDark ? t('theme.light') : t('theme.dark')"
          >
            <div 
              class="absolute w-7 h-7 bg-white dark:bg-slate-500 rounded-full shadow-md transition-all duration-300 ease-out"
              :class="isDark ? 'translate-x-8' : 'translate-x-0'"
            />
            <div class="relative z-10 flex items-center justify-between w-full px-1">
              <Sun 
                class="w-4 h-4 transition-colors duration-300"
                :class="isDark ? 'text-slate-500' : 'text-amber-500'"
              />
              <Moon 
                class="w-4 h-4 transition-colors duration-300"
                :class="isDark ? 'text-amber-300' : 'text-slate-400'"
              />
            </div>
          </button>

          <!-- Language Toggle -->
          <button
            @click="toggleLanguage"
            class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-300"
          >
            <span class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">{{ locale }}</span>
          </button>

          <!-- Live Data Badge -->
          <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 rounded-full">
            <span class="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
            <span class="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide">LIVE DATA 2024</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div
        v-if="store.isLoading"
        class="fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
      >
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p class="text-slate-600 dark:text-slate-300 font-medium">{{ t('map.loading') }}</p>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="relative z-10 py-6 lg:py-10">
      <div class="max-w-7xl mx-auto px-4 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          <!-- LEFT: Map Widget -->
          <div class="order-2 lg:order-1 lg:col-span-5">
            <div class="lg:sticky lg:top-[100px]">
              <div class="aspect-[4/3] lg:aspect-auto lg:h-[500px] xl:h-[560px]">
                <ClientOnly>
                  <MapWidget class="w-full h-full" />
                  <template #fallback>
                    <div class="w-full h-full rounded-[2rem] bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-2xl dark:shadow-none flex items-center justify-center">
                      <div class="text-center">
                        <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p class="text-slate-400 text-sm">{{ t('map.loading') }}</p>
                      </div>
                    </div>
                  </template>
                </ClientOnly>
              </div>
              
              <p class="text-center text-slate-400 text-xs mt-4 tracking-wide">
                {{ t('map.title').toUpperCase() }}
              </p>
            </div>
          </div>

          <!-- RIGHT: Dashboard -->
          <div class="order-1 lg:order-2 lg:col-span-7">
            <div class="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 lg:p-8 transition-colors duration-300">
              <DashboardWidget :province-list="store.provinceList" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-6 text-center">
      <p class="text-slate-400 text-xs tracking-wide">
        {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
      </p>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

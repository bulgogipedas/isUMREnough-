<script setup lang="ts">
/**
 * Calculator Page - Full Version
 * 
 * OPTIMIZATIONS:
 * - Data cached in Pinia (loaded once per session)
 * - Map lazy-loaded via ClientOnly
 * - Proper loading states
 */
import { ArrowLeft } from 'lucide-vue-next'
import { useCalculatorStore } from '~/stores/calculator'

const store = useCalculatorStore()

// Load data on mount (uses cache if available)
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

// SEO Configuration
useHead({
  title: 'Kalkulator - Finara',
  meta: [
    {
      name: 'description',
      content: 'Hitung beban hidup dan kesehatan finansial berdasarkan data BPS Indonesia.',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-lg border-b border-gray-100 px-4 py-3 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            aria-label="Kembali ke beranda"
          >
            <ArrowLeft class="w-5 h-5 text-gray-600" />
          </NuxtLink>
          
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center shadow-ios group-hover:shadow-ios-lg transition-all duration-300">
              <span class="text-xl">💰</span>
            </div>
            <div class="hidden sm:block">
              <h1 class="font-bold text-gray-900">
                Fin<span class="text-primary-500">ara</span>
              </h1>
              <p class="text-xs text-gray-500">Kalkulator Beban Hidup</p>
            </div>
          </NuxtLink>
        </div>

        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-100 rounded-full">
          <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
          <span class="text-xs font-medium text-primary-700">Data BPS 2024</span>
        </div>
      </div>
    </header>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div
        v-if="store.isLoading"
        class="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center"
      >
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p class="text-gray-600 font-medium">Memuat data BPS...</p>
        </div>
      </div>
    </Transition>

    <!-- Main Layout -->
    <div class="flex flex-col lg:flex-row lg:h-[calc(100vh-65px)]">
      <!-- Left: Map Section -->
      <div class="order-2 lg:order-1 lg:flex-1 p-4 lg:p-6">
        <div class="h-[400px] lg:h-full">
          <ClientOnly>
            <MapWidget />
            <template #fallback>
              <div class="h-full w-full rounded-3xl bg-gray-100 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p class="text-gray-500">Memuat peta...</p>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Right: Dashboard Section -->
      <div class="order-1 lg:order-2 w-full lg:w-[420px] xl:w-[480px] bg-white lg:border-l border-gray-100 overflow-y-auto">
        <div class="p-4 lg:p-6 pb-8">
          <DashboardWidget :province-list="store.provinceList" />
        </div>
      </div>
    </div>

    <!-- Footer (Mobile Only) -->
    <footer class="lg:hidden bg-white border-t border-gray-100 px-4 py-4 text-center">
      <p class="text-xs text-gray-400">
        Data berdasarkan BPS Indonesia 2024
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

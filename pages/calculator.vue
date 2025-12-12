<script setup lang="ts">
/**
 * Calculator Page - Premium "Glass Cockpit" Design
 * 
 * Layout: Centered content with floating map widget
 * Style: iOS-inspired with glassmorphism
 */
import { ArrowLeft } from 'lucide-vue-next'
import { useCalculatorStore } from '~/stores/calculator'

const store = useCalculatorStore()

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
  <div class="min-h-screen bg-slate-100">
    <!-- Subtle gradient overlay -->
    <div class="fixed inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50/30 pointer-events-none" />

    <!-- Minimal Header -->
    <header class="relative z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 py-3 sticky top-0">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-all duration-300"
          >
            <ArrowLeft class="w-5 h-5 text-slate-400" />
          </NuxtLink>
          
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/50">
              <span class="text-lg">💰</span>
            </div>
            <div class="hidden sm:block">
              <h1 class="font-bold text-slate-800 text-sm tracking-tight">
                Fin<span class="text-amber-500">ara</span>
              </h1>
              <p class="text-[10px] text-slate-400 tracking-wide">KALKULATOR FINANSIAL</p>
            </div>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span class="text-[10px] font-semibold text-emerald-700 tracking-wide">LIVE DATA 2024</span>
        </div>
      </div>
    </header>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div
        v-if="store.isLoading"
        class="fixed inset-0 bg-white/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
      >
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p class="text-slate-600 font-medium">Memuat data...</p>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main class="relative z-10 py-6 lg:py-10">
      <div class="max-w-7xl mx-auto px-4 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          <!-- LEFT: Map Widget (5 cols) - Floating Card Style -->
          <div class="order-2 lg:order-1 lg:col-span-5">
            <div class="lg:sticky lg:top-[100px]">
              <!-- Map with constrained height -->
              <div class="aspect-[4/3] lg:aspect-auto lg:h-[500px] xl:h-[560px]">
                <ClientOnly>
                  <MapWidget class="w-full h-full" />
                  <template #fallback>
                    <div class="w-full h-full rounded-[2rem] bg-slate-200 border-4 border-white shadow-2xl flex items-center justify-center">
                      <div class="text-center">
                        <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p class="text-slate-400 text-sm">Memuat peta...</p>
                      </div>
                    </div>
                  </template>
                </ClientOnly>
              </div>
              
              <!-- Map caption -->
              <p class="text-center text-slate-400 text-xs mt-4 tracking-wide">
                PETA INTERAKTIF INDONESIA
              </p>
            </div>
          </div>

          <!-- RIGHT: Dashboard (7 cols) - Glassmorphism Card -->
          <div class="order-1 lg:order-2 lg:col-span-7">
            <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white/50 p-6 lg:p-8">
              <DashboardWidget :province-list="store.provinceList" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-6 text-center">
      <p class="text-slate-400 text-xs tracking-wide">
        DATA BERBASIS BPS INDONESIA 2024
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

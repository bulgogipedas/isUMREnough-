<script setup lang="ts">
import { Database, Shield, Zap, ArrowLeftRight } from 'lucide-vue-next'

const { t } = useI18n()
</script>

<template>
  <section id="features" class="py-16 lg:py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-primary-700 dark:text-primary-400 text-sm font-semibold rounded-full mb-4 border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-none">
          <span class="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          {{ t('features.badge') }}
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
          {{ t('features.title') }} <span class="text-primary-500 dark:text-primary-400">Finara</span>?
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
          {{ t('features.subtitle') }}
        </p>
      </div>

      <!-- BENTO GRID LAYOUT -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        
        <!-- Box 1: Data Resmi BPS (Large) -->
        <div class="group lg:col-span-2 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-slate-700 shadow-bento dark:shadow-none hover:shadow-bento-hover dark:hover:border-slate-600 transition-all duration-500 overflow-hidden relative">
          <div class="absolute -bottom-8 -right-8 opacity-10 dark:opacity-20 pointer-events-none">
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" class="text-blue-600 dark:text-blue-400">
              <rect x="10" y="80" width="24" height="70" rx="4" fill="currentColor" />
              <rect x="44" y="50" width="24" height="100" rx="4" fill="currentColor" />
              <rect x="78" y="30" width="24" height="120" rx="4" fill="currentColor" />
              <rect x="112" y="60" width="24" height="90" rx="4" fill="currentColor" />
              <rect x="146" y="20" width="24" height="130" rx="4" fill="currentColor" />
            </svg>
          </div>
          
          <div class="relative z-10">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/60 dark:to-blue-800/60 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none border border-transparent dark:border-blue-800/50">
              <Database class="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-3">
              {{ t('features.bps.title') }}
            </h3>
            <p class="text-gray-600 dark:text-slate-300 leading-relaxed text-lg max-w-md">
              {{ t('features.bps.description') }}
            </p>
            
            <div class="flex gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
              <div>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">38</p>
                <p class="text-sm text-gray-500 dark:text-slate-400">{{ t('features.bps.provinces') }}</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">2024</p>
                <p class="text-sm text-gray-500 dark:text-slate-400">{{ t('features.bps.latestData') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Box 2: Privasi Aman (Square) -->
        <div class="group bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-slate-700 shadow-bento dark:shadow-none hover:shadow-bento-hover dark:hover:border-slate-600 transition-all duration-500 flex flex-col justify-between min-h-[280px]">
          <div class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/60 dark:to-green-800/60 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none border border-transparent dark:border-green-800/50">
            <Shield class="w-7 h-7 text-green-600 dark:text-green-400" />
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">
              {{ t('features.privacy.title') }}
            </h3>
            <p class="text-gray-600 dark:text-slate-300 leading-relaxed">
              {{ t('features.privacy.description') }}
            </p>
          </div>
          
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/40 rounded-full w-fit border border-green-100 dark:border-green-800/50">
            <span class="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
            <span class="text-xs font-medium text-green-700 dark:text-green-300">{{ t('features.privacy.badge') }}</span>
          </div>
        </div>

        <!-- Box 3: Real-time (Square) -->
        <div class="group bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-slate-700 shadow-bento dark:shadow-none hover:shadow-bento-hover dark:hover:border-slate-600 transition-all duration-500 flex flex-col justify-between min-h-[280px]">
          <div class="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/60 dark:to-yellow-800/60 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none border border-transparent dark:border-yellow-800/50">
            <Zap class="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">
              {{ t('features.realtime.title') }}
            </h3>
            <p class="text-gray-600 dark:text-slate-300 leading-relaxed">
              {{ t('features.realtime.description') }}
            </p>
          </div>
          
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              <div class="w-8 h-2 bg-primary-400 rounded-full" />
              <div class="w-6 h-2 bg-primary-300 dark:bg-primary-500 rounded-full" />
              <div class="w-4 h-2 bg-primary-200 dark:bg-primary-600 rounded-full" />
            </div>
            <span class="text-xs font-medium text-gray-500 dark:text-slate-400">{{ t('features.realtime.badge') }}</span>
          </div>
        </div>

        <!-- Box 4: Komparasi Kota (Wide) -->
        <div class="group lg:col-span-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-slate-700 shadow-bento dark:shadow-none hover:shadow-bento-hover dark:hover:border-slate-600 transition-all duration-500">
          <div class="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            <div class="flex-1">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/60 dark:to-purple-800/60 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none border border-transparent dark:border-purple-800/50">
                <ArrowLeftRight class="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              
              <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-3">
                {{ t('features.compare.title') }}
              </h3>
              <p class="text-gray-600 dark:text-slate-300 leading-relaxed text-lg max-w-lg">
                {{ t('features.compare.description') }}
              </p>
            </div>
            
            <div class="flex-shrink-0 lg:w-[400px]">
              <div class="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
                <div class="flex items-center justify-between gap-4">
                  <div class="flex-1 bg-white dark:bg-slate-900/80 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm dark:shadow-none">
                    <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">{{ t('features.compare.cityA') }}</p>
                    <p class="font-semibold text-gray-800 dark:text-slate-100 text-sm">DKI Jakarta</p>
                    <p class="text-xs text-red-500 dark:text-red-400 mt-1">Rp 2.8jt{{ t('features.compare.perMonth') }}</p>
                  </div>
                  
                  <div class="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/60 rounded-full flex items-center justify-center border border-transparent dark:border-purple-800/50">
                    <span class="text-xs font-bold text-purple-600 dark:text-purple-400">VS</span>
                  </div>
                  
                  <div class="flex-1 bg-white dark:bg-slate-900/80 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm dark:shadow-none">
                    <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">{{ t('features.compare.cityB') }}</p>
                    <p class="font-semibold text-gray-800 dark:text-slate-100 text-sm">DI Yogyakarta</p>
                    <p class="text-xs text-green-500 dark:text-green-400 mt-1">Rp 1.7jt{{ t('features.compare.perMonth') }}</p>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style="width: 62%" />
                    </div>
                    <span class="text-xs font-medium text-purple-600 dark:text-purple-400">38% {{ t('features.compare.cheaper') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

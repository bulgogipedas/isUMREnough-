<script setup lang="ts">
/**
 * Features Section - Bento Grid Design (Apple Style)
 * 
 * A premium Bento Box layout showcasing key features with
 * varying card sizes, illustrations, and glassmorphism effects.
 */
import { Database, Shield, Zap, ArrowLeftRight } from 'lucide-vue-next'
</script>

<template>
  <section id="features" class="py-16 lg:py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm text-primary-700 text-sm font-semibold rounded-full mb-4 border border-white/50 shadow-sm">
          <span class="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          Fitur Unggulan
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Kenapa Pakai <span class="text-primary-500">Finara</span>?
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Dirancang untuk memberikan insight finansial yang akurat dan mudah dipahami.
        </p>
      </div>

      <!-- ================================== -->
      <!-- BENTO GRID LAYOUT                  -->
      <!-- ================================== -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        
        <!-- ============================== -->
        <!-- Box 1: Data Resmi BPS (Large)  -->
        <!-- Spans 2 columns on lg          -->
        <!-- ============================== -->
        <div class="group lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-bento hover:shadow-bento-hover transition-all duration-500 overflow-hidden relative">
          <!-- Abstract chart illustration (background) -->
          <div class="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" class="text-blue-600">
              <rect x="10" y="80" width="24" height="70" rx="4" fill="currentColor" />
              <rect x="44" y="50" width="24" height="100" rx="4" fill="currentColor" />
              <rect x="78" y="30" width="24" height="120" rx="4" fill="currentColor" />
              <rect x="112" y="60" width="24" height="90" rx="4" fill="currentColor" />
              <rect x="146" y="20" width="24" height="130" rx="4" fill="currentColor" />
            </svg>
          </div>
          
          <div class="relative z-10">
            <!-- Icon -->
            <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Database class="w-7 h-7 text-blue-600" />
            </div>
            
            <!-- Content -->
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Data Resmi BPS
            </h3>
            <p class="text-gray-600 leading-relaxed text-lg max-w-md">
              Menggunakan data pengeluaran per kapita <span class="font-semibold text-gray-800">BPS 2024</span> dan UMR resmi seluruh provinsi Indonesia.
            </p>
            
            <!-- Mini stats -->
            <div class="flex gap-6 mt-6 pt-6 border-t border-gray-100">
              <div>
                <p class="text-2xl font-bold text-blue-600">38</p>
                <p class="text-sm text-gray-500">Provinsi</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-blue-600">2024</p>
                <p class="text-sm text-gray-500">Data Terbaru</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================== -->
        <!-- Box 2: Privasi Aman (Square)   -->
        <!-- ============================== -->
        <div class="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-bento hover:shadow-bento-hover transition-all duration-500 flex flex-col justify-between min-h-[280px]">
          <!-- Icon -->
          <div class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Shield class="w-7 h-7 text-green-600" />
          </div>
          
          <!-- Content -->
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Privasi Aman
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Data tidak disimpan di server. Semua kalkulasi dilakukan langsung di <span class="font-semibold text-gray-800">browser kamu</span>.
            </p>
          </div>
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full w-fit">
            <span class="w-2 h-2 bg-green-500 rounded-full" />
            <span class="text-xs font-medium text-green-700">100% Client-side</span>
          </div>
        </div>

        <!-- ============================== -->
        <!-- Box 3: Real-time (Square)      -->
        <!-- ============================== -->
        <div class="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-bento hover:shadow-bento-hover transition-all duration-500 flex flex-col justify-between min-h-[280px]">
          <!-- Icon -->
          <div class="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Zap class="w-7 h-7 text-yellow-600" />
          </div>
          
          <!-- Content -->
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Real-time
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Hasil perhitungan instan. Ubah input, langsung lihat hasilnya tanpa delay.
            </p>
          </div>
          
          <!-- Visual indicator -->
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              <div class="w-8 h-2 bg-primary-400 rounded-full" />
              <div class="w-6 h-2 bg-primary-300 rounded-full" />
              <div class="w-4 h-2 bg-primary-200 rounded-full" />
            </div>
            <span class="text-xs font-medium text-gray-500">0ms delay</span>
          </div>
        </div>

        <!-- ============================== -->
        <!-- Box 4: Komparasi Kota (Wide)   -->
        <!-- Spans full width on lg         -->
        <!-- ============================== -->
        <div class="group lg:col-span-4 bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-bento hover:shadow-bento-hover transition-all duration-500">
          <div class="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            <!-- Content -->
            <div class="flex-1">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <ArrowLeftRight class="w-7 h-7 text-purple-600" />
              </div>
              
              <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Komparasi Antar Kota
              </h3>
              <p class="text-gray-600 leading-relaxed text-lg max-w-lg">
                Bandingkan biaya hidup antar provinsi untuk membantu keputusan pindah kerja atau kuliah.
              </p>
            </div>
            
            <!-- Mini UI Mockup -->
            <div class="flex-shrink-0 lg:w-[400px]">
              <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div class="flex items-center justify-between gap-4">
                  <!-- City 1 -->
                  <div class="flex-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                    <p class="text-xs text-gray-500 mb-1">Kota A</p>
                    <p class="font-semibold text-gray-800 text-sm">DKI Jakarta</p>
                    <p class="text-xs text-red-500 mt-1">Rp 2.8jt/bulan</p>
                  </div>
                  
                  <!-- VS indicator -->
                  <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span class="text-xs font-bold text-purple-600">VS</span>
                  </div>
                  
                  <!-- City 2 -->
                  <div class="flex-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                    <p class="text-xs text-gray-500 mb-1">Kota B</p>
                    <p class="font-semibold text-gray-800 text-sm">DI Yogyakarta</p>
                    <p class="text-xs text-green-500 mt-1">Rp 1.7jt/bulan</p>
                  </div>
                </div>
                
                <!-- Comparison bar -->
                <div class="mt-4 pt-3 border-t border-gray-100">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style="width: 62%" />
                    </div>
                    <span class="text-xs font-medium text-purple-600">38% lebih hemat</span>
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




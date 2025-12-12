<script setup lang="ts">
import { Github } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-900 text-white py-12 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
        <!-- Logo & Description -->
        <div class="text-center lg:text-left">
          <div class="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <div class="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center">
              <span class="text-xl">💰</span>
            </div>
            <span class="text-xl font-bold">
              Fin<span class="text-primary-400">ara</span>
            </span>
          </div>
          <p class="text-gray-400 max-w-md">
            Kalkulator beban hidup untuk membantu masyarakat Indonesia memahami kesehatan finansial mereka.
          </p>
        </div>

        <!-- Links -->
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <a
            href="https://github.com/bulgogipedas/isUMREnough-"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors duration-200"
          >
            <Github class="w-5 h-5" />
            <span class="font-medium">View on GitHub</span>
          </a>
          <a
            href="https://www.bps.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-white transition-colors duration-200"
          >
            Data Source: BPS
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <p class="text-gray-500 text-sm text-center">
          © {{ currentYear }} Finara. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>




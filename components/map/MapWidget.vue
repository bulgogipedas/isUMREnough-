<script setup lang="ts">
/**
 * Interactive Map Widget - Premium "Data Art" Style
 * With Dark Mode Support
 */
import { shallowRef, computed } from 'vue'
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'
import type { StyleFunction, Layer, LeafletMouseEvent, Map as LeafletMap, GeoJSON as LeafletGeoJSON } from 'leaflet'
import { useCalculatorStore } from '~/stores/calculator'
import { getUmpByProvinceName } from '~/utils/constants'
import type { ProvinceGeoJsonFeature, ProvinceGeoJsonProperties, IndonesiaGeoJson } from '~/types'

const { t } = useI18n()
const colorMode = useColorMode()
const store = useCalculatorStore()

// Map configuration
const MAP_CENTER: [number, number] = [-2.5, 118]
const MAP_ZOOM = 5

// Dynamic tile URLs based on theme
const TILE_URLS = {
  light: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
} as const

const currentTileUrl = computed(() => 
  colorMode.value === 'dark' ? TILE_URLS.dark : TILE_URLS.light
)

// Local state
const isLoading = ref(true)
const error = ref<string | null>(null)
const geoJsonData = shallowRef<IndonesiaGeoJson | null>(null)
const mapRef = ref<{ leafletObject: LeafletMap } | null>(null)
const geoJsonLayerRef = shallowRef<LeafletGeoJSON | null>(null)
const hoveredProvinceId = ref<string | null>(null)
const hoveredProvinceName = ref<string>('')

// Dynamic colors based on theme
const getColors = () => {
  const isDark = colorMode.value === 'dark'
  return {
    defaultFill: isDark ? '#1e293b' : '#f1f5f9',      // slate-800 / slate-100
    defaultStroke: isDark ? '#475569' : '#cbd5e1',    // slate-600 / slate-300
    hoverFill: isDark ? '#78350f' : '#fef3c7',        // amber-900 / amber-100
    hoverStroke: '#fbbf24',                            // amber-400
    selectedFill: '#fbbf24',                           // amber-400
    selectedStroke: '#f59e0b',                         // amber-500
  }
}

let currentSelectedId: string | null = null

// Load GeoJSON
onMounted(async () => {
  try {
    isLoading.value = true
    const data = await store.loadGeoJson()
    geoJsonData.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('map.error')
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  if (mapRef.value?.leafletObject) {
    mapRef.value.leafletObject.remove()
  }
  geoJsonLayerRef.value = null
})

// Update styles when selection OR theme changes
const updateMapStyles = () => {
  const colors = getColors()
  if (geoJsonLayerRef.value) {
    geoJsonLayerRef.value.setStyle((feature) => {
      if (!feature) return {}
      const props = feature.properties as ProvinceGeoJsonProperties
      const provinceId = props.normalizedId as string
      const isSelected = provinceId === currentSelectedId
      
      return {
        fillColor: isSelected ? colors.selectedFill : colors.defaultFill,
        fillOpacity: isSelected ? 0.85 : 0.6,
        color: isSelected ? colors.selectedStroke : colors.defaultStroke,
        weight: isSelected ? 2 : 0.5,
        opacity: 1,
      }
    })
  }
}

watch(() => store.selectedProvinceId, (newId) => {
  currentSelectedId = newId
  updateMapStyles()
})

watch(() => colorMode.value, () => {
  updateMapStyles()
})

// Initial style function
const geoJsonStyle: StyleFunction = (feature) => {
  if (!feature) return {}
  const colors = getColors()
  const props = feature.properties as ProvinceGeoJsonProperties
  const provinceId = props.normalizedId as string
  const isSelected = provinceId === currentSelectedId

  return {
    fillColor: isSelected ? colors.selectedFill : colors.defaultFill,
    fillOpacity: isSelected ? 0.85 : 0.6,
    color: isSelected ? colors.selectedStroke : colors.defaultStroke,
    weight: isSelected ? 2 : 0.5,
    opacity: 1,
  }
}

const onGeoJsonReady = (layer: LeafletGeoJSON) => {
  geoJsonLayerRef.value = layer
}

const geoJsonOptions = {
  style: geoJsonStyle,
  onEachFeature: (feature: ProvinceGeoJsonFeature, layer: Layer) => {
    const name = store.getProvinceName(feature.properties)
    const id = feature.properties.normalizedId as string
    layer.on({
      click: () => handleProvinceClick(id, name),
      mouseover: (e: LeafletMouseEvent) => handleMouseOver(e, id, name),
      mouseout: (e: LeafletMouseEvent) => handleMouseOut(e),
    })
  },
}

const handleProvinceClick = (id: string, name: string) => {
  const umpData = getUmpByProvinceName(name)
  store.selectProvince(umpData?.id || id, umpData?.name || name)
}

const handleMouseOver = (e: LeafletMouseEvent, id: string, name: string) => {
  hoveredProvinceId.value = id
  hoveredProvinceName.value = name
  const layer = e.target
  const umpData = getUmpByProvinceName(name)
  const actualId = umpData?.id || id
  const isSelected = actualId === store.selectedProvinceId
  const colors = getColors()

  layer.setStyle({
    fillColor: isSelected ? colors.selectedFill : colors.hoverFill,
    fillOpacity: 0.8,
    color: isSelected ? colors.selectedStroke : colors.hoverStroke,
    weight: 1.5,
  })
}

const handleMouseOut = (e: LeafletMouseEvent) => {
  hoveredProvinceId.value = null
  hoveredProvinceName.value = ''
  const layer = e.target
  const feature = layer.feature as ProvinceGeoJsonFeature
  const name = store.getProvinceName(feature.properties)
  const umpData = getUmpByProvinceName(name)
  const actualId = umpData?.id || (feature.properties.normalizedId as string)
  const isSelected = actualId === store.selectedProvinceId
  const colors = getColors()

  layer.setStyle({
    fillColor: isSelected ? colors.selectedFill : colors.defaultFill,
    fillOpacity: isSelected ? 0.85 : 0.6,
    color: isSelected ? colors.selectedStroke : colors.defaultStroke,
    weight: isSelected ? 2 : 0.5,
  })
}
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Container with dark mode support -->
    <div class="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl dark:shadow-none bg-slate-100 dark:bg-slate-800 transition-colors duration-500">
      
      <!-- Loading overlay -->
      <Transition name="fade">
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-[1000] flex items-center justify-center"
        >
          <div class="flex flex-col items-center gap-3">
            <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p class="text-slate-500 dark:text-slate-400 font-medium text-sm">{{ t('map.loading') }}</p>
          </div>
        </div>
      </Transition>

      <!-- Error state -->
      <div
        v-if="error && !isLoading"
        class="absolute inset-0 bg-white dark:bg-slate-900 z-[1000] flex items-center justify-center p-6"
      >
        <div class="text-center">
          <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
            <span class="text-2xl">⚠️</span>
          </div>
          <p class="text-slate-700 dark:text-slate-200 font-semibold text-sm mb-1">{{ t('map.error') }}</p>
          <p class="text-slate-400 text-xs">{{ error }}</p>
        </div>
      </div>

      <!-- Hover tooltip -->
      <Transition name="fade">
        <div
          v-if="hoveredProvinceName && !isLoading"
          class="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/90 dark:bg-slate-100/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
        >
          <p class="text-white dark:text-slate-900 font-medium text-sm">{{ hoveredProvinceName }}</p>
        </div>
      </Transition>

      <!-- Selected province badge -->
      <Transition name="slide-up">
        <div
          v-if="store.selectedProvinceName && !isLoading"
          class="absolute bottom-4 left-4 z-[1000] bg-amber-400 px-4 py-2.5 rounded-2xl shadow-lg"
        >
          <p class="text-amber-900 font-bold text-sm flex items-center gap-2">
            <span class="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
            {{ store.selectedProvinceName }}
          </p>
        </div>
      </Transition>

      <!-- Instruction hint -->
      <div
        v-if="!store.selectedProvinceName && !isLoading && !error"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700"
      >
        <p class="text-slate-500 dark:text-slate-400 text-xs font-medium">{{ t('map.clickProvince') }}</p>
      </div>

      <!-- The Map -->
      <LMap
        v-if="!error"
        ref="mapRef"
        :zoom="MAP_ZOOM"
        :center="MAP_CENTER"
        :use-global-leaflet="false"
        :options="{
          zoomControl: false,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          touchZoom: true,
          attributionControl: false,
        }"
        class="w-full h-full z-0"
      >
        <LTileLayer
          :key="currentTileUrl"
          :url="currentTileUrl"
          :options="{ maxZoom: 10, minZoom: 4 }"
        />

        <LGeoJson
          v-if="geoJsonData"
          :geojson="geoJsonData"
          :options="geoJsonOptions"
          @ready="onGeoJsonReady"
        />
      </LMap>

      <!-- Custom Zoom -->
      <div class="absolute bottom-4 right-4 z-[1000] flex flex-col gap-1.5">
        <button
          class="w-10 h-10 bg-white dark:bg-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 active:scale-95"
          @click="mapRef?.leafletObject?.zoomIn()"
        >
          <span class="text-xl font-light">+</span>
        </button>
        <button
          class="w-10 h-10 bg-white dark:bg-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl shadow-lg dark:shadow-none border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 active:scale-95"
          @click="mapRef?.leafletObject?.zoomOut()"
        >
          <span class="text-xl font-light">−</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

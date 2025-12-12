<script setup lang="ts">
/**
 * Interactive Map Widget - Premium "Data Art" Style
 * 
 * Visual Design:
 * - Subtle, thin borders (no ugly blue)
 * - Soft fills that look like background texture
 * - Smooth transitions
 */
import { shallowRef } from 'vue'
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'
import type { StyleFunction, Layer, LeafletMouseEvent, Map as LeafletMap, GeoJSON as LeafletGeoJSON } from 'leaflet'
import { useCalculatorStore } from '~/stores/calculator'
import { getUmpByProvinceName } from '~/utils/constants'
import type { ProvinceGeoJsonFeature, ProvinceGeoJsonProperties, IndonesiaGeoJson } from '~/types'

const store = useCalculatorStore()

// Map configuration
const MAP_CENTER: [number, number] = [-2.5, 118]
const MAP_ZOOM = 5
// CartoDB Positron NO LABELS - ultra clean
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION = ''

// Local state
const isLoading = ref(true)
const error = ref<string | null>(null)
const geoJsonData = shallowRef<IndonesiaGeoJson | null>(null)
const mapRef = ref<{ leafletObject: LeafletMap } | null>(null)
const geoJsonLayerRef = shallowRef<LeafletGeoJSON | null>(null)
const hoveredProvinceId = ref<string | null>(null)
const hoveredProvinceName = ref<string>('')

// Premium Style Colors - Subtle & Elegant
const COLORS = {
  // Default: Very subtle, almost invisible
  defaultFill: '#f1f5f9',     // Slate-100
  defaultStroke: '#cbd5e1',    // Slate-300 - thin subtle border
  // Hover: Soft warm yellow
  hoverFill: '#fef3c7',        // Amber-100
  hoverStroke: '#fbbf24',      // Amber-400
  // Selected: Brand yellow, prominent
  selectedFill: '#fbbf24',     // Amber-400 (warm yellow, not mustard)
  selectedStroke: '#f59e0b',   // Amber-500
} as const

let currentSelectedId: string | null = null

// Load GeoJSON
onMounted(async () => {
  try {
    isLoading.value = true
    const data = await store.loadGeoJson()
    geoJsonData.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Gagal memuat peta'
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

// Update styles when selection changes
watch(() => store.selectedProvinceId, (newId) => {
  currentSelectedId = newId
  if (geoJsonLayerRef.value) {
    geoJsonLayerRef.value.setStyle((feature) => {
      if (!feature) return {}
      const props = feature.properties as ProvinceGeoJsonProperties
      const provinceId = props.normalizedId as string
      const isSelected = provinceId === newId
      
      return {
        fillColor: isSelected ? COLORS.selectedFill : COLORS.defaultFill,
        fillOpacity: isSelected ? 0.85 : 0.6,
        color: isSelected ? COLORS.selectedStroke : COLORS.defaultStroke,
        weight: isSelected ? 2 : 0.5, // Very thin borders by default
        opacity: 1,
      }
    })
  }
})

// Initial style function - subtle & elegant
const geoJsonStyle: StyleFunction = (feature) => {
  if (!feature) return {}
  const props = feature.properties as ProvinceGeoJsonProperties
  const provinceId = props.normalizedId as string
  const isSelected = provinceId === currentSelectedId

  return {
    fillColor: isSelected ? COLORS.selectedFill : COLORS.defaultFill,
    fillOpacity: isSelected ? 0.85 : 0.6,
    color: isSelected ? COLORS.selectedStroke : COLORS.defaultStroke,
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

  layer.setStyle({
    fillColor: isSelected ? COLORS.selectedFill : COLORS.hoverFill,
    fillOpacity: 0.8,
    color: isSelected ? COLORS.selectedStroke : COLORS.hoverStroke,
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

  layer.setStyle({
    fillColor: isSelected ? COLORS.selectedFill : COLORS.defaultFill,
    fillOpacity: isSelected ? 0.85 : 0.6,
    color: isSelected ? COLORS.selectedStroke : COLORS.defaultStroke,
    weight: isSelected ? 2 : 0.5,
  })
}
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Premium Container with heavy curves and deep shadow -->
    <div class="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
      
      <!-- Loading overlay -->
      <Transition name="fade">
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-white/90 backdrop-blur-sm z-[1000] flex items-center justify-center"
        >
          <div class="flex flex-col items-center gap-3">
            <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p class="text-slate-500 font-medium text-sm">Memuat peta...</p>
          </div>
        </div>
      </Transition>

      <!-- Error state -->
      <div
        v-if="error && !isLoading"
        class="absolute inset-0 bg-white z-[1000] flex items-center justify-center p-6"
      >
        <div class="text-center">
          <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-red-50 flex items-center justify-center">
            <span class="text-2xl">⚠️</span>
          </div>
          <p class="text-slate-700 font-semibold text-sm mb-1">Gagal memuat peta</p>
          <p class="text-slate-400 text-xs">{{ error }}</p>
        </div>
      </div>

      <!-- Hover tooltip - Minimal pill -->
      <Transition name="fade">
        <div
          v-if="hoveredProvinceName && !isLoading"
          class="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
        >
          <p class="text-white font-medium text-sm">{{ hoveredProvinceName }}</p>
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
        class="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
      >
        <p class="text-slate-500 text-xs font-medium">Klik provinsi pada peta</p>
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
          :url="TILE_URL"
          :attribution="TILE_ATTRIBUTION"
          :options="{ maxZoom: 10, minZoom: 4 }"
        />

        <LGeoJson
          v-if="geoJsonData"
          :geojson="geoJsonData"
          :options="geoJsonOptions"
          @ready="onGeoJsonReady"
        />
      </LMap>

      <!-- Custom Zoom - Bottom Right, Premium Style -->
      <div class="absolute bottom-4 right-4 z-[1000] flex flex-col gap-1.5">
        <button
          class="w-10 h-10 bg-white hover:bg-amber-50 rounded-xl shadow-lg flex items-center justify-center text-slate-600 hover:text-amber-600 transition-all duration-300 active:scale-95"
          @click="mapRef?.leafletObject?.zoomIn()"
        >
          <span class="text-xl font-light">+</span>
        </button>
        <button
          class="w-10 h-10 bg-white hover:bg-amber-50 rounded-xl shadow-lg flex items-center justify-center text-slate-600 hover:text-amber-600 transition-all duration-300 active:scale-95"
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

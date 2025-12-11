<script setup lang="ts">
/**
 * Interactive Map Widget for Indonesia provinces
 * 
 * CRITICAL PERFORMANCE OPTIMIZATIONS:
 * - GeoJSON stored in shallowRef (prevents deep reactivity on 1000s of coordinates)
 * - Style updates via direct Leaflet API (no Vue re-renders)
 * - Proper cleanup on unmount
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
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION = '&copy; OpenStreetMap &copy; CARTO'

// Local state
const isLoading = ref(true)
const error = ref<string | null>(null)

// CRITICAL: Use shallowRef to prevent Vue from deeply proxying GeoJSON
// This is essential because GeoJSON has thousands of coordinate points
const geoJsonData = shallowRef<IndonesiaGeoJson | null>(null)

// Map references for cleanup and direct manipulation
const mapRef = ref<{ leafletObject: LeafletMap } | null>(null)
const geoJsonLayerRef = shallowRef<LeafletGeoJSON | null>(null)

// Hover state (simple primitives, safe to be reactive)
const hoveredProvinceId = ref<string | null>(null)
const hoveredProvinceName = ref<string>('')

// Style colors
const COLORS = {
  default: '#f3f4f6',
  hover: '#facc15',
  selected: '#eab308',
  border: '#ffffff',
} as const

// Track current selection for style function
let currentSelectedId: string | null = null

// Load GeoJSON from store (non-reactive cache)
onMounted(async () => {
  try {
    isLoading.value = true
    const data = await store.loadGeoJson()
    // Assign to shallowRef - Vue won't proxy the contents
    geoJsonData.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Gagal memuat peta'
  } finally {
    isLoading.value = false
  }
})

// Cleanup on unmount - CRITICAL for memory
onUnmounted(() => {
  if (mapRef.value?.leafletObject) {
    mapRef.value.leafletObject.remove()
  }
  geoJsonLayerRef.value = null
})

// Update styles when selection changes - DIRECT LEAFLET API (no Vue re-render)
watch(() => store.selectedProvinceId, (newId) => {
  currentSelectedId = newId
  
  // Use direct Leaflet API to update styles - much faster than Vue reactivity
  if (geoJsonLayerRef.value) {
    geoJsonLayerRef.value.setStyle((feature) => {
      if (!feature) return {}
      const props = feature.properties as ProvinceGeoJsonProperties
      const provinceId = props.normalizedId as string
      const isSelected = provinceId === newId
      
      return {
        fillColor: isSelected ? COLORS.selected : COLORS.default,
        fillOpacity: isSelected ? 0.8 : 0.5,
        color: COLORS.border,
        weight: isSelected ? 2.5 : 1,
        opacity: 1,
      }
    })
  }
})

/**
 * Style function for initial GeoJSON render
 */
const geoJsonStyle: StyleFunction = (feature) => {
  if (!feature) return {}

  const props = feature.properties as ProvinceGeoJsonProperties
  const provinceId = props.normalizedId as string
  const isSelected = provinceId === currentSelectedId

  return {
    fillColor: isSelected ? COLORS.selected : COLORS.default,
    fillOpacity: isSelected ? 0.8 : 0.5,
    color: COLORS.border,
    weight: isSelected ? 2.5 : 1,
    opacity: 1,
  }
}

/**
 * Called when GeoJSON layer is ready
 */
const onGeoJsonReady = (layer: LeafletGeoJSON) => {
  geoJsonLayerRef.value = layer
}

/**
 * GeoJSON options with event handlers
 */
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

/**
 * Handle province click - just update store, style updates via watcher
 */
const handleProvinceClick = (id: string, name: string) => {
  const umpData = getUmpByProvinceName(name)
  store.selectProvince(umpData?.id || id, umpData?.name || name)
}

/**
 * Handle mouse over - direct style manipulation (not reactive)
 */
const handleMouseOver = (e: LeafletMouseEvent, id: string, name: string) => {
  hoveredProvinceId.value = id
  hoveredProvinceName.value = name

  const layer = e.target
  const umpData = getUmpByProvinceName(name)
  const actualId = umpData?.id || id
  const isSelected = actualId === store.selectedProvinceId

  // Direct Leaflet style update - bypasses Vue
  layer.setStyle({
    fillColor: isSelected ? COLORS.selected : COLORS.hover,
    fillOpacity: 0.7,
    weight: 2,
  })
}

/**
 * Handle mouse out - direct style manipulation (not reactive)
 */
const handleMouseOut = (e: LeafletMouseEvent) => {
  hoveredProvinceId.value = null
  hoveredProvinceName.value = ''

  const layer = e.target
  const feature = layer.feature as ProvinceGeoJsonFeature
  const name = store.getProvinceName(feature.properties)
  const umpData = getUmpByProvinceName(name)
  const actualId = umpData?.id || (feature.properties.normalizedId as string)
  const isSelected = actualId === store.selectedProvinceId

  // Direct Leaflet style update - bypasses Vue
  layer.setStyle({
    fillColor: isSelected ? COLORS.selected : COLORS.default,
    fillOpacity: isSelected ? 0.8 : 0.5,
    weight: isSelected ? 2.5 : 1,
  })
}
</script>

<template>
  <div class="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-ios-lg">
    <!-- Loading overlay -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-white/80 backdrop-blur-sm z-[1000] flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-3">
        <div class="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
        <p class="text-gray-600 font-medium">Memuat peta...</p>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-if="error && !isLoading"
      class="absolute inset-0 bg-white z-[1000] flex items-center justify-center p-6"
    >
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-deficit-light flex items-center justify-center">
          <span class="text-2xl">⚠️</span>
        </div>
        <p class="text-gray-800 font-semibold mb-2">Gagal memuat peta</p>
        <p class="text-gray-500 text-sm">{{ error }}</p>
      </div>
    </div>

    <!-- Province hover tooltip -->
    <div
      v-show="hoveredProvinceName && !isLoading"
      class="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-ios"
    >
      <p class="text-gray-800 font-medium">{{ hoveredProvinceName }}</p>
    </div>

    <!-- Selected province indicator -->
    <div
      v-show="store.selectedProvinceName && !isLoading"
      class="absolute bottom-4 left-4 z-[1000] bg-primary-400 px-4 py-2 rounded-xl shadow-ios"
    >
      <p class="text-gray-900 font-semibold text-sm">
        📍 {{ store.selectedProvinceName }}
      </p>
    </div>

    <!-- Instructions -->
    <div
      v-show="!store.selectedProvinceName && !isLoading && !error"
      class="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-ios"
    >
      <p class="text-gray-600 text-sm">👆 Klik provinsi untuk memilih</p>
    </div>

    <!-- The Map -->
    <LMap
      v-if="!error"
      ref="mapRef"
      :zoom="MAP_ZOOM"
      :center="MAP_CENTER"
      :use-global-leaflet="false"
      :options="{
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
      }"
      class="w-full h-full z-0"
    >
      <LTileLayer
        :url="TILE_URL"
        :attribution="TILE_ATTRIBUTION"
        :options="{ maxZoom: 19 }"
      />

      <!-- No :key - prevents expensive re-renders -->
      <LGeoJson
        v-if="geoJsonData"
        :geojson="geoJsonData"
        :options="geoJsonOptions"
        @ready="onGeoJsonReady"
      />
    </LMap>
  </div>
</template>

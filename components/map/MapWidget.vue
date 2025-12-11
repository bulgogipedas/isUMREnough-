<script setup lang="ts">
/**
 * Interactive Map Widget for Indonesia provinces
 * 
 * Displays an interactive map where users can click on provinces
 * to select them for financial calculations.
 */
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'
import type { StyleFunction, Layer, LeafletMouseEvent } from 'leaflet'
import { useGeoJson, type ProvinceGeoJsonFeature } from '~/composables/useGeoJson'
import { useCalculatorStore } from '~/stores/calculator'
import { getUmpByProvinceName } from '~/utils/constants'
import type { ProvinceOption } from '~/types'

defineProps<{
  provinceList: ProvinceOption[]
}>()

const store = useCalculatorStore()
const { geoJsonData, isLoading, error, fetchGeoJson, getProvinceName, generateProvinceId } = useGeoJson()

// Map configuration
const MAP_CENTER: [number, number] = [-2.5, 118]
const MAP_ZOOM = 5
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION = '&copy; OpenStreetMap contributors &copy; CARTO'

// Map state
const center = ref<[number, number]>(MAP_CENTER)
const zoom = ref(MAP_ZOOM)

// Hover state
const hoveredProvinceId = ref<string | null>(null)
const hoveredProvinceName = ref<string>('')

// GeoJSON layer reference
const geoJsonRef = ref<InstanceType<typeof LGeoJson> | null>(null)

// Fetch GeoJSON on mount
onMounted(async () => {
  await fetchGeoJson()
})

// Update map styling when selection changes
watch(() => store.selectedProvinceId, () => {
  if (geoJsonRef.value?.leafletObject) {
    geoJsonRef.value.leafletObject.setStyle(geoJsonStyle)
  }
})

// Style colors
const COLORS = {
  default: '#f3f4f6',
  hover: '#facc15',
  selected: '#eab308',
  border: '#ffffff',
}

/**
 * Style function for GeoJSON features
 */
const geoJsonStyle: StyleFunction = (feature) => {
  if (!feature) return {}

  const props = feature.properties as ProvinceGeoJsonFeature['properties']
  const provinceId = props.normalizedId as string

  const isSelected = provinceId === store.selectedProvinceId
  const isHovered = provinceId === hoveredProvinceId.value

  return {
    fillColor: isSelected ? COLORS.selected : isHovered ? COLORS.hover : COLORS.default,
    fillOpacity: isSelected ? 0.8 : isHovered ? 0.6 : 0.5,
    color: COLORS.border,
    weight: isSelected ? 2.5 : 1,
    opacity: 1,
  }
}

/**
 * GeoJSON options with event handlers
 */
const geoJsonOptions = computed(() => ({
  style: geoJsonStyle,
  onEachFeature: (feature: ProvinceGeoJsonFeature, layer: Layer) => {
    const name = getProvinceName(feature.properties)
    const id = generateProvinceId(name)

    layer.on({
      click: () => handleProvinceClick(id, name),
      mouseover: (e: LeafletMouseEvent) => handleMouseOver(e, id, name),
      mouseout: (e: LeafletMouseEvent) => handleMouseOut(e),
    })
  },
}))

/**
 * Handle province click - select province in store
 */
const handleProvinceClick = (id: string, name: string) => {
  const umpData = getUmpByProvinceName(name)
  if (umpData) {
    store.selectProvince(umpData.id, umpData.name)
  } else {
    store.selectProvince(id, name)
  }
}

/**
 * Handle mouse over - highlight province
 */
const handleMouseOver = (e: LeafletMouseEvent, id: string, name: string) => {
  hoveredProvinceId.value = id
  hoveredProvinceName.value = name

  const layer = e.target
  const umpData = getUmpByProvinceName(name)
  const actualId = umpData?.id || id

  layer.setStyle({
    fillColor: actualId === store.selectedProvinceId ? COLORS.selected : COLORS.hover,
    fillOpacity: 0.7,
    weight: 2,
  })
}

/**
 * Handle mouse out - reset highlight
 */
const handleMouseOut = (e: LeafletMouseEvent) => {
  hoveredProvinceId.value = null
  hoveredProvinceName.value = ''

  const layer = e.target
  const feature = layer.feature as ProvinceGeoJsonFeature
  const name = getProvinceName(feature.properties)
  const umpData = getUmpByProvinceName(name)
  const actualId = umpData?.id || (feature.properties.normalizedId as string)

  layer.setStyle({
    fillColor: actualId === store.selectedProvinceId ? COLORS.selected : COLORS.default,
    fillOpacity: actualId === store.selectedProvinceId ? 0.8 : 0.5,
    weight: actualId === store.selectedProvinceId ? 2.5 : 1,
  })
}

// Key for forcing GeoJSON re-render (without Date.now() for performance)
const geoJsonKey = computed(() => `geojson-${store.selectedProvinceId}`)
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
      v-if="hoveredProvinceName && !isLoading"
      class="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-ios"
    >
      <p class="text-gray-800 font-medium">{{ hoveredProvinceName }}</p>
    </div>

    <!-- Selected province indicator -->
    <div
      v-if="store.selectedProvinceName && !isLoading"
      class="absolute bottom-4 left-4 z-[1000] bg-primary-400 px-4 py-2 rounded-xl shadow-ios"
    >
      <p class="text-gray-900 font-semibold text-sm">
        📍 {{ store.selectedProvinceName }}
      </p>
    </div>

    <!-- Instructions -->
    <div
      v-if="!store.selectedProvinceName && !isLoading && !error"
      class="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-ios"
    >
      <p class="text-gray-600 text-sm">👆 Klik provinsi untuk memilih</p>
    </div>

    <!-- The Map -->
    <LMap
      v-if="!error"
      :zoom="zoom"
      :center="center"
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

      <LGeoJson
        v-if="geoJsonData"
        ref="geoJsonRef"
        :key="geoJsonKey"
        :geojson="geoJsonData"
        :options="geoJsonOptions"
      />
    </LMap>
  </div>
</template>

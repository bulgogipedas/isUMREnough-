import type {
  IndonesiaGeoJson,
  ProvinceGeoJsonFeature,
  ProvinceGeoJsonProperties,
} from '~/types'

const GEOJSON_URL = 'https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province.json'

/**
 * Composable for loading and managing Indonesia GeoJSON data
 */
export function useGeoJson() {
  const geoJsonData = ref<IndonesiaGeoJson | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Extract province name from GeoJSON properties
   */
  const getProvinceName = (properties: ProvinceGeoJsonProperties): string => {
    return (
      properties.Propinsi ||
      properties.PROVINSI ||
      properties.provinsi ||
      properties.name ||
      ''
    ).trim()
  }

  /**
   * Generate consistent ID from province name
   */
  const generateProvinceId = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }

  /**
   * Fetch GeoJSON data from GitHub
   */
  const fetchGeoJson = async (): Promise<IndonesiaGeoJson> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(GEOJSON_URL)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json() as IndonesiaGeoJson

      // Normalize properties for consistent naming
      data.features = data.features.map((feature) => {
        const name = getProvinceName(feature.properties)
        return {
          ...feature,
          properties: {
            ...feature.properties,
            normalizedName: name,
            normalizedId: generateProvinceId(name),
          },
        }
      })

      geoJsonData.value = data
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal memuat data peta'
      error.value = message
      throw new Error(message)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get feature by province ID
   */
  const getFeatureById = (id: string): ProvinceGeoJsonFeature | undefined => {
    if (!geoJsonData.value) return undefined

    return geoJsonData.value.features.find(
      (feature) => feature.properties.normalizedId === id
    )
  }

  /**
   * Get all province names
   */
  const getAllProvinceNames = (): string[] => {
    if (!geoJsonData.value) return []

    return geoJsonData.value.features
      .map((feature) => feature.properties.normalizedName)
      .filter((name): name is string => Boolean(name))
  }

  return {
    geoJsonData: readonly(geoJsonData),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchGeoJson,
    getProvinceName,
    generateProvinceId,
    getFeatureById,
    getAllProvinceNames,
  }
}

// Re-export types for convenience
export type { ProvinceGeoJsonFeature, ProvinceGeoJsonProperties }

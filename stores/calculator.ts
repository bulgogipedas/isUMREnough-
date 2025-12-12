import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import Papa from 'papaparse'
import { UMP_DATA, getUmpByProvinceName } from '~/utils/constants'
import { calculateFinancials, getAnalysisText, calculateComparisonInsight } from '~/utils/calculator'
import type {
  ProvinceData,
  CalculationResult,
  ProvinceOption,
  ExpenditureCSVRow,
  IndonesiaGeoJson,
  ProvinceGeoJsonProperties,
  ComparisonInsight,
} from '~/types'

const GEOJSON_URL = 'https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province.json'

// GeoJSON cache - OUTSIDE of reactive state to prevent Vue proxying
let geoJsonCache: IndonesiaGeoJson | null = null

interface CalculatorState {
  // User inputs
  income: number
  dependents: number
  selectedProvinceId: string | null
  selectedProvinceName: string

  // Comparison feature
  targetProvinceId: string | null
  targetProvinceName: string
  showComparison: boolean

  // Data cache (loaded once, reused)
  provinceData: Record<string, ProvinceData>
  
  // NOTE: geoJsonData removed from state - stored in non-reactive cache

  // Loading states
  isLoading: boolean
  isDataLoaded: boolean
  isGeoJsonLoaded: boolean
  error: string | null
}

export const useCalculatorStore = defineStore('calculator', {
  state: (): CalculatorState => ({
    income: 0, // Start empty - user must enter their income
    dependents: 1,
    selectedProvinceId: null,
    selectedProvinceName: '',
    // Comparison feature
    targetProvinceId: null,
    targetProvinceName: '',
    showComparison: false,
    // Data cache
    provinceData: {},
    isLoading: false,
    isDataLoaded: false,
    isGeoJsonLoaded: false,
    error: null,
  }),

  getters: {
    /**
     * Get current province data (origin)
     */
    currentProvince(): ProvinceData | null {
      if (!this.selectedProvinceId) return null
      return this.provinceData[this.selectedProvinceId] || null
    },

    /**
     * Get target province data
     */
    targetProvince(): ProvinceData | null {
      if (!this.targetProvinceId) return null
      return this.provinceData[this.targetProvinceId] || null
    },

    /**
     * Get sorted province list for dropdown
     */
    provinceList(): ProvinceOption[] {
      return Object.entries(this.provinceData)
        .filter(([_, data]) => data.expenditurePerCapita > 0)
        .map(([id, data]) => ({
          id,
          name: data.name,
          expenditure: data.expenditurePerCapita,
          ump: data.ump,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'id'))
    },

    /**
     * Get province list excluding the origin province (for target selection)
     */
    targetProvinceList(): ProvinceOption[] {
      return this.provinceList.filter((p) => p.id !== this.selectedProvinceId)
    },

    /**
     * Calculate financial results for origin province
     * Uses the reusable calculateFinancials utility
     */
    calculationResults(): CalculationResult | null {
      const province = this.currentProvince
      if (!province) return null

      return calculateFinancials({
        income: this.income,
        dependents: this.dependents,
        provinceData: province,
      })
    },

    /**
     * Calculate financial results for target province
     * Uses the same reusable calculateFinancials utility
     */
    targetCalculation(): CalculationResult | null {
      const province = this.targetProvince
      if (!province) return null

      return calculateFinancials({
        income: this.income,
        dependents: this.dependents,
        provinceData: province,
      })
    },

    /**
     * Get comparison insight between origin and target provinces
     */
    comparisonInsight(): ComparisonInsight | null {
      const origin = this.calculationResults
      const target = this.targetCalculation
      
      if (!origin || !target) return null

      return calculateComparisonInsight(origin, target)
    },

    /**
     * Get analysis text based on calculation results
     * Uses the reusable getAnalysisText utility
     */
    analysisText(): string {
      const results = this.calculationResults
      if (!results) return ''

      return getAnalysisText(results.incomeVsExpenseRatio)
    },

    /**
     * Get analysis text for target province
     */
    targetAnalysisText(): string {
      const results = this.targetCalculation
      if (!results) return ''

      return getAnalysisText(results.incomeVsExpenseRatio)
    },
  },

  actions: {
    /**
     * Set income value
     */
    setIncome(value: number) {
      this.income = Math.max(0, value)
    },

    /**
     * Set number of dependents
     */
    setDependents(value: number) {
      this.dependents = Math.max(1, Math.min(20, value))
    },

    /**
     * Select a province (origin)
     */
    selectProvince(id: string, name: string) {
      this.selectedProvinceId = id
      this.selectedProvinceName = name
      
      // If the selected origin is the same as target, clear target
      if (this.targetProvinceId === id) {
        this.targetProvinceId = null
        this.targetProvinceName = ''
      }
    },

    /**
     * Select target province for comparison
     */
    selectTargetProvince(id: string, name: string) {
      this.targetProvinceId = id
      this.targetProvinceName = name
    },

    /**
     * Clear target province selection
     */
    clearTargetProvince() {
      this.targetProvinceId = null
      this.targetProvinceName = ''
    },

    /**
     * Toggle comparison widget visibility
     */
    toggleComparison() {
      this.showComparison = !this.showComparison
      
      // Reset target when hiding
      if (!this.showComparison) {
        this.targetProvinceId = null
        this.targetProvinceName = ''
      }
    },

    /**
     * Set comparison visibility
     */
    setShowComparison(value: boolean) {
      this.showComparison = value
      
      // Reset target when hiding
      if (!value) {
        this.targetProvinceId = null
        this.targetProvinceName = ''
      }
    },

    /**
     * Set loading state
     */
    setLoading(value: boolean) {
      this.isLoading = value
    },

    /**
     * Set error message
     */
    setError(message: string | null) {
      this.error = message
    },

    /**
     * Load expenditure data from CSV (with caching)
     */
    async loadExpenditureData(): Promise<void> {
      // Skip if already loaded
      if (this.isDataLoaded && Object.keys(this.provinceData).length > 0) {
        return
      }

      this.isLoading = true
      this.error = null

      try {
        // Initialize with UMP data
        const data: Record<string, ProvinceData> = {}
        UMP_DATA.forEach((ump) => {
          data[ump.id] = {
            name: ump.name,
            expenditurePerCapita: 0,
            expenditureFood: 0,
            expenditureNonFood: 0,
            ump: ump.ump,
          }
        })

        // Fetch CSV
        const response = await fetch('/pengeluaran_perkapita_2024.csv')
        if (!response.ok) throw new Error('Gagal memuat data pengeluaran')

        const csvText = await response.text()

        // Parse CSV (non-blocking with setTimeout)
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            const results = Papa.parse<ExpenditureCSVRow>(csvText, {
              header: true,
              skipEmptyLines: true,
              dynamicTyping: true,
            })

            results.data.forEach((row) => {
              const provinceName = row.Provinsi?.trim()
              if (!provinceName || provinceName === 'Indonesia') return

              const foodKey = 'Rata-rata Pengeluaran per Kapita Sebulan di Perkotaan dan Perdesaan - Makanan'
              const nonFoodKey = 'Rata-rata Pengeluaran per Kapita Sebulan di Perkotaan dan Perdesaan - Bukan Makanan'
              const totalKey = 'Rata-rata Pengeluaran per Kapita Sebulan di Perkotaan dan Perdesaan - Jumlah'

              const foodExpenditure = typeof row[foodKey] === 'number'
                ? row[foodKey]
                : parseFloat(String(row[foodKey] || 0).replace(/[^\d.]/g, ''))

              const nonFoodExpenditure = typeof row[nonFoodKey] === 'number'
                ? row[nonFoodKey]
                : parseFloat(String(row[nonFoodKey] || 0).replace(/[^\d.]/g, ''))

              const totalExpenditure = typeof row[totalKey] === 'number'
                ? row[totalKey]
                : parseFloat(String(row[totalKey] || 0).replace(/[^\d.]/g, ''))

              const umpData = getUmpByProvinceName(provinceName)
              if (umpData && data[umpData.id]) {
                data[umpData.id] = {
                  ...data[umpData.id],
                  expenditurePerCapita: totalExpenditure,
                  expenditureFood: foodExpenditure,
                  expenditureNonFood: nonFoodExpenditure,
                }
              }
            })

            resolve()
          }, 0)
        })

        this.provinceData = data
        this.isDataLoaded = true
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Terjadi kesalahan'
        throw err
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Load GeoJSON data (with caching)
     * CRITICAL: Returns RAW object, NOT reactive to prevent Vue proxying thousands of coordinates
     */
    async loadGeoJson(): Promise<IndonesiaGeoJson> {
      // Return cached data if available (non-reactive)
      if (this.isGeoJsonLoaded && geoJsonCache) {
        return geoJsonCache
      }

      try {
        const response = await fetch(GEOJSON_URL)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

        const data = await response.json() as IndonesiaGeoJson

        // Normalize properties
        data.features = data.features.map((feature) => {
          const props = feature.properties
          const name = (props.Propinsi || props.PROVINSI || props.provinsi || props.name || '').trim()
          const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

          return {
            ...feature,
            properties: {
              ...props,
              normalizedName: name,
              normalizedId: id,
            },
          }
        })

        // CRITICAL: markRaw prevents Vue from making this reactive
        // This is essential because GeoJSON has thousands of coordinates
        geoJsonCache = markRaw(data)
        this.isGeoJsonLoaded = true
        return geoJsonCache
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Gagal memuat peta')
      }
    },

    /**
     * Helper to get province name from GeoJSON properties
     */
    getProvinceName(properties: ProvinceGeoJsonProperties): string {
      return (
        properties.Propinsi ||
        properties.PROVINSI ||
        properties.provinsi ||
        properties.name ||
        ''
      ).trim()
    },
  },
})


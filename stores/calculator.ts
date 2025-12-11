import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import Papa from 'papaparse'
import { UMP_DATA, getUmpByProvinceName } from '~/utils/constants'
import type {
  ProvinceData,
  CalculationResult,
  FinancialStatus,
  ProvinceOption,
  ExpenditureCSVRow,
  IndonesiaGeoJson,
  ProvinceGeoJsonProperties,
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
    income: 5000000,
    dependents: 1,
    selectedProvinceId: null,
    selectedProvinceName: '',
    provinceData: {},
    isLoading: false,
    isDataLoaded: false,
    isGeoJsonLoaded: false,
    error: null,
  }),

  getters: {
    /**
     * Get current province data
     */
    currentProvince(): ProvinceData | null {
      if (!this.selectedProvinceId) return null
      return this.provinceData[this.selectedProvinceId] || null
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
     * Calculate financial results
     */
    calculationResults(): CalculationResult | null {
      const province = this.currentProvince
      if (!province || province.expenditurePerCapita === 0) return null

      const totalExpense = province.expenditurePerCapita * this.dependents
      const balance = this.income - totalExpense
      const balancePercentage = totalExpense > 0 ? (balance / totalExpense) * 100 : 0
      const umpComparison = province.ump > 0 ? (this.income / province.ump) * 100 : 0
      const incomeVsExpenseRatio = totalExpense > 0 ? (this.income / totalExpense) * 100 : 0

      let status: FinancialStatus = 'neutral'
      if (balance > 0) status = 'surplus'
      else if (balance < 0) status = 'deficit'

      return {
        totalExpense,
        balance,
        balancePercentage,
        umpComparison,
        incomeVsExpenseRatio,
        status,
        monthlyPerCapita: province.expenditurePerCapita,
        expenditureFood: province.expenditureFood || 0,
        expenditureNonFood: province.expenditureNonFood || 0,
      }
    },

    /**
     * Get analysis text based on calculation results
     */
    analysisText(): string {
      const results = this.calculationResults
      if (!results) return ''

      const ratio = results.incomeVsExpenseRatio

      if (ratio >= 150) {
        return 'Kondisi keuangan sangat sehat. Gaji kamu jauh melebihi kebutuhan hidup standar di provinsi ini.'
      }
      if (ratio >= 120) {
        return 'Kondisi keuangan sehat. Masih ada ruang untuk menabung dan berinvestasi.'
      }
      if (ratio >= 100) {
        return 'Kondisi keuangan cukup. Gaji pas dengan kebutuhan, perlu bijak dalam pengeluaran.'
      }
      if (ratio >= 80) {
        return 'Kondisi keuangan perlu perhatian. Pengeluaran melebihi pendapatan, pertimbangkan untuk mengurangi biaya.'
      }
      return 'Kondisi keuangan kritis. Segera evaluasi pengeluaran atau cari sumber pendapatan tambahan.'
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
     * Select a province
     */
    selectProvince(id: string, name: string) {
      this.selectedProvinceId = id
      this.selectedProvinceName = name
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

import Papa from 'papaparse'
import { UMP_DATA, getUmpByProvinceName } from '~/utils/constants'
import type { ProvinceData, ProvinceOption, ExpenditureCSVRow } from '~/types'

/**
 * Composable for loading and managing expenditure data from CSV
 */
export function useExpenditureData() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const provinceData = ref<Record<string, ProvinceData>>({})

  /**
   * Initialize province data with UMP values and default expenditure
   */
  const initializeProvinceData = (): Record<string, ProvinceData> => {
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

    provinceData.value = data
    return data
  }

  /**
   * Parse CSV and update province data
   */
  const loadExpenditureData = async (): Promise<Record<string, ProvinceData>> => {
    isLoading.value = true
    error.value = null

    try {
      // Initialize with UMP data
      initializeProvinceData()

      // Fetch CSV from public folder
      const response = await fetch('/pengeluaran_perkapita_2024.csv')
      if (!response.ok) {
        throw new Error('Gagal memuat data pengeluaran')
      }

      const csvText = await response.text()

      // Parse CSV
      const results = Papa.parse<ExpenditureCSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      })

      // Process each row
      const updatedData = { ...provinceData.value }

      results.data.forEach((row) => {
        const provinceName = row.Provinsi?.trim()
        if (!provinceName || provinceName === 'Indonesia') return

        // Get expenditure values with type safety
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

        // Find matching UMP data
        const umpData = getUmpByProvinceName(provinceName)
        if (umpData && updatedData[umpData.id]) {
          updatedData[umpData.id] = {
            ...updatedData[umpData.id],
            expenditurePerCapita: totalExpenditure,
            expenditureFood: foodExpenditure,
            expenditureNonFood: nonFoodExpenditure,
          }
        }
      })

      provinceData.value = updatedData
      return updatedData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get sorted province list for dropdown
   */
  const getProvinceList = computed<ProvinceOption[]>(() => {
    return Object.entries(provinceData.value)
      .filter(([_, data]) => data.expenditurePerCapita > 0)
      .map(([id, data]) => ({
        id,
        name: data.name,
        expenditure: data.expenditurePerCapita,
        ump: data.ump,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'id'))
  })

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    provinceData: readonly(provinceData),
    initializeProvinceData,
    loadExpenditureData,
    getProvinceList,
  }
}

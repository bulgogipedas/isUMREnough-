import { defineStore } from 'pinia'
import type {
  ProvinceData,
  CalculationResult,
  CalculatorState,
  FinancialStatus,
} from '~/types'

export const useCalculatorStore = defineStore('calculator', {
  state: (): CalculatorState => ({
    income: 0,
    dependents: 1,
    selectedProvinceId: null,
    selectedProvinceName: '',
    provinceData: {},
    isLoading: false,
    isDataLoaded: false,
    error: null,
  }),

  getters: {
    /**
     * Get current province data based on selection
     */
    currentProvinceData(): ProvinceData | null {
      if (!this.selectedProvinceId) return null
      return this.provinceData[this.selectedProvinceId] || null
    },

    /**
     * Calculate financial results based on inputs
     */
    calculationResult(): CalculationResult | null {
      const provinceData = this.currentProvinceData
      if (!provinceData || this.income <= 0 || this.dependents <= 0) {
        return null
      }

      if (provinceData.expenditurePerCapita <= 0) {
        return null
      }

      const monthlyPerCapita = provinceData.expenditurePerCapita
      const totalExpense = monthlyPerCapita * this.dependents
      const balance = this.income - totalExpense
      const balancePercentage = (balance / this.income) * 100
      const umpComparison = (this.income / provinceData.ump) * 100
      const incomeVsExpenseRatio = (this.income / totalExpense) * 100

      let status: FinancialStatus
      if (balance > 0) {
        status = 'surplus'
      } else if (balance < 0) {
        status = 'deficit'
      } else {
        status = 'neutral'
      }

      return {
        totalExpense,
        balance,
        balancePercentage,
        umpComparison,
        incomeVsExpenseRatio,
        status,
        monthlyPerCapita,
        expenditureFood: (provinceData.expenditureFood || 0) * this.dependents,
        expenditureNonFood: (provinceData.expenditureNonFood || 0) * this.dependents,
      }
    },

    /**
     * Check if all required inputs are provided for calculation
     */
    isCalculationReady(): boolean {
      return (
        this.selectedProvinceId !== null &&
        this.income > 0 &&
        this.dependents > 0 &&
        this.currentProvinceData !== null &&
        (this.currentProvinceData?.expenditurePerCapita || 0) > 0
      )
    },

    /**
     * Generate analysis text based on calculation results
     */
    analysisText(): string {
      const result = this.calculationResult
      if (!result) return ''

      const ratio = result.incomeVsExpenseRatio

      if (result.status === 'deficit') {
        return `Penghasilan Anda belum menutup estimasi biaya hidup layak untuk jumlah tanggungan ini. Anda menghabiskan sekitar ${ratio.toFixed(1)}% gaji untuk kebutuhan ${this.dependents} orang.`
      } else if (ratio < 120) {
        return `Penghasilan Anda cukup untuk menutup kebutuhan dasar, namun margin surplus tipis. Disarankan untuk menabung minimal 20% dari penghasilan.`
      } else if (ratio < 150) {
        return `Kondisi keuangan Anda sehat dengan surplus yang memadai. Anda dapat mengalokasikan sisa untuk tabungan, investasi, atau dana darurat.`
      } else {
        return `Kondisi keuangan Anda sangat baik! Penghasilan Anda jauh di atas estimasi kebutuhan. Manfaatkan surplus untuk investasi jangka panjang.`
      }
    },
  },

  actions: {
    setIncome(value: number) {
      this.income = Math.max(0, value)
    },

    setDependents(value: number) {
      this.dependents = Math.max(1, Math.floor(value))
    },

    selectProvince(provinceId: string, provinceName: string) {
      this.selectedProvinceId = provinceId
      this.selectedProvinceName = provinceName
    },

    setProvinceData(data: Record<string, ProvinceData>) {
      this.provinceData = data
      this.isDataLoaded = true
    },

    setLoading(value: boolean) {
      this.isLoading = value
    },

    setError(error: string | null) {
      this.error = error
    },

    reset() {
      this.income = 0
      this.dependents = 1
      this.selectedProvinceId = null
      this.selectedProvinceName = ''
      this.error = null
    },
  },
})

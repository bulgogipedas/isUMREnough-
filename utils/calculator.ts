/**
 * Reusable financial calculation utilities
 * Used by both main dashboard and comparison widget
 */
import type { ProvinceData, CalculationResult, FinancialStatus } from '~/types'

/**
 * Input parameters for financial calculation
 */
export interface FinancialCalculationInput {
  income: number
  dependents: number
  provinceData: ProvinceData
}

/**
 * Calculate financial results for a given income, dependents, and province data
 * This function is the single source of truth for all financial calculations
 * 
 * @param input - The calculation input parameters
 * @returns CalculationResult or null if province data is invalid
 */
export function calculateFinancials(input: FinancialCalculationInput): CalculationResult | null {
  const { income, dependents, provinceData } = input

  // Guard against invalid province data
  if (!provinceData || provinceData.expenditurePerCapita === 0) {
    return null
  }

  const totalExpense = provinceData.expenditurePerCapita * dependents
  const balance = income - totalExpense
  const balancePercentage = totalExpense > 0 ? (balance / totalExpense) * 100 : 0
  const umpComparison = provinceData.ump > 0 ? (income / provinceData.ump) * 100 : 0
  const incomeVsExpenseRatio = totalExpense > 0 ? (income / totalExpense) * 100 : 0

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
    monthlyPerCapita: provinceData.expenditurePerCapita,
    expenditureFood: provinceData.expenditureFood || 0,
    expenditureNonFood: provinceData.expenditureNonFood || 0,
  }
}

/**
 * Generate analysis text based on income vs expense ratio
 * 
 * @param ratio - The income vs expense ratio (percentage)
 * @returns Analysis text string
 */
export function getAnalysisText(ratio: number): string {
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
}

/**
 * Comparison insight between two provinces
 */
export interface ComparisonInsight {
  /** Difference in surplus (target - origin) */
  diffSurplus: number
  /** Whether target province yields more money */
  isBetter: boolean
  /** Percentage change in costs */
  percentageChange: number
  /** Difference in monthly per capita expenditure */
  diffExpenditure: number
}

/**
 * Calculate comparison insight between origin and target provinces
 * 
 * @param originResult - Calculation result for origin province
 * @param targetResult - Calculation result for target province
 * @returns ComparisonInsight object
 */
export function calculateComparisonInsight(
  originResult: CalculationResult,
  targetResult: CalculationResult
): ComparisonInsight {
  const diffSurplus = targetResult.balance - originResult.balance
  const isBetter = diffSurplus > 0
  
  // Calculate percentage change in costs
  // Negative = costs dropped (good), Positive = costs rose (bad)
  const percentageChange = originResult.totalExpense > 0
    ? ((targetResult.totalExpense - originResult.totalExpense) / originResult.totalExpense) * 100
    : 0
  
  const diffExpenditure = targetResult.monthlyPerCapita - originResult.monthlyPerCapita

  return {
    diffSurplus,
    isBetter,
    percentageChange,
    diffExpenditure,
  }
}

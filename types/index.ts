/**
 * Centralized TypeScript definitions for Kalkulator Beban Hidup
 */

// ============================================
// Province & UMP Types
// ============================================

/**
 * UMP (Upah Minimum Provinsi) data item
 */
export interface UmpDataItem {
  id: string
  name: string
  aliases: string[]
  ump: number
  year: number
}

/**
 * Province data with expenditure and UMP information
 */
export interface ProvinceData {
  name: string
  expenditurePerCapita: number
  expenditureFood?: number
  expenditureNonFood?: number
  ump: number
}

/**
 * Province option for dropdowns and selection
 */
export interface ProvinceOption {
  id: string
  name: string
  expenditure: number
  ump: number
}

// ============================================
// Calculator Types
// ============================================

/**
 * Financial status type
 */
export type FinancialStatus = 'surplus' | 'deficit' | 'neutral'

/**
 * Calculation result from the calculator
 */
export interface CalculationResult {
  totalExpense: number
  balance: number
  balancePercentage: number
  umpComparison: number
  incomeVsExpenseRatio: number
  status: FinancialStatus
  monthlyPerCapita: number
  expenditureFood: number
  expenditureNonFood: number
}

/**
 * Calculator store state
 */
export interface CalculatorState {
  income: number
  dependents: number
  selectedProvinceId: string | null
  selectedProvinceName: string
  provinceData: Record<string, ProvinceData>
  isLoading: boolean
  isDataLoaded: boolean
  error: string | null
  // Comparison feature
  targetProvinceId: string | null
  targetProvinceName: string
  showComparison: boolean
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

// ============================================
// UI Types
// ============================================

/**
 * Status configuration for UI styling
 */
export interface StatusConfig {
  bg: string
  text: string
  border: string
  icon: string
  label: string
}

/**
 * Base card padding options
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg'

// ============================================
// GeoJSON Types
// ============================================

/**
 * GeoJSON feature properties for Indonesian provinces
 */
export interface ProvinceGeoJsonProperties {
  Propinsi?: string
  PROVINSI?: string
  provinsi?: string
  name?: string
  kode?: string
  id?: string
  normalizedName?: string
  normalizedId?: string
  [key: string]: unknown
}

/**
 * GeoJSON feature for a province
 */
export interface ProvinceGeoJsonFeature {
  type: 'Feature'
  properties: ProvinceGeoJsonProperties
  geometry: {
    type: string
    coordinates: number[][][]
  }
}

/**
 * Indonesia GeoJSON collection
 */
export interface IndonesiaGeoJson {
  type: 'FeatureCollection'
  features: ProvinceGeoJsonFeature[]
}

// ============================================
// CSV Types
// ============================================

/**
 * CSV row structure for expenditure data
 */
export interface ExpenditureCSVRow {
  Provinsi: string
  'Rata-rata Pengeluaran per Kapita Sebulan di Perkotaan dan Perdesaan - Makanan': string | number
  'Rata-rata Pengeluaran per Kapita Sebulan di Perkotaan dan Perdesaan - Bukan Makanan': string | number
  'Rata-rata Pengeluaran per Kapita Sebulan di Perkotaan dan Perdesaan - Jumlah': string | number
  [key: string]: string | number
}


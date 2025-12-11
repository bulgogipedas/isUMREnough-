/**
 * Utility functions for formatting values
 */

/**
 * Format number as Indonesian Rupiah currency
 * @param value - The number to format
 * @returns Formatted currency string (e.g., "Rp1.500.000")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format number with Indonesian thousand separators
 * @param value - The number to format
 * @returns Formatted number string (e.g., "1.500.000")
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value)
}

/**
 * Parse formatted currency/number string back to number
 * @param value - The formatted string to parse
 * @returns Parsed number
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d]/g, '')
  return parseInt(cleaned, 10) || 0
}

/**
 * Format percentage with specified decimal places
 * @param value - The percentage value
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string (e.g., "85%")
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Clamp a value between min and max
 * @param value - The value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}


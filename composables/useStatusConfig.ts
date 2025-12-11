import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { FinancialStatus } from '~/types'

/**
 * Status configuration with styling and icon
 */
export interface StatusConfigItem {
  bg: string
  text: string
  border: string
  icon: Component
  label: string
}

/**
 * All status configurations mapped by status type
 */
const STATUS_CONFIGS: Record<FinancialStatus, StatusConfigItem> = {
  surplus: {
    bg: 'bg-surplus-light',
    text: 'text-surplus-dark',
    border: 'border-surplus/20',
    icon: TrendingUp,
    label: 'Surplus (Lebih)',
  },
  deficit: {
    bg: 'bg-deficit-light',
    text: 'text-deficit-dark',
    border: 'border-deficit/20',
    icon: TrendingDown,
    label: 'Defisit (Kurang)',
  },
  neutral: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: Minus,
    label: 'Seimbang',
  },
}

/**
 * Composable for financial status configuration
 */
export function useStatusConfig() {
  /**
   * Get status configuration by status type
   */
  const getStatusConfig = (status: FinancialStatus): StatusConfigItem => {
    return STATUS_CONFIGS[status]
  }

  /**
   * Get progress bar color based on income vs expense ratio
   */
  const getProgressBarColor = (ratio: number): string => {
    if (ratio >= 100) return 'bg-surplus'
    if (ratio >= 80) return 'bg-primary-400'
    return 'bg-deficit'
  }

  /**
   * Get balance text color class
   */
  const getBalanceColor = (balance: number): string => {
    return balance >= 0 ? 'text-surplus-dark' : 'text-deficit-dark'
  }

  /**
   * Get balance background color class
   */
  const getBalanceBgColor = (balance: number): string => {
    return balance >= 0 ? 'bg-surplus-light' : 'bg-deficit-light'
  }

  /**
   * Calculate progress bar width as percentage string
   */
  const calculateProgressWidth = (ratio: number, max: number = 100): string => {
    const clamped = Math.min(ratio, max)
    return `${clamped}%`
  }

  return {
    getStatusConfig,
    getProgressBarColor,
    getBalanceColor,
    getBalanceBgColor,
    calculateProgressWidth,
    STATUS_CONFIGS,
  }
}


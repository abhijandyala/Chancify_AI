import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function formatGPA(value: number): string {
  return value.toFixed(2)
}

export function formatSAT(value: number): string {
  return Math.round(value).toString()
}

export function getSelectivityTier(acceptanceRate: number): string {
  if (acceptanceRate < 0.10) return 'Elite'
  if (acceptanceRate < 0.25) return 'Highly Selective'
  if (acceptanceRate < 0.50) return 'Selective'
  return 'Less Selective'
}

export function getTierColor(tier: string): string {
  switch (tier) {
    case 'Elite':
      return 'text-red-600 dark:text-red-400'
    case 'Highly Selective':
      return 'text-orange-600 dark:text-orange-400'
    case 'Selective':
      return 'text-yellow-600 dark:text-yellow-400'
    case 'Less Selective':
      return 'text-green-600 dark:text-green-400'
    default:
      return 'text-gray-600 dark:text-gray-400'
  }
}

export function getProbabilityColor(probability: number): string {
  if (probability >= 0.70) return 'text-green-600 dark:text-green-400'
  if (probability >= 0.40) return 'text-yellow-600 dark:text-yellow-400'
  if (probability >= 0.15) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

export function getProbabilityLabel(probability: number): string {
  if (probability >= 0.70) return 'Safety'
  if (probability >= 0.40) return 'Target'
  if (probability >= 0.15) return 'Reach'
  return 'Far Reach'
}


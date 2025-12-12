/**
 * UMP (Upah Minimum Provinsi) constants and province matching utilities
 */
import type { UmpDataItem } from '~/types'

/**
 * UMP 2024/2025 data for all 38 Indonesian provinces
 * Source: Official government announcements
 */
export const UMP_DATA: UmpDataItem[] = [
  { id: 'aceh', name: 'Aceh', aliases: ['ACEH', 'NAD', 'NANGGROE ACEH DARUSSALAM'], ump: 3413666, year: 2024 },
  { id: 'sumatera-utara', name: 'Sumatera Utara', aliases: ['SUMATERA UTARA', 'SUMUT'], ump: 2809915, year: 2024 },
  { id: 'sumatera-barat', name: 'Sumatera Barat', aliases: ['SUMATERA BARAT', 'SUMBAR'], ump: 2742476, year: 2024 },
  { id: 'riau', name: 'Riau', aliases: ['RIAU'], ump: 3191662, year: 2024 },
  { id: 'jambi', name: 'Jambi', aliases: ['JAMBI'], ump: 2943000, year: 2024 },
  { id: 'sumatera-selatan', name: 'Sumatera Selatan', aliases: ['SUMATERA SELATAN', 'SUMSEL'], ump: 3456874, year: 2024 },
  { id: 'bengkulu', name: 'Bengkulu', aliases: ['BENGKULU'], ump: 2507079, year: 2024 },
  { id: 'lampung', name: 'Lampung', aliases: ['LAMPUNG'], ump: 2633284, year: 2024 },
  { id: 'bangka-belitung', name: 'Kepulauan Bangka Belitung', aliases: ['KEPULAUAN BANGKA BELITUNG', 'BABEL', 'BANGKA BELITUNG'], ump: 3498479, year: 2024 },
  { id: 'kepulauan-riau', name: 'Kepulauan Riau', aliases: ['KEPULAUAN RIAU', 'KEPRI'], ump: 3402492, year: 2024 },
  { id: 'dki-jakarta', name: 'DKI Jakarta', aliases: ['DKI JAKARTA', 'JAKARTA'], ump: 5067381, year: 2024 },
  { id: 'jawa-barat', name: 'Jawa Barat', aliases: ['JAWA BARAT', 'JABAR'], ump: 2057495, year: 2024 },
  { id: 'jawa-tengah', name: 'Jawa Tengah', aliases: ['JAWA TENGAH', 'JATENG'], ump: 2035807, year: 2024 },
  { id: 'di-yogyakarta', name: 'DI Yogyakarta', aliases: ['DI YOGYAKARTA', 'DIY', 'YOGYAKARTA', 'D.I. YOGYAKARTA'], ump: 2125898, year: 2024 },
  { id: 'jawa-timur', name: 'Jawa Timur', aliases: ['JAWA TIMUR', 'JATIM'], ump: 2040244, year: 2024 },
  { id: 'banten', name: 'Banten', aliases: ['BANTEN'], ump: 2727514, year: 2024 },
  { id: 'bali', name: 'Bali', aliases: ['BALI'], ump: 2971250, year: 2024 },
  { id: 'nusa-tenggara-barat', name: 'Nusa Tenggara Barat', aliases: ['NUSA TENGGARA BARAT', 'NTB'], ump: 2444067, year: 2024 },
  { id: 'nusa-tenggara-timur', name: 'Nusa Tenggara Timur', aliases: ['NUSA TENGGARA TIMUR', 'NTT'], ump: 2123994, year: 2024 },
  { id: 'kalimantan-barat', name: 'Kalimantan Barat', aliases: ['KALIMANTAN BARAT', 'KALBAR'], ump: 2702616, year: 2024 },
  { id: 'kalimantan-tengah', name: 'Kalimantan Tengah', aliases: ['KALIMANTAN TENGAH', 'KALTENG'], ump: 3181013, year: 2024 },
  { id: 'kalimantan-selatan', name: 'Kalimantan Selatan', aliases: ['KALIMANTAN SELATAN', 'KALSEL'], ump: 3268612, year: 2024 },
  { id: 'kalimantan-timur', name: 'Kalimantan Timur', aliases: ['KALIMANTAN TIMUR', 'KALTIM'], ump: 3360449, year: 2024 },
  { id: 'kalimantan-utara', name: 'Kalimantan Utara', aliases: ['KALIMANTAN UTARA', 'KALTARA'], ump: 3466653, year: 2024 },
  { id: 'sulawesi-utara', name: 'Sulawesi Utara', aliases: ['SULAWESI UTARA', 'SULUT'], ump: 3485000, year: 2024 },
  { id: 'sulawesi-tengah', name: 'Sulawesi Tengah', aliases: ['SULAWESI TENGAH', 'SULTENG'], ump: 2599546, year: 2024 },
  { id: 'sulawesi-selatan', name: 'Sulawesi Selatan', aliases: ['SULAWESI SELATAN', 'SULSEL'], ump: 3385145, year: 2024 },
  { id: 'sulawesi-tenggara', name: 'Sulawesi Tenggara', aliases: ['SULAWESI TENGGARA', 'SULTRA'], ump: 2758984, year: 2024 },
  { id: 'gorontalo', name: 'Gorontalo', aliases: ['GORONTALO'], ump: 2989350, year: 2024 },
  { id: 'sulawesi-barat', name: 'Sulawesi Barat', aliases: ['SULAWESI BARAT', 'SULBAR'], ump: 2879135, year: 2024 },
  { id: 'maluku', name: 'Maluku', aliases: ['MALUKU'], ump: 2812827, year: 2024 },
  { id: 'maluku-utara', name: 'Maluku Utara', aliases: ['MALUKU UTARA', 'MALUT'], ump: 2976720, year: 2024 },
  { id: 'papua-barat', name: 'Papua Barat', aliases: ['PAPUA BARAT'], ump: 3282000, year: 2024 },
  { id: 'papua', name: 'Papua', aliases: ['PAPUA'], ump: 3864696, year: 2024 },
  { id: 'papua-tengah', name: 'Papua Tengah', aliases: ['PAPUA TENGAH'], ump: 3516700, year: 2024 },
  { id: 'papua-pegunungan', name: 'Papua Pegunungan', aliases: ['PAPUA PEGUNUNGAN'], ump: 3501874, year: 2024 },
  { id: 'papua-selatan', name: 'Papua Selatan', aliases: ['PAPUA SELATAN'], ump: 3300000, year: 2024 },
  { id: 'papua-barat-daya', name: 'Papua Barat Daya', aliases: ['PAPUA BARAT DAYA'], ump: 3282000, year: 2024 },
]

/**
 * Quick lookup map by province ID
 */
export const UMP_MAP: Record<string, UmpDataItem> = UMP_DATA.reduce(
  (acc, item) => {
    acc[item.id] = item
    return acc
  },
  {} as Record<string, UmpDataItem>
)

/**
 * Normalize province name for matching
 */
function normalizeForMatching(name: string): string {
  return name
    .toUpperCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\./g, '')
}

/**
 * Get UMP data by province name with flexible matching
 */
export function getUmpByProvinceName(name: string): UmpDataItem | undefined {
  const normalized = normalizeForMatching(name)

  // Try exact match with name first
  let found = UMP_DATA.find((item) =>
    normalizeForMatching(item.name) === normalized
  )

  if (found) return found

  // Try alias match
  found = UMP_DATA.find((item) =>
    item.aliases.some((alias) => normalizeForMatching(alias) === normalized)
  )

  if (found) return found

  // Try partial match (contains)
  found = UMP_DATA.find((item) => {
    const itemNameNorm = normalizeForMatching(item.name)
    return normalized.includes(itemNameNorm) || itemNameNorm.includes(normalized)
  })

  return found
}



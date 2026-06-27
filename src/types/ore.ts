export type GemType = 'Sapphire' | 'Ruby'
export type OreStatus = 'Available' | 'Sold' | 'Reserved'
export type OreCategory = 'Signature' | 'Collector' | 'Statement'

export interface Ore {
  id: string
  title: string
  gemType: GemType
  category: OreCategory
  price: number
  stock: number
  isFeatured: boolean
  caratWeight: number
  weightGrams: number
  dimensionsMm: { length: number; width: number; height: number }
  origin: string
  description: string
  imageUrl: string
  additionalImages?: string[]
  status: OreStatus
  featuredRank?: number
}

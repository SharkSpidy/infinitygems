import { Ore, GemType, OreCategory, OreStatus } from '../types/ore'

const STORAGE_KEY = 'infinity-gems.inventory'

const escapeSvgText = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export function createGemImage(title: string, gemType: GemType): string {
  const safeTitle = escapeSvgText(title || 'Infinity Gems')
  const fill = gemType === 'Sapphire' ? '#4f7cff' : '#d84f5b'
  const glow = gemType === 'Sapphire' ? '#95b7ff' : '#ff98a6'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200">
      <rect width="900" height="1200" fill="#06111d" />
      <rect x="40" y="40" width="820" height="1120" rx="30" fill="#0f1c2f" stroke="${fill}" stroke-width="10" />
      <circle cx="450" cy="420" r="235" fill="${fill}" opacity="0.95" />
      <circle cx="450" cy="420" r="160" fill="#ffffff" opacity="0.16" />
      <path d="M310 690 L450 960 L590 690 Z" fill="${glow}" opacity="0.9" />
      <path d="M330 420 L450 250 L570 420 L450 760 Z" fill="rgba(255,255,255,0.12)" />
      <rect x="140" y="1000" width="620" height="96" rx="18" fill="#0c1726" stroke="rgba(255,255,255,0.16)" />
      <text x="450" y="1062" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="600" fill="#f9f4e6">${safeTitle}</text>
      <text x="450" y="1120" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" letter-spacing="6" fill="#c6b07b">${gemType.toUpperCase()}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const initialInventory: Ore[] = []

export function getInventory(): Ore[] {
  if (typeof window === 'undefined') return initialInventory

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialInventory

    const parsed = JSON.parse(stored) as Ore[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialInventory
  } catch {
    return initialInventory
  }
}

export function persistInventory(inventory: Ore[]): Ore[] {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory))
  }
  return inventory
}

export function resetInventory(): Ore[] {
  return persistInventory(initialInventory)
}

export function getFeaturedOres(inventory: Ore[] = getInventory()) {
  return inventory
    .filter((ore) => ore.isFeatured && ore.status === 'Available')
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
}

export function getOreById(id: string, inventory: Ore[] = getInventory()) {
  return inventory.find((ore) => ore.id === id)
}

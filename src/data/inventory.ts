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

export const initialInventory: Ore[] = [
  {
    id: 'IGM-001',
    title: 'Vietnamese Ruby Rough – 1,400 Carats',
    gemType: 'Ruby',
    category: 'Collector',
    price: 1800000,
    stock: 1,
    isFeatured: true,
    caratWeight: 1400,
    weightGrams: 280,
    dimensionsMm: { length: 220, width: 170, height: 140 },
    origin: 'Vietnam',
    description: `Vietnamese Ruby Rough – 1,400 Carats

A remarkable natural ruby rough weighing approximately 1,400 carats, this exceptional specimen originates from the renowned ruby-bearing regions of Vietnam, a source celebrated for producing some of the world's most vibrant and sought-after corundum.

Featuring an intense pinkish-red to deep ruby-red coloration, this unpolished crystal exhibits impressive natural crystal development and substantial gemstone-bearing potential. The rough retains its original geological character, displaying a captivating combination of ruby crystal zones within its natural host matrix, making it equally appealing to gemstone collectors, investors, museums, and lapidary specialists.

Key Features

Gemstone: Natural Ruby (Corundum)

Origin: Vietnam

Weight: Approximately 1,400 Carats

Condition: Natural Unpolished Rough

Color: Vivid Pinkish-Red to Ruby Red

Treatment: Untreated (subject to laboratory verification)

Collector Value: High

Investment Potential: Significant

Display Quality: Museum and Exhibition Grade

A Rare Collector's Treasure

Large ruby rough specimens of this size are exceptionally rare in today's market. Beyond its potential as a source material for cut gemstones, this specimen stands as a striking natural mineral display piece that showcases the beauty and power of nature's geological processes.

Its impressive size, vivid coloration, and authentic natural formation make it a desirable acquisition for private collectors, gemstone investors, luxury exhibitions, museums, and high-end mineral collections worldwide.

Investment & Exhibition Potential

As demand for rare natural ruby specimens continues to grow globally, exceptional rough stones of substantial size and provenance are becoming increasingly difficult to acquire. This 1,400-carat Vietnamese ruby represents not only a unique collector's item but also a tangible natural asset with long-term appreciation potential.

Offered by Infinity Gems and Minerals LLP
Supplying exceptional natural gemstones and mineral specimens to collectors, investors, museums, jewelers, and international buyers worldwide.`,
    imageUrl: '/assets/images/PRDTR01.jpeg',
    additionalImages: ['/assets/images/PRDTR01D.jpeg'],
    status: 'Available',
    featuredRank: 1,
  },
  {
    id: 'IGM-002',
    title: 'Vietnamese Ruby Rough – 519.75 Carats',
    gemType: 'Ruby',
    category: 'Collector',
    price: 1650000,
    stock: 1,
    isFeatured: true,
    caratWeight: 519.75,
    weightGrams: 103.95,
    dimensionsMm: { length: 220, width: 170, height: 140 },
    origin: 'Vietnam',
    description: `Vietnamese Ruby Rough – 519.75 Carats

Originating from the renowned ruby-bearing regions of Vietnam, this exceptional 519.75-carat natural ruby rough exhibits intense pinkish-red to deep ruby-red coloration. Retaining its original geological character, the unpolished crystal showcases a captivating mix of ruby zones within its natural host matrix, offering substantial gemstone-bearing potential.

Key Features

Gemstone: Natural Ruby (Corundum)

Origin: Vietnam

Weight: Approximately 519.75 Carats

Condition: Natural Unpolished Rough

Color: Vivid Pinkish-Red to Ruby Red

Treatment: Untreated (subject to laboratory verification)

Collector Value: High

Investment Potential: Significant

Display Quality: Museum and Exhibition Grade

A Rare Collector's Treasure

Large ruby roughs of this caliber are exceptionally rare in today's market. Beyond its potential for cut gemstones, this piece stands as a striking natural mineral display. As global demand for rare rubies grows, this 519.75-carat specimen represents a unique, museum-grade acquisition and a tangible natural asset with significant long-term appreciation potential.

Offered by Infinity Gems and Minerals LLP
Supplying exceptional natural gemstones and mineral specimens to collectors, investors, museums, jewelers, and international buyers worldwide.`,
    imageUrl: '/assets/images/PRDTR02.jpeg',
    additionalImages: ['/assets/images/PRDTR02D.jpeg'],
    status: 'Available',
    featuredRank: 2,
  },
]

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

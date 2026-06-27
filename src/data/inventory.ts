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
    title: 'Kashmir Azure Sovereign',
    gemType: 'Sapphire',
    category: 'Signature',
    price: 285000,
    stock: 1,
    isFeatured: true,
    caratWeight: 847.5,
    weightGrams: 169.5,
    dimensionsMm: { length: 142, width: 98, height: 64 },
    origin: 'Kashmir, India',
    description: 'A museum-grade sapphire specimen with an extraordinary velvety blue tone and complete provenance from the iconic Kashmir region.',
    imageUrl: createGemImage('Kashmir Azure Sovereign', 'Sapphire'),
    additionalImages: [createGemImage('Kashmir detail', 'Sapphire')],
    status: 'Available',
    featuredRank: 1,
  },
  {
    id: 'IGM-002',
    title: 'Mogok Crimson Empress',
    gemType: 'Ruby',
    category: 'Signature',
    price: 312000,
    stock: 1,
    isFeatured: true,
    caratWeight: 1124.0,
    weightGrams: 224.8,
    dimensionsMm: { length: 178, width: 112, height: 87 },
    origin: 'Mogok Valley, Myanmar',
    description: 'An iconic ruby specimen rich in saturation and presence, representative of the world’s most treasured ruby source.',
    imageUrl: createGemImage('Mogok Crimson Empress', 'Ruby'),
    additionalImages: [createGemImage('Mogok detail', 'Ruby')],
    status: 'Available',
    featuredRank: 2,
  },
  {
    id: 'IGM-003',
    title: 'Ceylon Twilight Matrix',
    gemType: 'Sapphire',
    category: 'Collector',
    price: 142000,
    stock: 3,
    isFeatured: true,
    caratWeight: 532.0,
    weightGrams: 106.4,
    dimensionsMm: { length: 108, width: 76, height: 51 },
    origin: 'Ratnapura, Sri Lanka',
    description: 'A striking Sri Lankan sapphire with electric clarity and a luminous blue matrix that feels modern and rare.',
    imageUrl: createGemImage('Ceylon Twilight Matrix', 'Sapphire'),
    additionalImages: [createGemImage('Ceylon detail', 'Sapphire')],
    status: 'Available',
    featuredRank: 3,
  },
  {
    id: 'IGM-004',
    title: 'Montepuez Inferno Shard',
    gemType: 'Ruby',
    category: 'Collector',
    price: 168000,
    stock: 2,
    isFeatured: true,
    caratWeight: 689.0,
    weightGrams: 137.8,
    dimensionsMm: { length: 124, width: 88, height: 59 },
    origin: 'Montepuez, Mozambique',
    description: 'A vivid Mozambican ruby shard made for collectors who value energy, depth, and contemporary provenance.',
    imageUrl: createGemImage('Montepuez Inferno Shard', 'Ruby'),
    additionalImages: [createGemImage('Montepuez detail', 'Ruby')],
    status: 'Available',
    featuredRank: 4,
  },
  {
    id: 'IGM-005',
    title: 'Montana Yogo Phantasm',
    gemType: 'Sapphire',
    category: 'Statement',
    price: 126000,
    stock: 2,
    isFeatured: false,
    caratWeight: 318.5,
    weightGrams: 63.7,
    dimensionsMm: { length: 89, width: 62, height: 44 },
    origin: 'Yogo Gulch, Montana, USA',
    description: 'A pristine American sapphire with high clarity and a cool blue hue that stands apart from conventional sources.',
    imageUrl: createGemImage('Montana Yogo Phantasm', 'Sapphire'),
    status: 'Available',
  },
  {
    id: 'IGM-006',
    title: 'Mong Hsu Eternal Flame',
    gemType: 'Ruby',
    category: 'Collector',
    price: 98000,
    stock: 1,
    isFeatured: false,
    caratWeight: 445.0,
    weightGrams: 89.0,
    dimensionsMm: { length: 102, width: 71, height: 48 },
    origin: 'Mong Hsu, Myanmar',
    description: 'A richly colored ruby with a dramatic profile and an inviting glow for private collectors and interiors alike.',
    imageUrl: createGemImage('Mong Hsu Eternal Flame', 'Ruby'),
    status: 'Reserved',
  },
  {
    id: 'IGM-007',
    title: 'Australian Parti Nebula',
    gemType: 'Sapphire',
    category: 'Statement',
    price: 221000,
    stock: 1,
    isFeatured: false,
    caratWeight: 921.0,
    weightGrams: 184.2,
    dimensionsMm: { length: 156, width: 104, height: 71 },
    origin: 'New South Wales, Australia',
    description: 'A rare party-colored sapphire with a striking combination of blue, green, and gold tones in one crystal.',
    imageUrl: createGemImage('Australian Parti Nebula', 'Sapphire'),
    status: 'Available',
  },
  {
    id: 'IGM-008',
    title: 'Greenland Scarlet Monolith',
    gemType: 'Ruby',
    category: 'Signature',
    price: 354000,
    stock: 1,
    isFeatured: false,
    caratWeight: 1567.0,
    weightGrams: 313.4,
    dimensionsMm: { length: 211, width: 143, height: 98 },
    origin: 'Greenland',
    description: 'An exceptionally rare monolithic ruby specimen from an Arctic landscape, designed for the most discerning collectors.',
    imageUrl: createGemImage('Greenland Scarlet Monolith', 'Ruby'),
    status: 'Available',
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

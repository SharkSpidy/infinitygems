import { Ore } from '../types/ore'

export const ores: Ore[] = [
  {
    id: 'IGM-001', title: 'Kashmir Azure Sovereign', gemType: 'Sapphire',
    caratWeight: 847.5, weightGrams: 169.5,
    dimensionsMm: { length: 142, width: 98, height: 64 },
    origin: 'Kashmir, India',
    description: 'A magnificent Kashmir sapphire ore specimen of extraordinary provenance. The deep cornflower-blue saturation characteristic of the finest Kashmiri deposits suffuses this piece with a velvety luminescence unlike any other origin. An exceptional addition to any serious collection.',
    imageUrl: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=1200&q=90',
    additionalImages: ['https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1200&q=90','https://images.unsplash.com/photo-1551122087-f72b2483871a?w=1200&q=90'],
    status: 'Available', featuredRank: 1,
  },
  {
    id: 'IGM-002', title: 'Mogok Crimson Empress', gemType: 'Ruby',
    caratWeight: 1124.0, weightGrams: 224.8,
    dimensionsMm: { length: 178, width: 112, height: 87 },
    origin: 'Mogok Valley, Myanmar',
    description: 'From the legendary Mogok Valley — the world\'s most revered ruby source — this extraordinary specimen exhibits the celebrated "pigeon blood" coloration. Its deep chromium-rich matrix blazes with internal fire, a testament to millions of years of geological artistry.',
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=90',
    additionalImages: ['https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=1200&q=90','https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=90'],
    status: 'Available', featuredRank: 2,
  },
  {
    id: 'IGM-003', title: 'Ceylon Twilight Matrix', gemType: 'Sapphire',
    caratWeight: 532.0, weightGrams: 106.4,
    dimensionsMm: { length: 108, width: 76, height: 51 },
    origin: 'Ratnapura, Sri Lanka',
    description: 'Sri Lanka — ancient Serendib — has yielded sapphires since antiquity, and this specimen from the famed Ratnapura district represents the pinnacle of its heritage. The characteristic Ceylon blue, lighter and more electric than its Kashmiri counterpart, shimmers with remarkable clarity.',
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9519f94b4b9a?w=1200&q=90',
    additionalImages: ['https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=1200&q=90'],
    status: 'Available', featuredRank: 3,
  },
  {
    id: 'IGM-004', title: 'Montepuez Inferno Shard', gemType: 'Ruby',
    caratWeight: 689.0, weightGrams: 137.8,
    dimensionsMm: { length: 124, width: 88, height: 59 },
    origin: 'Montepuez, Mozambique',
    description: 'The Montepuez deposit, discovered in 2009, rapidly ascended to become the world\'s foremost ruby source. This specimen embodies the intense, vivid red that has made Mozambican rubies the new benchmark of excellence — a fiery testament to Africa\'s geological splendor.',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=90',
    additionalImages: ['https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=90'],
    status: 'Available', featuredRank: 4,
  },
  {
    id: 'IGM-005', title: 'Montana Yogo Phantasm', gemType: 'Sapphire',
    caratWeight: 318.5, weightGrams: 63.7,
    dimensionsMm: { length: 89, width: 62, height: 44 },
    origin: 'Yogo Gulch, Montana, USA',
    description: 'The American West yields its most precious secret in Yogo Gulch. These sapphires, unique in their natural clarity and distinctive cornflower hue, require no heat treatment — a rarity in the gem world.',
    imageUrl: 'https://images.unsplash.com/photo-1551122087-f72b2483871a?w=1200&q=90',
    status: 'Available',
  },
  {
    id: 'IGM-006', title: 'Mong Hsu Eternal Flame', gemType: 'Ruby',
    caratWeight: 445.0, weightGrams: 89.0,
    dimensionsMm: { length: 102, width: 71, height: 48 },
    origin: 'Mong Hsu, Myanmar',
    description: 'Mong Hsu rubies emerged in the 1990s to captivate the gem world with their intense purple-red fluorescence. This specimen captures the incandescent quality that defines the region.',
    imageUrl: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=1200&q=90',
    status: 'Reserved',
  },
  {
    id: 'IGM-007', title: 'Australian Parti Nebula', gemType: 'Sapphire',
    caratWeight: 921.0, weightGrams: 184.2,
    dimensionsMm: { length: 156, width: 104, height: 71 },
    origin: 'New South Wales, Australia',
    description: 'Australian parti sapphires display a remarkable trichromatic phenomenon — blue, green, and yellow coexisting in a single crystal. This specimen from New South Wales is an exceptional example of this rare geological occurrence.',
    imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1200&q=90',
    status: 'Available',
  },
  {
    id: 'IGM-008', title: 'Greenland Scarlet Monolith', gemType: 'Ruby',
    caratWeight: 1567.0, weightGrams: 313.4,
    dimensionsMm: { length: 211, width: 143, height: 98 },
    origin: 'Greenland',
    description: 'Among the rarest provenance on earth, Greenland\'s ruby deposits yield specimens of extraordinary scarcity. This monolithic ore represents a once-in-a-generation offering. Its Arctic-formed crystals carry a depth of color unseen in tropical deposits.',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=90',
    status: 'Available',
  },
]

export const getFeaturedOres = () =>
  ores.filter((o) => o.featuredRank && o.status === 'Available')
      .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))

export const getOreById = (id: string) => ores.find((o) => o.id === id)

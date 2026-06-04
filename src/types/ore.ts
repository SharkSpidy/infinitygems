export type GemType = 'Sapphire' | 'Ruby';
export type OreStatus = 'Available' | 'Sold' | 'Reserved';

export interface Ore {
  id: string;
  title: string;
  gemType: GemType;
  caratWeight: number;
  weightGrams: number;
  dimensionsMm: {
    length: number;
    width: number;
    height: number;
  };
  origin: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  status: OreStatus;
  featuredRank?: number; // 1-4 for homepage featured
}

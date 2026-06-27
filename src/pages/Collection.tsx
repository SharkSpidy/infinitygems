import { useMemo, useState } from 'react'
import { getInventory } from '../data/inventory'
import OreCard from '../components/OreCard'
import { GemType, OreStatus } from '../types/ore'

type GemFilter = 'All' | GemType
type StatusFilter = 'All' | OreStatus

export default function Collection() {
  const [inventory] = useState(getInventory())
  const [gemFilter, setGemFilter] = useState<GemFilter>('All')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')

  const filtered = useMemo(() => inventory.filter((o) => {
    const g = gemFilter === 'All' || o.gemType === gemFilter
    const s = statusFilter === 'All' || o.status === statusFilter
    return g && s
  }), [inventory, gemFilter, statusFilter])

  const counts = useMemo(() => ({
    All: inventory.length,
    Sapphire: inventory.filter((o) => o.gemType === 'Sapphire').length,
    Ruby: inventory.filter((o) => o.gemType === 'Ruby').length,
  }), [inventory])

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-4">Curated Inventory</p>
          <h1 className="font-serif text-5xl md:text-7xl text-ivory font-light mb-5">The Collection</h1>
          <div className="divider-gold max-w-32 mx-auto mb-6" />
          <p className="font-sans text-sm text-silver leading-relaxed font-light">
            Each specimen in our vault is available by private inquiry only. No prices are displayed — valuations are conducted individually to honour the unique nature of each piece.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 pb-8 border-b border-iron/20">
          <div className="flex items-center gap-1">
            {(['All', 'Sapphire', 'Ruby'] as GemFilter[]).map((f) => (
              <button key={f} onClick={() => setGemFilter(f)}
                className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 ${
                  gemFilter === f
                    ? 'text-gold border border-gold/40 bg-gold/10'
                    : 'text-silver border border-transparent hover:text-ivory hover:border-iron/50'
                }`}>
                {f} <span className="text-iron ml-1">({counts[f as keyof typeof counts] ?? 0})</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStatusFilter(s => s === 'All' ? 'Available' : 'All')}
            className={`flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
              statusFilter === 'Available' ? 'text-gold' : 'text-silver'
            }`}>
            <div className={`w-8 h-4 rounded-full transition-all duration-300 relative ${statusFilter === 'Available' ? 'bg-gold/30' : 'bg-iron'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-ivory transition-transform duration-300 ${statusFilter === 'Available' ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            Available Only
          </button>
        </div>

        <p className="font-sans text-xs text-silver/40 tracking-widest mb-8">
          {filtered.length} specimen{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-iron/10">
            {filtered.map((ore) => <OreCard key={ore.id} ore={ore} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-silver/40 font-light italic">No specimens match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

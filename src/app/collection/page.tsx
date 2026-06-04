'use client';

import { useState } from 'react';
import { ores } from '@/src/data/ores';
import OreCard from '@/src/components/OreCard';
import { GemType } from '@/src/types/ore';

type Filter = 'All' | GemType;

export default function CollectionPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available'>('All');

  const filtered = ores.filter((ore) => {
    const typeMatch = filter === 'All' || ore.gemType === filter;
    const statusMatch = statusFilter === 'All' || ore.status === 'Available';
    return typeMatch && statusMatch;
  });

  const counts = {
    All: ores.length,
    Sapphire: ores.filter((o) => o.gemType === 'Sapphire').length,
    Ruby: ores.filter((o) => o.gemType === 'Ruby').length,
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-4">
            Curated Inventory
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-ivory font-light mb-5">
            The Collection
          </h1>
          <div className="divider-gold max-w-32 mx-auto mb-6" />
          <p className="font-sans text-sm text-silver leading-relaxed font-light">
            Each specimen in our vault is available by private inquiry only. No prices
            are displayed — valuations are conducted individually to honour the unique
            nature of each piece.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 pb-8 border-b border-iron/20">
          {/* Gem type filters */}
          <div className="flex items-center gap-1">
            {(['All', 'Sapphire', 'Ruby'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 ${
                  filter === f
                    ? 'text-gold border border-gold/40 bg-gold/10'
                    : 'text-silver border border-transparent hover:text-ivory hover:border-iron/50'
                }`}
              >
                {f}
                <span className="ml-2 text-iron">
                  ({counts[f as keyof typeof counts]})
                </span>
              </button>
            ))}
          </div>

          {/* Availability toggle */}
          <button
            onClick={() =>
              setStatusFilter(statusFilter === 'All' ? 'Available' : 'All')
            }
            className={`flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
              statusFilter === 'Available' ? 'text-gold' : 'text-silver'
            }`}
          >
            <div
              className={`w-8 h-4 rounded-full transition-all duration-300 relative ${
                statusFilter === 'Available' ? 'bg-gold/30' : 'bg-iron'
              }`}
            >
              <div
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-ivory transition-transform duration-300 ${
                  statusFilter === 'Available' ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </div>
            Available Only
          </button>
        </div>

        {/* Results count */}
        <p className="font-sans text-xs text-silver/40 tracking-widest mb-8">
          {filtered.length} specimen{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-iron/10">
            {filtered.map((ore) => (
              <OreCard key={ore.id} ore={ore} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-silver/40 font-light italic">
              No specimens match your current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

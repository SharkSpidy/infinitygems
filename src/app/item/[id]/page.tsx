'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getOreById, ores } from '@/src/data/ores';
import { useModal } from '@/src/hooks/useModal';
import { Ore } from '@/src/types/ore';

function RelatedCard({ ore }: { ore: Ore }) {
  const { openModal } = useModal();
  return (
    <div className="gem-card-hover group bg-charcoal flex flex-col">
      <Link href={`/item/${ore.id}`} className="block overflow-hidden">
        <div className="relative aspect-[3/4]">
          <Image src={ore.imageUrl} alt={ore.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <p className="font-sans text-xs tracking-widest text-gold/70 mb-1">{ore.id}</p>
        <Link href={`/item/${ore.id}`}>
          <h3 className="font-serif text-xl text-ivory font-light hover:text-gold transition-colors duration-300 mb-4">{ore.title}</h3>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-iron/30">
          <span className="font-serif text-lg text-ivory">{ore.caratWeight.toLocaleString()}<span className="font-sans text-xs text-silver/60 ml-1">ct</span></span>
          <button onClick={() => openModal(ore.id, ore.title)} className="font-sans text-xs tracking-widest uppercase text-gold border border-gold/40 px-3 py-1.5 hover:bg-gold/10 transition-all duration-300">Inquire</button>
        </div>
      </div>
    </div>
  );
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const ore = getOreById(params.id);
  if (!ore) return notFound();

  const allImages = [ore.imageUrl, ...(ore.additionalImages || [])];
  const [activeImg, setActiveImg] = useState(0);
  const { openModal } = useModal();

  const related = ores
    .filter((o) => o.gemType === ore.gemType && o.id !== ore.id && o.status === 'Available')
    .slice(0, 3);

  const specs = [
    { label: 'Item ID', value: ore.id },
    { label: 'Gem Type', value: ore.gemType },
    { label: 'Carat Weight', value: `${ore.caratWeight.toLocaleString()} ct` },
    { label: 'Weight', value: `${ore.weightGrams.toLocaleString()} g` },
    {
      label: 'Dimensions (mm)',
      value: `${ore.dimensionsMm.length} × ${ore.dimensionsMm.width} × ${ore.dimensionsMm.height}`,
    },
    { label: 'Origin', value: ore.origin },
    { label: 'Status', value: ore.status },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <nav className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-silver/40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-gold transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-gold">{ore.id}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Image Column ── */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
              <Image
                src={allImages[activeImg]}
                alt={ore.title}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-5 left-5">
                <span className={`font-sans text-xs tracking-widest uppercase px-3 py-1.5 ${
                  ore.gemType === 'Sapphire'
                    ? 'bg-sapphire/80 text-sapphire-light border border-sapphire-light/40'
                    : 'bg-ruby/80 text-ruby-light border border-ruby-light/40'
                }`}>
                  {ore.gemType}
                </span>
              </div>
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square w-16 flex-shrink-0 overflow-hidden transition-all duration-300 ${
                      activeImg === i
                        ? 'border border-gold/60'
                        : 'border border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info Column ── */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="font-sans text-xs tracking-widest text-gold/70 mb-2">{ore.id}</p>
              <h1 className="font-serif text-4xl md:text-5xl text-ivory font-light leading-tight mb-2">
                {ore.title}
              </h1>
              <p className="font-sans text-sm text-silver/60 font-light">{ore.origin}</p>
            </div>

            <div className="divider-gold mb-8" />

            <p className="font-sans text-sm text-silver leading-loose font-light mb-10">
              {ore.description}
            </p>

            {/* Specifications */}
            <div className="border border-iron/30 bg-charcoal/30 mb-10">
              <div className="px-5 py-3 border-b border-iron/20">
                <h3 className="font-sans text-xs tracking-widest uppercase text-gold">
                  Specimen Details
                </h3>
              </div>
              {specs.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start justify-between px-5 py-3.5 border-b border-iron/10 last:border-0"
                >
                  <span className="font-sans text-xs tracking-wider uppercase text-silver/50 w-36 flex-shrink-0">
                    {label}
                  </span>
                  <span
                    className={`font-sans text-sm text-right font-light ${
                      label === 'Status'
                        ? ore.status === 'Available'
                          ? 'text-emerald-400'
                          : ore.status === 'Reserved'
                          ? 'text-gold'
                          : 'text-iron'
                        : 'text-ivory'
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Valuation notice */}
            <div className="flex items-start gap-3 mb-8 p-4 border border-gold/20 bg-gold/5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#C9A84C" strokeWidth="0.8"/>
                <path d="M8 5V8M8 11H8.01" stroke="#C9A84C" strokeWidth="0.8" strokeLinecap="round"/>
              </svg>
              <p className="font-sans text-xs text-gold/70 leading-relaxed font-light">
                Valuations are conducted privately. Our specialists will provide a tailored
                assessment based on current market conditions and specimen characteristics.
              </p>
            </div>

            {ore.status === 'Available' ? (
              <button
                onClick={() => openModal(ore.id, ore.title)}
                className="w-full py-5 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 hover:border-gold transition-all duration-300"
              >
                Inquire for Valuation
              </button>
            ) : (
              <div className="w-full py-5 border border-iron/30 text-center text-silver font-sans text-xs tracking-widest uppercase">
                This Specimen is {ore.status}
              </div>
            )}

            <Link
              href="/collection"
              className="mt-4 text-center font-sans text-xs tracking-widest uppercase text-silver/40 hover:text-silver transition-colors duration-300 py-2"
            >
              ← Return to Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-iron/20 mt-12">
          <p className="font-sans text-xs tracking-widest uppercase text-gold mb-8">
            Similar {ore.gemType} Specimens
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-iron/10">
            {related.map((r) => (
              <RelatedCard key={r.id} ore={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

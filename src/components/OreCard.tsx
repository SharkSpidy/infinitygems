'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Ore } from '@/src/types/ore';
import { useModal } from '@/src/hooks/useModal';

interface OreCardProps {
  ore: Ore;
  size?: 'default' | 'large';
}

export default function OreCard({ ore, size = 'default' }: OreCardProps) {
  const { openModal } = useModal();
  const isLarge = size === 'large';

  return (
    <div className="gem-card-hover group bg-charcoal flex flex-col">
      {/* Image */}
      <Link href={`/item/${ore.id}`} className="block overflow-hidden relative">
        <div className={`relative ${isLarge ? 'aspect-[4/5]' : 'aspect-[3/4]'} overflow-hidden`}>
          <Image
            src={ore.imageUrl}
            alt={ore.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
          />
          {/* Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

          {/* Status badge */}
          {ore.status !== 'Available' && (
            <div className="absolute top-4 right-4">
              <span className={`font-sans text-xs tracking-widest uppercase px-3 py-1 ${
                ore.status === 'Sold'
                  ? 'bg-iron text-silver'
                  : 'bg-gold/20 text-gold border border-gold/40'
              }`}>
                {ore.status}
              </span>
            </div>
          )}

          {/* Gem type pill */}
          <div className="absolute bottom-4 left-4">
            <span className={`font-sans text-xs tracking-widest uppercase px-3 py-1 ${
              ore.gemType === 'Sapphire'
                ? 'bg-sapphire/70 text-sapphire-light border border-sapphire-light/30'
                : 'bg-ruby/70 text-ruby-light border border-ruby-light/30'
            }`}>
              {ore.gemType}
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-sans text-xs tracking-widest text-gold/70 mb-1.5">{ore.id}</p>
        <Link href={`/item/${ore.id}`}>
          <h3 className="font-serif text-xl text-ivory font-light leading-snug hover:text-gold transition-colors duration-300 mb-2">
            {ore.title}
          </h3>
        </Link>
        <p className="font-sans text-xs text-silver/60 mb-4 font-light">{ore.origin}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-iron/30">
          <div>
            <span className="font-serif text-lg text-ivory font-light">
              {ore.caratWeight.toLocaleString()}
            </span>
            <span className="font-sans text-xs text-silver/60 ml-1">ct</span>
          </div>

          {ore.status === 'Available' ? (
            <button
              onClick={() => openModal(ore.id, ore.title)}
              className="font-sans text-xs tracking-widest uppercase text-gold border border-gold/40 px-3 py-1.5 hover:bg-gold/10 hover:border-gold transition-all duration-300"
            >
              Inquire
            </button>
          ) : (
            <span className="font-sans text-xs tracking-widest uppercase text-iron">
              {ore.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

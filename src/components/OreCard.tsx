import { Link } from 'react-router-dom'
import { Ore } from '../types/ore'
import { useModal } from '../hooks/useModal'

interface OreCardProps {
  ore: Ore
}

export default function OreCard({ ore }: OreCardProps) {
  const { openModal } = useModal()

  return (
    <div className="gem-card-hover group bg-charcoal flex flex-col max-w-[320px] mx-auto w-full">
      <Link to={`/item/${ore.id}`} className="block overflow-hidden relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-none">
          <img
            src={ore.imageUrl}
            alt={ore.title}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-[#071018]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

          {ore.status !== 'Available' && (
            <div className="absolute top-4 right-4">
              <span className={`font-sans text-xs tracking-widest uppercase px-3 py-1 ${
                ore.status === 'Sold' ? 'bg-iron text-silver' : 'bg-gold/20 text-gold border border-gold/40'
              }`}>
                {ore.status}
              </span>
            </div>
          )}

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

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="font-sans text-[11px] tracking-widest text-gold/70 mb-1.5">{ore.id}</p>
        <Link to={`/item/${ore.id}`}>
          <h3 className="font-serif text-lg sm:text-xl text-ivory font-light leading-snug hover:text-gold transition-colors duration-300 mb-2 line-clamp-2">
            {ore.title}
          </h3>
        </Link>
        <p className="font-sans text-xs text-silver/60 mb-3 font-light">{ore.origin}</p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-iron/30">
          <div>
            <span className="font-serif text-base sm:text-lg text-ivory font-light">{ore.caratWeight.toLocaleString()}</span>
            <span className="font-sans text-xs text-silver/60 ml-1">ct</span>
            <div className="font-sans text-[10px] sm:text-[11px] uppercase text-gold/60">{ore.category}</div>
          </div>
          {ore.status === 'Available' ? (
            <button
              onClick={() => openModal(ore.id, ore.title)}
              className="font-sans text-[11px] tracking-widest uppercase text-gold border border-gold/40 px-2.5 py-1.5 hover:bg-gold/10 hover:border-gold transition-all duration-300"
            >
              Inquire
            </button>
          ) : (
            <span className="font-sans text-xs tracking-widest uppercase text-iron">{ore.status}</span>
          )}
        </div>
      </div>
    </div>
  )
}

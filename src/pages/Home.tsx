import { Link } from 'react-router-dom'
import { getFeaturedOres } from '../data/ores'
import OreCard from '../components/OreCard'
import BackGround from '../assets/Back_Ground_1.jpg'

export default function Home() {
  const featured = getFeaturedOres()

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      {/* Added pt-28 md:pt-32 here to clear the fixed header */}
      <section className="relative min-h-screen flex items-end pt-28 md:pt-32 pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={BackGround}
            alt="Hero gemstone"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 to-transparent" />
        </div>

        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-6 animate-fade-up animate-delay-100">
              The Vault — Est. 2009
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-ivory font-light leading-none mb-6 animate-fade-up animate-delay-200">
              Earth's<br />
              <em className="italic shimmer-gold">Rarest</em><br />
              Gems.
            </h1>
            <p className="font-sans text-sm text-silver/80 leading-relaxed font-light max-w-md mb-10 animate-fade-up animate-delay-300">
              An exclusive private vault of the world's most extraordinary sapphire and ruby ore specimens. Each piece is a geological masterwork — authenticated, catalogued, and available by private inquiry only.
            </p>
            <div className="flex items-center gap-5 animate-fade-up animate-delay-400">
              <Link to="/collection" className="px-8 py-4 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 hover:border-gold transition-all duration-300">
                Enter the Vault
              </Link>
              <Link to="/contact" className="px-8 py-4 text-silver font-sans text-xs tracking-widest uppercase hover:text-ivory transition-colors duration-300 border border-transparent hover:border-iron/50">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 animate-fade-in animate-delay-600">
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-5">About the Vault</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory font-light leading-snug mb-6">
              A Legacy of<br /><em className="italic">Geological Rarity</em>
            </h2>
            <div className="divider-gold mb-6 max-w-24" />
            <p className="font-sans text-sm text-silver leading-loose font-light mb-5">
              Infinity Gems & Minerals was founded on a single principle: that the finest ore specimens deserve to be housed in a collection as extraordinary as they are. We source exclusively from the world's most storied deposits — Kashmir, Mogok, Montepuez — working directly with field geologists and regional specialists.
            </p>
            <p className="font-sans text-sm text-silver leading-loose font-light mb-8">
              Every specimen is independently authenticated by certified gemologists, fully documented with provenance records, and available only through private valuation inquiry. We do not display prices publicly — the rarity of these pieces makes standardized pricing a disservice to their true worth.
            </p>
            <Link to="/collection" className="inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-gold hover-line">
              View the Collection
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
                <path d="M0 4H18M15 1L18 4L15 7" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { num: '150+', label: 'Authenticated Specimens' },
              { num: '12', label: 'Countries of Origin' },
              { num: '15+', label: 'Years in Operation' },
              { num: '100%', label: 'Certified Provenance' },
            ].map(({ num, label }) => (
              <div key={label} className="border border-iron/30 p-6 bg-charcoal/30">
                <div className="font-serif text-4xl text-gold font-light mb-2">{num}</div>
                <div className="font-sans text-xs tracking-widest uppercase text-silver/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="bg-charcoal/20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-3">Featured Specimens</p>
              <h2 className="font-serif text-4xl md:text-5xl text-ivory font-light">The Collection</h2>
            </div>
            <Link to="/collection" className="hidden md:flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-silver hover:text-gold transition-colors duration-300">
              View All
              <svg width="16" height="6" viewBox="0 0 16 6" fill="none">
                <path d="M0 3H14M11 1L14 3L11 5" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-iron/10">
            {featured.map((ore) => <OreCard key={ore.id} ore={ore} />)}
          </div>

          <div className="flex justify-center mt-8 md:hidden">
            <Link to="/collection" className="font-sans text-xs tracking-widest uppercase text-gold border border-gold/40 px-8 py-3 hover:bg-gold/10 transition-all duration-300">
              View All Specimens
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1600&q=80" alt="Sapphire" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-5">Private Acquisition</p>
          <h2 className="font-serif text-4xl md:text-6xl text-ivory font-light leading-snug mb-6">
            Interested in a<br /><em className="italic">Specific Specimen?</em>
          </h2>
          <div className="divider-gold max-w-32 mx-auto mb-6" />
          <p className="font-sans text-sm text-silver leading-loose font-light mb-10">
            Each item in our vault is available for private valuation. Contact our specialists to initiate a discreet inquiry — no prices are published, as every piece merits individual consideration.
          </p>
          <Link to="/collection" className="inline-flex px-10 py-4 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 hover:border-gold transition-all duration-300">
            Browse & Inquire
          </Link>
        </div>
      </section>
    </div>
  )
}
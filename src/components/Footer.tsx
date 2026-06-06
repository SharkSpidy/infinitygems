import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-iron/20 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="font-serif text-2xl tracking-widest text-ivory font-light mb-1">INFINITY</div>
            <div className="font-serif text-xs tracking-ultra text-gold font-light mb-4">GEMS & MINERALS</div>
            <p className="font-sans text-silver text-sm leading-relaxed font-light max-w-xs">
              A private vault of the world's most extraordinary sapphire and ruby ore specimens — curated for the discerning collector.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-gold mb-5">Navigate</h3>
            <ul className="space-y-3">
              {[{ to: '/', label: 'Home' }, { to: '/collection', label: 'The Collection' }, { to: '/contact', label: 'Contact' }].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="font-sans text-sm text-silver hover:text-ivory transition-colors duration-300 hover-line">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-gold mb-5">The Vault</h3>
            <address className="not-italic font-sans text-sm text-silver leading-relaxed font-light">
              <p>12 Gemstone Quarter</p>
              <p>Suite 400, The Meridian Tower</p>
              <p>Geneva, Switzerland — 1201</p>
              <p className="mt-3">+41 22 000 0000</p>
              <p>vault@infinitygems.com</p>
            </address>
          </div>
        </div>

        <div className="divider-gold mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-iron tracking-widest uppercase">
            © {new Date().getFullYear()} Infinity Gems & Minerals. All rights reserved.
          </p>
          <p className="font-sans text-xs text-iron/60 font-light">
            All specimens are authenticated. Valuations available upon private inquiry only.
          </p>
        </div>
      </div>
    </footer>
  )
}

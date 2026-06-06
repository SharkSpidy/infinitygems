import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'The Collection' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-iron/30 py-4' : 'bg-transparent py-7'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-start group">
          <span className="font-serif text-xl tracking-widest text-ivory font-light leading-none group-hover:text-gold transition-colors duration-300">INFINITY</span>
          <span className="font-serif text-xs tracking-ultra text-gold font-light leading-none mt-0.5">GEMS & MINERALS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={`font-sans text-xs tracking-widest uppercase transition-colors duration-300 hover-line ${
              pathname === to ? 'text-gold' : 'text-silver hover:text-ivory'
            }`}>
              {label}
            </Link>
          ))}
        </nav>

        <Link to="/collection" className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-gold/40 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/10 hover:border-gold transition-all duration-300">
          View Vault
        </Link>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block h-px w-6 bg-ivory transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-6 bg-ivory transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-ivory transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col items-center gap-6 py-8 bg-vault/95 backdrop-blur-md border-t border-iron/30">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              className="font-sans text-xs tracking-widest uppercase text-silver hover:text-gold transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

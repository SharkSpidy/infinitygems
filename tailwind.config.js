/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0B',
        vault: '#111114',
        charcoal: '#1A1A1F',
        graphite: '#242428',
        iron: '#2E2E34',
        silver: '#9A9AA8',
        mist: '#C8C8D4',
        ivory: '#F0EEE8',
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-dim': '#8A6E2F',
        sapphire: '#1E3A8A',
        'sapphire-light': '#3B82F6',
        ruby: '#8B1A1A',
        'ruby-light': '#EF4444',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.35em',
        ultra: '0.5em',
      },
    },
  },
  plugins: [],
}

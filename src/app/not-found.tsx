import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-4">404</p>
        <h1 className="font-serif text-5xl text-ivory font-light mb-4">Specimen Not Found</h1>
        <div className="divider-gold max-w-24 mx-auto mb-6" />
        <p className="font-sans text-sm text-silver font-light mb-8">
          The specimen you are looking for may have been removed or does not exist.
        </p>
        <Link
          href="/collection"
          className="font-sans text-xs tracking-widest uppercase text-gold border border-gold/40 px-8 py-3 hover:bg-gold/10 transition-all duration-300"
        >
          Return to Collection
        </Link>
      </div>
    </div>
  );
}

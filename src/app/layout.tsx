'use client';

import './globals.css';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import InquiryModal from '@/src/components/InquiryModal';
import { ModalProvider } from '@/src/hooks/useModal';
import { usePathname } from 'next/navigation';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className={`grain ${cormorant.variable} ${dmSans.variable}`}>
      {!isAdmin && <Header />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <InquiryModal />}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Infinity Gems & Minerals — Exclusive Collectible Ore Vault</title>
        <meta
          name="description"
          content="An exclusive private vault of the world's finest collectible sapphire and ruby ore specimens."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ModalProvider>
          <LayoutInner>{children}</LayoutInner>
        </ModalProvider>
      </body>
    </html>
  );
}

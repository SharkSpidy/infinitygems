'use client';

import { AdminProvider } from '@/src/hooks/useAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-obsidian font-sans">
        {children}
      </div>
    </AdminProvider>
  );
}

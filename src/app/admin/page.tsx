'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAdmin } from '@/src/hooks/useAdmin';
import { ores as initialOres } from '@/src/data/ores';
import { Ore, GemType, OreStatus } from '@/src/types/ore';

// ─── Login Screen ───────────────────────────────────────────────
function LoginScreen() {
  const { login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = login(username, password);
      if (!ok) setError('Invalid credentials. Please try again.');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sapphire-light rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-vault border border-iron/30 p-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-serif text-2xl tracking-widest text-ivory font-light">INFINITY</div>
          <div className="font-serif text-xs tracking-ultra text-gold font-light">GEMS & MINERALS</div>
          <div className="divider-gold mt-5 mb-1" />
          <p className="font-sans text-xs tracking-widest uppercase text-silver/40 mt-5">
            Vault Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-silver/60 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-charcoal border border-iron/50 text-ivory px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-silver/60 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-charcoal border border-iron/50 text-ivory px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="border border-ruby/30 bg-ruby/10 px-4 py-2.5">
              <p className="font-sans text-xs text-ruby-light">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 hover:border-gold transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating…' : 'Enter Vault'}
          </button>
        </form>

        <p className="font-sans text-xs text-iron/40 text-center mt-6">
          Demo credentials: admin / vault2024
        </p>
      </div>
    </div>
  );
}

// ─── Ore Form (Add/Edit) ─────────────────────────────────────────
type OreFormData = Omit<Ore, 'id'> & { id?: string };

const defaultForm: OreFormData = {
  title: '',
  gemType: 'Sapphire',
  caratWeight: 0,
  weightGrams: 0,
  dimensionsMm: { length: 0, width: 0, height: 0 },
  origin: '',
  description: '',
  imageUrl: '',
  status: 'Available',
};

function OreFormPanel({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Ore;
  onSave: (data: OreFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<OreFormData>(initial ? { ...initial } : defaultForm);

  const set = (field: string, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const setDim = (axis: 'length' | 'width' | 'height', val: number) =>
    setForm((f) => ({ ...f, dimensionsMm: { ...f.dimensionsMm, [axis]: val } }));

  return (
    <div className="bg-graphite border border-iron/30 p-6 space-y-5">
      <h3 className="font-sans text-xs tracking-widest uppercase text-gold pb-3 border-b border-iron/20">
        {initial ? `Edit — ${initial.id}` : 'Add New Specimen'}
      </h3>

      {/* Title */}
      <div>
        <label className="admin-label">Title</label>
        <input className="admin-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Specimen name" />
      </div>

      {/* Gem Type & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Gem Type</label>
          <select className="admin-input" value={form.gemType} onChange={(e) => set('gemType', e.target.value as GemType)}>
            <option value="Sapphire">Sapphire</option>
            <option value="Ruby">Ruby</option>
          </select>
        </div>
        <div>
          <label className="admin-label">Status</label>
          <select className="admin-input" value={form.status} onChange={(e) => set('status', e.target.value as OreStatus)}>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Carats & Weight */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Carat Weight</label>
          <input className="admin-input" type="number" value={form.caratWeight} onChange={(e) => set('caratWeight', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="admin-label">Weight (g)</label>
          <input className="admin-input" type="number" value={form.weightGrams} onChange={(e) => set('weightGrams', parseFloat(e.target.value))} />
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <label className="admin-label">Dimensions (mm) — L × W × H</label>
        <div className="grid grid-cols-3 gap-3">
          {(['length', 'width', 'height'] as const).map((ax) => (
            <input
              key={ax}
              className="admin-input"
              type="number"
              value={form.dimensionsMm[ax]}
              onChange={(e) => setDim(ax, parseFloat(e.target.value))}
              placeholder={ax.charAt(0).toUpperCase() + ax.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Origin */}
      <div>
        <label className="admin-label">Origin</label>
        <input className="admin-input" value={form.origin} onChange={(e) => set('origin', e.target.value)} placeholder="e.g. Kashmir, India" />
      </div>

      {/* Image URL */}
      <div>
        <label className="admin-label">Primary Image URL</label>
        <input className="admin-input" value={form.imageUrl} onChange={(e) => set('imageUrl', e.target.value)} placeholder="https://images.unsplash.com/..." />
      </div>

      {/* Description */}
      <div>
        <label className="admin-label">Description</label>
        <textarea className="admin-input resize-none" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Specimen description…" />
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="flex-1 py-3 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 transition-all duration-300">
          {initial ? 'Save Changes' : 'Add Specimen'}
        </button>
        <button onClick={onCancel} className="px-6 py-3 border border-iron/40 text-silver font-sans text-xs tracking-widest uppercase hover:border-iron transition-all duration-300">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────
function Dashboard() {
  const { logout } = useAdmin();
  const [inventory, setInventory] = useState<Ore[]>(initialOres);
  const [activeTab, setActiveTab] = useState<'inventory' | 'add'>('inventory');
  const [editingOre, setEditingOre] = useState<Ore | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | OreStatus>('All');
  const [filterGem, setFilterGem] = useState<'All' | GemType>('All');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filteredInventory = inventory.filter((o) => {
    const s = filterStatus === 'All' || o.status === filterStatus;
    const g = filterGem === 'All' || o.gemType === filterGem;
    return s && g;
  });

  const handleAdd = (data: OreFormData) => {
    const newId = `IGM-${String(inventory.length + 1).padStart(3, '0')}`;
    setInventory([...inventory, { ...data, id: newId }]);
    setActiveTab('inventory');
    showToast(`✓ ${data.title} added as ${newId}`);
  };

  const handleEdit = (data: OreFormData) => {
    setInventory(inventory.map((o) => (o.id === editingOre?.id ? { ...data, id: o.id } : o)));
    setEditingOre(null);
    showToast(`✓ ${data.title} updated`);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Remove this specimen from the vault?')) return;
    setInventory(inventory.filter((o) => o.id !== id));
    showToast(`Specimen ${id} removed`);
  };

  const stats = {
    total: inventory.length,
    available: inventory.filter((o) => o.status === 'Available').length,
    reserved: inventory.filter((o) => o.status === 'Reserved').length,
    sold: inventory.filter((o) => o.status === 'Sold').length,
  };

  return (
    <div className="min-h-screen bg-obsidian flex">
      {/* Sidebar */}
      <aside className="w-56 bg-vault border-r border-iron/20 flex flex-col fixed h-full">
        <div className="p-6 border-b border-iron/20">
          <div className="font-serif text-lg tracking-widest text-ivory font-light">INFINITY</div>
          <div className="font-serif text-xs tracking-ultra text-gold font-light">VAULT ADMIN</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'inventory', label: 'Inventory' },
            { id: 'add', label: 'Add Specimen' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id as typeof activeTab); setEditingOre(null); }}
              className={`w-full text-left px-4 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-200 ${
                activeTab === id && !editingOre
                  ? 'text-gold bg-gold/10 border-l border-gold'
                  : 'text-silver hover:text-ivory hover:bg-charcoal/50 border-l border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-iron/20">
          <button onClick={logout} className="w-full text-left px-4 py-2.5 font-sans text-xs tracking-widest uppercase text-silver/40 hover:text-ruby-light transition-colors duration-200">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-56 flex-1 p-8">
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-charcoal border border-gold/40 px-5 py-3 text-gold font-sans text-xs tracking-widest animate-fade-up">
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-ivory font-light">
              {editingOre ? 'Edit Specimen' : activeTab === 'inventory' ? 'Vault Inventory' : 'Add New Specimen'}
            </h1>
            <p className="font-sans text-xs text-silver/40 tracking-widest mt-1">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-ivory' },
            { label: 'Available', value: stats.available, color: 'text-emerald-400' },
            { label: 'Reserved', value: stats.reserved, color: 'text-gold' },
            { label: 'Sold', value: stats.sold, color: 'text-silver/40' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-charcoal border border-iron/20 px-5 py-4">
              <div className={`font-serif text-3xl font-light ${color}`}>{value}</div>
              <div className="font-sans text-xs tracking-widest uppercase text-silver/40 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        {editingOre ? (
          <OreFormPanel initial={editingOre} onSave={handleEdit} onCancel={() => setEditingOre(null)} />
        ) : activeTab === 'add' ? (
          <OreFormPanel onSave={handleAdd} onCancel={() => setActiveTab('inventory')} />
        ) : (
          <div>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-5">
              <select
                value={filterGem}
                onChange={(e) => setFilterGem(e.target.value as typeof filterGem)}
                className="admin-input w-auto py-2 px-3 text-xs"
              >
                <option value="All">All Types</option>
                <option value="Sapphire">Sapphire</option>
                <option value="Ruby">Ruby</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="admin-input w-auto py-2 px-3 text-xs"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Sold">Sold</option>
              </select>
              <span className="font-sans text-xs text-silver/30 ml-2 tracking-widest">
                {filteredInventory.length} result{filteredInventory.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Table */}
            <div className="border border-iron/20 overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_100px_100px_110px_130px] gap-0 bg-graphite border-b border-iron/30 px-4 py-3">
                {['Image', 'Specimen', 'Type', 'Carats', 'Status', 'Actions'].map((h) => (
                  <div key={h} className="font-sans text-xs tracking-widest uppercase text-silver/40">{h}</div>
                ))}
              </div>
              {filteredInventory.map((ore) => (
                <div
                  key={ore.id}
                  className="grid grid-cols-[auto_1fr_100px_100px_110px_130px] gap-0 items-center px-4 py-3 border-b border-iron/10 hover:bg-charcoal/30 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-10 h-10 relative mr-4 overflow-hidden bg-charcoal flex-shrink-0">
                    <Image src={ore.imageUrl} alt={ore.title} fill className="object-cover" />
                  </div>
                  {/* Title */}
                  <div>
                    <div className="font-sans text-sm text-ivory font-light truncate max-w-xs">{ore.title}</div>
                    <div className="font-sans text-xs text-silver/30 tracking-widest">{ore.id} · {ore.origin}</div>
                  </div>
                  {/* Gem Type */}
                  <div>
                    <span className={`font-sans text-xs tracking-widest px-2 py-0.5 ${
                      ore.gemType === 'Sapphire'
                        ? 'text-sapphire-light bg-sapphire/20'
                        : 'text-ruby-light bg-ruby/20'
                    }`}>
                      {ore.gemType}
                    </span>
                  </div>
                  {/* Carats */}
                  <div className="font-sans text-sm text-ivory/70">{ore.caratWeight.toLocaleString()}</div>
                  {/* Status */}
                  <div>
                    <span className={`font-sans text-xs tracking-widest uppercase ${
                      ore.status === 'Available' ? 'text-emerald-400' :
                      ore.status === 'Reserved' ? 'text-gold' : 'text-silver/40'
                    }`}>
                      {ore.status}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingOre(ore); setActiveTab('inventory'); }}
                      className="font-sans text-xs tracking-widest uppercase text-silver hover:text-gold transition-colors border border-iron/30 px-3 py-1 hover:border-gold/40"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ore.id)}
                      className="font-sans text-xs tracking-widest uppercase text-silver/30 hover:text-ruby-light transition-colors border border-iron/20 px-3 py-1 hover:border-ruby/40"
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Admin-only CSS */}
      <style jsx global>{`
        .admin-label {
          display: block;
          font-family: var(--font-inter);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(154,154,168,0.6);
          margin-bottom: 0.375rem;
        }
        .admin-input {
          width: 100%;
          background: #1A1A1F;
          border: 1px solid rgba(46,46,52,0.8);
          color: #F0EEE8;
          font-family: var(--font-inter);
          font-size: 0.8125rem;
          padding: 0.625rem 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus {
          border-color: rgba(201,168,76,0.4);
        }
        .admin-input option {
          background: #1A1A1F;
        }
      `}</style>
    </div>
  );
}

// ─── Root Admin Page ─────────────────────────────────────────────
export default function AdminPage() {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <Dashboard /> : <LoginScreen />;
}

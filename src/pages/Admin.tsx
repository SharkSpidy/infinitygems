import { useEffect, useState } from 'react'
import { useAdmin, AdminProvider } from '../hooks/useAdmin'
import { getInventory, persistInventory, resetInventory } from '../data/inventory'
import { Ore, GemType, OreStatus, OreCategory } from '../types/ore'

// ── Login ────────────────────────────────────────────────────────
function LoginScreen() {
  const { login } = useAdmin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    setTimeout(() => {
      if (!login(username, password)) setError('Invalid credentials. Please try again.')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-vault border border-iron/30 p-10">
        <div className="text-center mb-10">
          <div className="font-serif text-2xl tracking-widest text-ivory font-light">INFINITY</div>
          <div className="font-serif text-xs tracking-ultra text-gold font-light">GEMS & MINERALS</div>
          <div className="divider-gold mt-5" />
          <p className="font-sans text-xs tracking-widest uppercase text-silver/40 mt-5">Vault Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="admin-label">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required
              className="admin-input" placeholder="Enter username" />
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="admin-input" placeholder="Enter password" />
          </div>

          {error && (
            <div className="border border-red-900/40 bg-red-900/10 px-4 py-2.5">
              <p className="font-sans text-xs text-red-400">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 hover:border-gold transition-all duration-300 disabled:opacity-50">
            {loading ? 'Authenticating…' : 'Enter Vault'}
          </button>
        </form>

        <p className="font-sans text-xs text-iron/40 text-center mt-6">Demo: admin / vault2024</p>
      </div>
    </div>
  )
}

// ── Ore Form ─────────────────────────────────────────────────────
type OreFormData = Omit<Ore, 'id'> & { id?: string }

const defaultForm: OreFormData = {
  title: '', gemType: 'Sapphire', category: 'Collector', price: 0, stock: 1, isFeatured: false,
  caratWeight: 0, weightGrams: 0, dimensionsMm: { length: 0, width: 0, height: 0 },
  origin: '', description: '', imageUrl: '', status: 'Available',
}

function OreFormPanel({ initial, onSave, onCancel }: { initial?: Ore; onSave: (d: OreFormData) => void; onCancel: () => void }) {
  const [form, setForm] = useState<OreFormData>(initial ? { ...initial } : defaultForm)
  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const setDim = (ax: 'length' | 'width' | 'height', v: number) =>
    setForm(f => ({ ...f, dimensionsMm: { ...f.dimensionsMm, [ax]: v } }))

  return (
    <div className="bg-graphite border border-iron/30 p-6 space-y-5">
      <h3 className="admin-label pb-3 border-b border-iron/20">{initial ? `Edit — ${initial.id}` : 'Add New Specimen'}</h3>

      <div>
        <label className="admin-label">Title</label>
        <input className="admin-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Specimen name" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Gem Type</label>
          <select className="admin-input" value={form.gemType} onChange={e => set('gemType', e.target.value as GemType)}>
            <option value="Sapphire">Sapphire</option>
            <option value="Ruby">Ruby</option>
          </select>
        </div>
        <div>
          <label className="admin-label">Status</label>
          <select className="admin-input" value={form.status} onChange={e => set('status', e.target.value as OreStatus)}>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Carat Weight</label>
          <input className="admin-input" type="number" value={form.caratWeight} onChange={e => set('caratWeight', parseFloat(e.target.value))} />
        </div>
        <div>
          <label className="admin-label">Weight (g)</label>
          <input className="admin-input" type="number" value={form.weightGrams} onChange={e => set('weightGrams', parseFloat(e.target.value))} />
        </div>
      </div>

      <div>
        <label className="admin-label">Dimensions mm — L × W × H</label>
        <div className="grid grid-cols-3 gap-3">
          {(['length', 'width', 'height'] as const).map(ax => (
            <input key={ax} className="admin-input" type="number" value={form.dimensionsMm[ax]}
              onChange={e => setDim(ax, parseFloat(e.target.value))} placeholder={ax} />
          ))}
        </div>
      </div>

      <div>
        <label className="admin-label">Origin</label>
        <input className="admin-input" value={form.origin} onChange={e => set('origin', e.target.value)} placeholder="e.g. Kashmir, India" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Category</label>
          <select className="admin-input" value={form.category} onChange={e => set('category', e.target.value as OreCategory)}>
            <option value="Signature">Signature</option>
            <option value="Collector">Collector</option>
            <option value="Statement">Statement</option>
          </select>
        </div>
        <div>
          <label className="admin-label">Price</label>
          <input className="admin-input" type="number" value={form.price} onChange={e => set('price', parseFloat(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Stock</label>
          <input className="admin-input" type="number" value={form.stock} onChange={e => set('stock', parseInt(e.target.value, 10))} />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-silver/70">
            <input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} className="accent-gold" />
            Feature on homepage
          </label>
        </div>
      </div>

      <div>
        <label className="admin-label">Primary Image URL</label>
        <input className="admin-input" value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://images.unsplash.com/…" />
      </div>

      <div>
        <label className="admin-label">Description</label>
        <textarea className="admin-input resize-none" rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
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
  )
}

// ── Dashboard ─────────────────────────────────────────────────────
function Dashboard() {
  const { logout } = useAdmin()
  const [inventory, setInventory] = useState<Ore[]>(() => getInventory())
  const [tab, setTab] = useState<'inventory' | 'add'>('inventory')
  const [editing, setEditing] = useState<Ore | null>(null)
  const [gemFilter, setGemFilter] = useState<'All' | GemType>('All')
  const [statusFilter, setStatusFilter] = useState<'All' | OreStatus>('All')
  const [toast, setToast] = useState('')

  useEffect(() => {
    persistInventory(inventory)
  }, [inventory])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const filtered = inventory.filter(o => {
    const g = gemFilter === 'All' || o.gemType === gemFilter
    const s = statusFilter === 'All' || o.status === statusFilter
    return g && s
  })

  const stats = {
    total: inventory.length,
    available: inventory.filter(o => o.status === 'Available').length,
    reserved: inventory.filter(o => o.status === 'Reserved').length,
    sold: inventory.filter(o => o.status === 'Sold').length,
  }

  const handleAdd = (data: OreFormData) => {
    const newId = `IGM-${String(inventory.length + 1).padStart(3, '0')}`
    const newItem: Ore = { ...data, id: newId } as Ore
    setInventory([...inventory, newItem])
    setTab('inventory')
    showToast(`✓ ${data.title} added as ${newId}`)
  }

  const handleEdit = (data: OreFormData) => {
    setInventory(inventory.map(o => o.id === editing?.id ? { ...data, id: o.id } as Ore : o))
    setEditing(null)
    showToast(`✓ ${data.title} updated`)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Remove this specimen from the vault?')) return
    setInventory(inventory.filter(o => o.id !== id))
    showToast(`Specimen ${id} removed`)
  }

  return (
    <div className="min-h-screen bg-obsidian flex">
      {/* Sidebar */}
      <aside className="w-56 bg-vault border-r border-iron/20 flex flex-col fixed h-full">
        <div className="p-6 border-b border-iron/20">
          <div className="font-serif text-lg tracking-widest text-ivory font-light">INFINITY</div>
          <div className="font-serif text-xs tracking-ultra text-gold font-light">VAULT ADMIN</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[{ id: 'inventory', label: 'Inventory' }, { id: 'add', label: 'Add Specimen' }].map(({ id, label }) => (
            <button key={id} onClick={() => { setTab(id as typeof tab); setEditing(null) }}
              className={`w-full text-left px-4 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-200 ${
                tab === id && !editing
                  ? 'text-gold bg-gold/10 border-l border-gold'
                  : 'text-silver hover:text-ivory hover:bg-charcoal/50 border-l border-transparent'
              }`}>
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-iron/20">
          <button onClick={logout} className="w-full text-left px-4 py-2.5 font-sans text-xs tracking-widest uppercase text-silver/40 hover:text-red-400 transition-colors duration-200">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-charcoal border border-gold/40 px-5 py-3 text-gold font-sans text-xs tracking-widest animate-fade-up">
            {toast}
          </div>
        )}

        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-ivory font-light">
              {editing ? 'Edit Specimen' : tab === 'inventory' ? 'Vault Inventory' : 'Add New Specimen'}
            </h1>
            <p className="font-sans text-xs text-silver/40 tracking-widest mt-1">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => {
              const reset = resetInventory()
              setInventory(reset)
              showToast('Inventory restored to starter catalog')
            }}
            className="px-4 py-2 border border-iron/40 text-silver text-[11px] tracking-widest uppercase hover:border-gold/40 hover:text-gold transition-all duration-300"
          >
            Reset Demo Data
          </button>
        </div>

        {/* Stats */}
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

        {editing ? (
          <OreFormPanel initial={editing} onSave={handleEdit} onCancel={() => setEditing(null)} />
        ) : tab === 'add' ? (
          <OreFormPanel onSave={handleAdd} onCancel={() => setTab('inventory')} />
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-5">
              <select value={gemFilter} onChange={e => setGemFilter(e.target.value as typeof gemFilter)}
                className="admin-input w-auto py-2 px-3 text-xs">
                <option value="All">All Types</option>
                <option value="Sapphire">Sapphire</option>
                <option value="Ruby">Ruby</option>
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                className="admin-input w-auto py-2 px-3 text-xs">
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Sold">Sold</option>
              </select>
              <span className="font-sans text-xs text-silver/30 tracking-widest">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="border border-iron/20 overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_100px_100px_110px_130px] bg-graphite border-b border-iron/30 px-4 py-3 gap-0">
                {['Image', 'Specimen', 'Type', 'Carats', 'Status', 'Actions'].map(h => (
                  <div key={h} className="font-sans text-xs tracking-widest uppercase text-silver/40">{h}</div>
                ))}
              </div>
              {filtered.map(ore => (
                <div key={ore.id} className="grid grid-cols-[auto_1fr_100px_100px_110px_130px] items-center px-4 py-3 border-b border-iron/10 hover:bg-charcoal/30 transition-colors gap-0">
                  <div className="w-10 h-10 mr-4 overflow-hidden bg-charcoal flex-shrink-0">
                    <img src={ore.imageUrl} alt={ore.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-sans text-sm text-ivory font-light truncate max-w-xs">{ore.title}</div>
                    <div className="font-sans text-xs text-silver/30 tracking-widest">{ore.id} · {ore.origin}</div>
                  </div>
                  <div>
                    <span className={`font-sans text-xs tracking-widest px-2 py-0.5 ${ore.gemType === 'Sapphire' ? 'text-blue-400 bg-blue-900/20' : 'text-red-400 bg-red-900/20'}`}>
                      {ore.gemType}
                    </span>
                  </div>
                  <div className="font-sans text-sm text-ivory/70">{ore.caratWeight.toLocaleString()}</div>
                  <div>
                    <span className={`font-sans text-xs tracking-widest uppercase ${
                      ore.status === 'Available' ? 'text-emerald-400' : ore.status === 'Reserved' ? 'text-gold' : 'text-silver/40'
                    }`}>{ore.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditing(ore); setTab('inventory') }}
                      className="font-sans text-xs tracking-widest uppercase text-silver hover:text-gold border border-iron/30 px-3 py-1 hover:border-gold/40 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(ore.id)}
                      className="font-sans text-xs tracking-widest uppercase text-silver/30 hover:text-red-400 border border-iron/20 px-3 py-1 hover:border-red-900/40 transition-colors">
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// ── Root Admin Page ───────────────────────────────────────────────
export default function Admin() {
  return (
    <AdminProvider>
      <AdminInner />
    </AdminProvider>
  )
}

function AdminInner() {
  const { isAuthenticated } = useAdmin()
  return isAuthenticated ? <Dashboard /> : <LoginScreen />
}

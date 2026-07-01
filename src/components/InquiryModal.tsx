import { useState, useEffect } from 'react'
import { useModal } from '../hooks/useModal'
import { submitInquiryForm } from '../utils/formspree'

export default function InquiryModal() {
  const { isOpen, itemId, itemTitle, closeModal } = useModal()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
      setError('')
    }
  }, [isOpen, itemId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await submitInquiryForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject || `Inquiry for ${itemTitle}`,
        message: form.message,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div className="absolute inset-0 bg-obsidian/80 modal-backdrop" />

      <div className="relative w-full max-w-lg bg-vault border border-iron/60 shadow-2xl animate-fade-up">
        <button onClick={closeModal} className="absolute top-4 right-4 text-silver hover:text-ivory transition-colors p-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {!submitted ? (
            <>
              <div className="mb-8">
                <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">Private Valuation Inquiry</p>
                <h2 className="font-serif text-3xl text-ivory font-light">{itemTitle}</h2>
                <p className="font-sans text-xs text-silver/60 mt-1 tracking-widest">Item ID: {itemId}</p>
              </div>

              <div className="divider-gold mb-8" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', required: true },
                  { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label className="block font-sans text-xs tracking-widest uppercase text-silver mb-2">
                      {label} {required && <span className="text-gold">*</span>}
                    </label>
                    <input type={type} required={required}
                      value={form[name as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                      className="w-full bg-charcoal border border-iron/50 text-ivory font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors placeholder:text-iron"
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-silver mb-2">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-charcoal border border-iron/50 text-ivory font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors placeholder:text-iron"
                    placeholder="Briefly describe your inquiry"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-silver mb-2">Additional Notes</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3} placeholder="Any specific questions or requirements…"
                    className="w-full bg-charcoal border border-iron/50 text-ivory font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors placeholder:text-iron resize-none"
                  />
                </div>

                <div className="bg-charcoal/50 border border-iron/30 px-4 py-2.5 flex items-center justify-between">
                  <span className="font-sans text-xs text-silver tracking-widest">ITEM REFERENCE</span>
                  <span className="font-sans text-xs text-gold tracking-widest">{itemId}</span>
                </div>

                {error && (
                  <p className="font-sans text-xs text-red-400 border border-red-400/30 bg-red-400/5 px-4 py-3">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={submitting}
                  className="w-full py-4 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 hover:border-gold transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Sending…' : 'Submit Inquiry'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8 14L16 6" stroke="#C9A84C" strokeWidth="1" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-ivory font-light mb-3">Inquiry Received</h3>
              <p className="font-sans text-sm text-silver leading-relaxed font-light max-w-xs mx-auto">
                Our specialist will contact you within 24 hours regarding <span className="text-gold">{itemTitle}</span>.
              </p>
              <p className="font-sans text-xs text-iron mt-3 tracking-widest">Reference: {itemId}</p>
              <button onClick={closeModal} className="mt-8 px-8 py-3 border border-iron/50 text-silver font-sans text-xs tracking-widest uppercase hover:border-gold/40 hover:text-gold transition-all duration-300">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

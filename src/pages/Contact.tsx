import { useState } from 'react'
import { submitInquiryForm } from '../utils/formspree'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await submitInquiryForm(form)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reach the server. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 max-w-xl mx-auto">
          <p className="font-sans text-xs tracking-ultra uppercase text-gold mb-4">Private Correspondence</p>
          <h1 className="font-serif text-5xl md:text-7xl text-ivory font-light mb-5">Contact Us</h1>
          <div className="divider-gold max-w-24 mx-auto mb-6" />
          <p className="font-sans text-sm text-silver font-light leading-relaxed">
            Infinity Gems and Minerals LLP welcomes serious international inquiries, strategic partnerships, and collaboration opportunities related to this extraordinary gemstone asset.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-10">
            {[
              // { title: 'The Vault', lines: ['12 Gemstone Quarter', 'Suite 400, The Meridian Tower', 'Geneva, Switzerland — 1201'] },
              { title: 'Contact Us', lines: ['inquire@infinityluxjewels.com'] },
              // { title: 'Telephone', lines: ['+41 22 000 0000', 'Mon–Fri, 09:00–18:00 CET'] },
            ].map(({ title, lines }) => (
              <div key={title} className="flex gap-5">
                <div className="w-2 h-2 mt-2 bg-gold/40 flex-shrink-0" />
                <div>
                  <h3 className="font-sans text-xs tracking-widest uppercase text-gold mb-2">{title}</h3>
                  {lines.map((l) => <p key={l} className="font-sans text-sm text-silver font-light">{l}</p>)}
                </div>
              </div>
            ))}

            <div className="border border-iron/20 p-5 bg-charcoal/20">
              <p className="font-sans text-xs text-silver/50 leading-relaxed font-light">
                All communications are treated with the utmost discretion. We do not disclose client information to third parties under any circumstances.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'phone', label: 'Phone', type: 'tel', required: false },
                    { name: 'subject', label: 'Subject', type: 'text', required: true },
                  ].map(({ name, label, type, required }) => (
                    <div key={name}>
                      <label className="block font-sans text-xs tracking-widest uppercase text-silver/60 mb-2">
                        {label} {required && <span className="text-gold">*</span>}
                      </label>
                      <input type={type} required={required}
                        value={form[name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                        className="w-full bg-charcoal border border-iron/50 text-ivory font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-silver/60 mb-2">
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea required rows={6} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Please describe your inquiry in detail…"
                    className="w-full bg-charcoal border border-iron/50 text-ivory font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="font-sans text-xs text-red-400 border border-red-400/30 bg-red-400/5 px-4 py-3">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={submitting}
                  className="w-full py-4 bg-gold/10 border border-gold/60 text-gold font-sans text-xs tracking-widest uppercase hover:bg-gold/20 hover:border-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-iron/20 bg-charcoal/20">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#C9A84C" strokeWidth="1" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-ivory font-light mb-3">Message Received</h3>
                <p className="font-sans text-sm text-silver font-light max-w-sm">
                  Thank you for reaching out. A member of our team will respond within one business day.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
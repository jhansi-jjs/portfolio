'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';

export function Contact() {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    message: '',
    hp_website: '', // Honeypot field
  });

  const [loading, setLoading] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit contact form');
      }

      setStatusMessage({ type: 'success', text: data.message || 'Message delivered successfully!' });
      setFormState({ name: '', email: '', message: '', hp_website: '' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error sending message';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-zinc-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="space-y-2 text-center md:text-left">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">04. Get In Touch</div>
          <h2 className="text-3xl font-bold text-zinc-100">Let&apos;s Build Something Together</h2>
          <p className="text-xs text-zinc-400 max-w-xl font-normal">
            Whether you want to discuss AI research, collaborate on Visual Speech Recognition, or explore full-stack opportunities, my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-4">
              <h3 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider">Contact Information</h3>

              <div className="space-y-3 text-xs">
                <a
                  href="mailto:suggujhansi@gmail.com"
                  className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition font-mono"
                >
                  <div className="p-2 rounded-md bg-zinc-950 border border-zinc-800">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  suggujhansi@gmail.com
                </a>

                <a
                  href="https://github.com/jhansi-jjs"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition font-mono"
                >
                  <div className="p-2 rounded-md bg-zinc-950 border border-zinc-800">
                    <GithubIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  github.com/jhansi-jjs
                </a>

                <div className="flex items-center gap-3 text-zinc-400 font-mono">
                  <div className="p-2 rounded-md bg-zinc-950 border border-zinc-800">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  India
                </div>
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-800/40 p-5 rounded-xl text-xs text-emerald-300 font-mono space-y-1">
              <div className="font-bold">⚡ Active Availability</div>
              <div>Open for AI/ML research, software engineering roles, and open-source projects.</div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider">Send a Message</h3>

            {statusMessage && (
              <div
                className={`p-3 rounded-md text-xs font-mono flex items-center gap-2 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/80 border border-rose-800 text-rose-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Correction #3: Honeypot field (hidden from human users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="hp_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.hp_website}
                  onChange={(e) => setFormState({ ...formState, hp_website: e.target.value })}
                />
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label htmlFor="contact-name" className="block text-zinc-300 font-mono text-[11px]">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Alex Mercer"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="contact-email" className="block text-zinc-300 font-mono text-[11px]">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="contact-message" className="block text-zinc-300 font-mono text-[11px]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Hi Jhansi, I loved your VSR lip-reading project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Copy, ExternalLink, Check } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';

export function Contact() {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    message: '',
    hp_website: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const emailAddress = 'suggujhansi@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openGmail = (nameVal?: string, msgVal?: string) => {
    const subject = encodeURIComponent(`Portfolio Inquiry${nameVal ? ` from ${nameVal}` : ''}`);
    const body = encodeURIComponent(
      msgVal ? `${msgVal}\n\n---\nSent by: ${nameVal || 'Visitor'}` : 'Hi Jhansi,\n\nI came across your portfolio and would love to connect with you regarding...'
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const name = formState.name.trim();
    const email = formState.email.trim();
    const message = formState.message.trim();

    try {
      // 1. Submit to API endpoint
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      // 2. Launch mailto client so the email is dispatched directly from visitor's mail
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        `Portfolio Message from ${name}`
      )}&body=${encodeURIComponent(
        `${message}\n\n---\nFrom: ${name} (${email})`
      )}`;

      window.location.href = mailtoUrl;

      setStatusMessage({
        type: 'success',
        text: `Opening your email composer to deliver your message directly to ${emailAddress}!`,
      });

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
          <h2 className="text-3xl font-bold text-zinc-100">Let&apos;s Connect & Collaborate</h2>
          <p className="text-xs text-zinc-400 max-w-xl font-normal">
            Whether you want to discuss AI/ML research, explore dysarthric speech systems, collaborate on healthcare computer vision, or hire for engineering roles — my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-5">
              <h3 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider">
                Direct Contact Channels
              </h3>

              {/* Email Card with 1-click copy & Gmail open */}
              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-zinc-200 text-xs font-mono">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{emailAddress}</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded bg-zinc-900 border border-zinc-700 hover:text-emerald-400 hover:border-emerald-500/50 transition"
                    title="Copy Email Address"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => openGmail()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open in Gmail Web</span>
                  </button>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 transition"
                  >
                    <Mail className="w-3 h-3 text-emerald-400" />
                    <span>Open Mail App</span>
                  </a>
                </div>
              </div>

              {/* GitHub Link */}
              <div className="space-y-3 text-xs">
                <a
                  href="https://github.com/jhansi-jjs"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-zinc-700 transition font-mono"
                >
                  <div className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800">
                    <GithubIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>github.com/jhansi-jjs</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono">
                  <div className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>India (IST / UTC+5:30)</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-800/40 p-5 rounded-xl text-xs text-emerald-300 font-mono space-y-1">
              <div className="font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Availability
              </div>
              <div className="text-zinc-300">
                Open for AI/ML Research, Software Engineering Internships & Full-Time Roles, and Open-Source Collaborations.
              </div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider">
              Send a Direct Message
            </h3>

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
              {/* Honeypot field (hidden from human users) */}
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
                  placeholder="e.g. Alex Smith"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition font-mono text-xs"
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
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition font-mono text-xs"
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
                  placeholder="Hi Jhansi, I would like to discuss..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition font-mono text-xs resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openGmail(formState.name, formState.message)}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-mono rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Send via Gmail</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

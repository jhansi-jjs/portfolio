'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificatesData, Certificate } from '@/content/certificates';
import { Award, ExternalLink, Eye, Search, X, CheckCircle } from 'lucide-react';

export function Certificates() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('ALL');
  const [activeCertModal, setActiveCertModal] = React.useState<Certificate | null>(null);

  const categories = ['ALL', 'AI/ML', 'Web Development', 'Data Science'];

  const filteredCerts = React.useMemo(() => {
    return certificatesData.filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'ALL' || cert.category.toUpperCase() === selectedCategory.toUpperCase();

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-zinc-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">04. Credentials</div>
          <h2 className="text-3xl font-bold text-zinc-100">Certifications & Training</h2>
          <p className="text-xs text-zinc-400 max-w-xl font-normal">
            Verified specialization certificates in Machine Learning, Deep Learning, and Full Stack Engineering.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates by title, issuer, or skill..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  selectedCategory.toUpperCase() === cat.toUpperCase()
                    ? 'bg-emerald-400 text-zinc-950 font-bold'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 p-6 rounded-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      {cert.category}
                    </span>
                    <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 pt-1">
                      <Award className="w-4 h-4 text-emerald-400" />
                      {cert.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{cert.issueDate}</span>
                </div>

                <div className="text-xs font-mono text-zinc-400">{cert.issuer}</div>

                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-zinc-500">ID: {cert.credentialId}</div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <button
                  onClick={() => setActiveCertModal(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-emerald-400 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certificate Modal Preview */}
      <AnimatePresence>
        {activeCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="font-mono font-bold text-sm text-zinc-100">{activeCertModal.title}</span>
                </div>
                <button
                  onClick={() => setActiveCertModal(null)}
                  className="p-1 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono text-zinc-300">
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Issuer:</span>
                    <span className="text-zinc-200 font-bold">{activeCertModal.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Category:</span>
                    <span className="text-emerald-400">{activeCertModal.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Issued:</span>
                    <span className="text-zinc-300">{activeCertModal.issueDate}</span>
                  </div>
                  {activeCertModal.credentialId && (
                    <div className="flex justify-between border-t border-zinc-900 pt-2">
                      <span className="text-zinc-500">Credential ID:</span>
                      <span className="text-zinc-300">{activeCertModal.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified Credential Record</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveCertModal(null)}
                  className="px-4 py-2 text-xs font-mono text-zinc-950 bg-emerald-400 hover:bg-emerald-300 font-bold rounded-lg transition"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

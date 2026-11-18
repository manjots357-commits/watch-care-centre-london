import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  watchModel: string;
  serviceCompleted: string;
  date: string;
  rating: number;
  content: string;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'James H.',
    location: 'Mayfair, London',
    watchModel: 'Rolex Submariner Date',
    serviceCompleted: 'Timing Regulation & Hyperbaric Reseal',
    date: 'February 2026',
    rating: 5,
    content:
      'Brought my Submariner in after noticing it was losing 15 seconds a day. The team placed it directly on their electronic chronometer, diagnosed an amplitude drop, and regulated it to +1 second/day within 48 hours. Pressure test certificate provided upon collection. First-rate service on Church Street.',
  },
  {
    id: 'rev-2',
    author: 'Alexander M.',
    location: "St John's Wood, London",
    watchModel: 'Patek Philippe Annual Calendar',
    serviceCompleted: 'Full Mechanical Overhaul',
    date: 'January 2026',
    rating: 5,
    content:
      'Finding independent horologists with the touch for Patek grand complications is difficult in Central London. Watch Care Centre handled my annual calendar with exceptional transparency, explaining each step of the disassembly and lubrication. The movement is now ticking silently and smoothly.',
  },
  {
    id: 'rev-3',
    author: 'Tariq K.',
    location: 'Kensington, London',
    watchModel: 'Audemars Piguet Royal Oak Chrono',
    serviceCompleted: 'Laser Casing & Bevel Lapping',
    date: 'December 2025',
    rating: 5,
    content:
      'Had an unfortunate ding on the lower bevel of my Royal Oak case. The lapping wheel refinishing and micro-welding completely erased the damage while preserving the razor-sharp factory chamfer. Remarkable skill.',
  },
  {
    id: 'rev-4',
    author: 'Eleanor S.',
    location: 'Marylebone, London',
    watchModel: 'Cartier Santos de Cartier',
    serviceCompleted: 'Gasket Renewal & Diagnostic Check',
    date: 'November 2025',
    rating: 5,
    content:
      'Honest advice, polite communication, and very fair turnaround time. Dropped off my watch during lunch and received a thorough explanation of its waterproof integrity. So glad to have a trustworthy local workshop in NW8.',
  },
  {
    id: 'rev-5',
    author: 'Marcus V.',
    location: 'Westminster, London',
    watchModel: 'Omega Speedmaster Professional',
    serviceCompleted: 'Calibre Overhaul & Mainspring Renewal',
    date: 'October 2025',
    rating: 5,
    content:
      'Older manual-wind Speedmaster needed attention after sitting in a safe for years. Watch Care Centre stripped it down, replaced the tired mainspring, and returned all worn parts in a sealed container alongside the timing printout. Outstanding craftsmanship.',
  },
];

export default function ReviewsSection() {
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews =
    filter === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) =>
          r.watchModel.toLowerCase().includes(filter.toLowerCase()) ||
          r.serviceCompleted.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <section id="reviews" className="py-20 md:py-28 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#070709] via-[#09090d] to-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.24em] text-[#d4af37] uppercase mb-3">
              <span>05. Client Testimonials</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Verified Service Records</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Customer Feedback
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-300 font-mono">
            <div className="flex items-center text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              ))}
            </div>
            <span>5.0 / 5.0 Rating · Central London Clients</span>
          </div>
        </motion.div>

        {/* Filter Segmented Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'btn-gold font-semibold shadow'
                : 'bg-[#101015] text-zinc-300 hover:text-white border border-white/10 hover:bg-[#181820]'
            }`}
          >
            All Reviews ({REVIEWS.length})
          </button>
          <button
            onClick={() => setFilter('Rolex')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'Rolex'
                ? 'btn-gold font-semibold shadow'
                : 'bg-[#101015] text-zinc-300 hover:text-white border border-white/10 hover:bg-[#181820]'
            }`}
          >
            Rolex
          </button>
          <button
            onClick={() => setFilter('Patek')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'Patek'
                ? 'btn-gold font-semibold shadow'
                : 'bg-[#101015] text-zinc-300 hover:text-white border border-white/10 hover:bg-[#181820]'
            }`}
          >
            Patek Philippe
          </button>
          <button
            onClick={() => setFilter('Overhaul')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'Overhaul'
                ? 'btn-gold font-semibold shadow'
                : 'bg-[#101015] text-zinc-300 hover:text-white border border-white/10 hover:bg-[#181820]'
            }`}
          >
            Mechanical Overhauls
          </button>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-6 rounded-2xl glass-panel-deep border border-white/10 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#d4af37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">{rev.date}</span>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed mb-5">
                  "{rev.content}"
                </p>
              </div>

              {/* Author & Service Meta */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white font-serif">{rev.author}</span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#d4af37]">
                    <CheckCircle className="w-3 h-3 text-[#d4af37]" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="text-xs text-zinc-300 flex items-center gap-1.5">
                  <span>{rev.location}</span>
                  <span aria-hidden="true" className="text-zinc-600">·</span>
                  <span className="text-[#f5eedb] font-medium">{rev.watchModel}</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1">
                  Service: {rev.serviceCompleted}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

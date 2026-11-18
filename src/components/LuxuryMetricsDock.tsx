import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wrench,
  Clock,
  ShieldCheck,
  Award,
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

interface LuxuryMetricsDockProps {
  onSelectService: (serviceName: string) => void;
  onSelectBrand: (brandName: string) => void;
  onOpenDiagnostic: () => void;
}

const STATS = [
  {
    icon: Wrench,
    value: '150+',
    label: 'Restored Monthly',
    sublabel: 'Rolex, Patek & Haute Calibres',
  },
  {
    icon: Award,
    value: '30+ Yrs',
    label: 'Master Bench Experience',
    sublabel: 'Swiss-trained horologists',
  },
  {
    icon: Clock,
    value: '±2s',
    label: 'Daily Chronometer Precision',
    sublabel: 'Multi-position Witschi regulation',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Hyperbaric Pressure Tested',
    sublabel: 'Dual wet & dry chambers to 300M',
  },
];

const POPULAR_SEARCHES = [
  { name: 'Rolex Submariner Overhaul', type: 'service' },
  { name: 'Patek Philippe Calibre', type: 'brand' },
  { name: 'Richard Mille Shock Tuning', type: 'brand' },
  { name: 'Laser Case Lapping', type: 'service' },
  { name: 'Hyperbaric Reseal', type: 'service' },
];

export default function LuxuryMetricsDock({
  onSelectService,
  onSelectBrand,
  onOpenDiagnostic,
}: LuxuryMetricsDockProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickSelect = (name: string, type: 'service' | 'brand') => {
    if (type === 'brand') {
      onSelectBrand(name.split(' ')[0]);
    } else {
      onSelectService(name);
    }
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-16">
      {/* 1. Quick Interactive Finder / Filter Dock (Inspired by 3D Reference Layout) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel-deep rounded-2xl p-2.5 sm:p-3 shadow-2xl mb-6 max-w-4xl mx-auto border border-white/10"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5 px-3 py-2 w-full sm:flex-1 bg-white/[0.03] rounded-xl border border-white/5 text-xs">
            <Search className="w-4 h-4 text-[#d4af37] shrink-0" />
            <input
              type="text"
              placeholder="Search calibre, service or brand (e.g., Rolex overhaul, bezel lapping)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-zinc-100 placeholder:text-zinc-500 focus:outline-none w-full text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {POPULAR_SEARCHES.slice(0, 3).map((item) => (
              <button
                key={item.name}
                onClick={() => handleQuickSelect(item.name, item.type as any)}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap bg-white/[0.04] hover:bg-[#d4af37]/15 text-zinc-300 hover:text-[#f5eedb] border border-white/5 hover:border-[#d4af37]/40 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={onOpenDiagnostic}
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f5eedb] border border-[#d4af37]/50 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>Diagnostic</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Stat Counter Bar (Glossy Frosted 3D Card with 4 Horological Pillars) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex items-center gap-4 ${idx > 0 && idx % 2 === 0 ? 'pt-4 lg:pt-0' : ''} ${
                  idx === 1 || idx === 3 ? 'pt-4 sm:pt-0 pl-2 lg:pl-6' : 'lg:pl-6 first:pl-0'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-[#d4af37]/30 flex items-center justify-center shrink-0 shadow-inner">
                  <Icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-zinc-200">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono hidden sm:block">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

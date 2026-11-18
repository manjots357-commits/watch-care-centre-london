import React from 'react';
import { motion } from 'motion/react';
import Watch3DViewer from './Watch3DViewer.tsx';
import { Compass, Sparkles, ShieldCheck, Gauge, ArrowRight } from 'lucide-react';

interface CalibreStudioProps {
  onBookService: () => void;
  onOpenDiagnostic: () => void;
}

export default function CalibreStudioSection({ onBookService, onOpenDiagnostic }: CalibreStudioProps) {
  return (
    <section id="calibre-studio" className="relative py-20 border-t border-white/10 overflow-hidden scroll-mt-20 bg-gradient-to-b from-[#070709] via-[#0b0b0f] to-[#070709]">
      {/* Subtle warm ambient tungsten/gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#d4af37]/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.24em] text-[#d4af37] uppercase mb-3">
              <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Interactive Calibre Studio</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Haute Horlogerie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Anatomy of Haute Horlogerie.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              Explore the micro-mechanical architecture of high-calibre chronographs. Rotate 360°, inspect the 4Hz oscillating balance wheel, test metallic and titanium restoration finishes, and slide the exploded view to reveal the gear train assembly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDiagnostic}
              className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-zinc-200 bg-[#121216]/85 hover:bg-[#1a1a22] border border-white/10 hover:border-[#d4af37]/50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Calibre Diagnostic</span>
            </button>
            <button
              onClick={onBookService}
              className="btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Overhaul Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* 3D Interactive Workbench Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/10 bg-[#0c0c10]/95 backdrop-blur-xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.85)] relative"
        >
          <Watch3DViewer />
        </motion.div>

        {/* Technical Atelier Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl glass-panel">
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono mb-1">
              <Gauge className="w-4 h-4" />
              <span>Escapement Frequency</span>
            </div>
            <div className="text-lg font-serif font-bold text-white">28,800 vph (4 Hz)</div>
            <div className="text-xs text-zinc-400 mt-1">Multi-position electronic regulation to ±2 sec/day</div>
          </div>

          <div className="p-4 rounded-xl glass-panel">
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Atmospheric Seal</span>
            </div>
            <div className="text-lg font-serif font-bold text-white">100m / 10 ATM</div>
            <div className="text-xs text-zinc-400 mt-1">Vacuum and hydrostatic dual-chamber testing</div>
          </div>

          <div className="p-4 rounded-xl glass-panel">
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Finish Restoration</span>
            </div>
            <div className="text-lg font-serif font-bold text-white">Lapping Machine Precision</div>
            <div className="text-xs text-zinc-400 mt-1">Factory chamfers, mirror bevels & satin grain</div>
          </div>

          <div className="p-4 rounded-xl glass-panel">
            <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono mb-1">
              <Compass className="w-4 h-4" />
              <span>London Atelier</span>
            </div>
            <div className="text-lg font-serif font-bold text-white">Church Street NW8</div>
            <div className="text-xs text-zinc-400 mt-1">Independent master watchmaker bench service</div>
          </div>
        </div>
      </div>
    </section>
  );
}

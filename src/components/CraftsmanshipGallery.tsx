import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye } from 'lucide-react';

interface CraftStage {
  title: string;
  category: string;
  description: string;
  spec: string;
}

const STAGES: CraftStage[] = [
  {
    title: 'Micro-Escapement Assembly',
    category: 'Kinematic Precision',
    description:
      'Handling delicate balance wheels and pallet forks using non-magnetic brass tweezers. Each ruby jewel is inspected under 20x magnification for fracture lines or pitting.',
    spec: 'Tolerance: ±0.002 mm pivot alignment',
  },
  {
    title: 'Epilame & Synthetic Lubrication',
    category: 'Tribology & Friction',
    description:
      'Application of Moebius Swiss synthetic lubricants to pallet jewel impulse faces, escape wheel teeth, and barrel arbor pivots using fine micro-oilers.',
    spec: 'Lubricant Volume: Micro-droplets (0.005 μL)',
  },
  {
    title: 'Multi-Stage Ultrasonic Degreasing',
    category: 'Sterile Cleaning',
    description:
      'De-greasing and cleaning 100+ deconstructed movement components in alternating ultrasonic solvent cycles to eliminate dried oils and micro-debris.',
    spec: '4-Bath Cycle: Cleaning, rinsing, hot air dehydration',
  },
  {
    title: 'Horizontal Lapping Wheel Graining',
    category: 'Aesthetic Restoration',
    description:
      'Restoration of factory-original satin sunburst graining on bezels and razor-sharp chamfered mirror bevels along casing edges without rounding off angles.',
    spec: 'Diamond Paste: 6-micron to 0.5-micron polishing grit',
  },
];

export default function CraftsmanshipGallery() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section id="craftsmanship" className="py-20 md:py-28 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#070709] via-[#09090d] to-[#070709]">
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
              <span>04. Horological Discipline</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Micro-Engineering</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Craftsmanship & Benchwork
            </h2>
          </div>
          <p className="text-zinc-300 text-sm max-w-md font-sans leading-relaxed">
            Every millimeter of a fine mechanical movement demands unflinching concentration, specialized optics, and decades of horological discipline.
          </p>
        </motion.div>

        {/* Hero Visual Card: Watchmaker Bench */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-white/15 mb-12 shadow-2xl group shadow-black/80"
        >
          <div className="aspect-[16/9] max-h-[540px] w-full overflow-hidden">
            <img
              src="/src/assets/images/craftsmanship_watchmaker_bench_1793775498410.jpg"
              alt="Master Watchmaker Assembling Mechanical Escapement under Magnification Loupe"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/95 via-transparent to-transparent pointer-events-none" />

          {/* Overlay Box */}
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-lg p-6 rounded-xl glass-panel-deep border border-white/10 shadow-xl border-t-[#d4af37]/40">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase mb-1">
              <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Atelier Benchwork Protocol · London NW8</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Assembly of High-Beat Balance & Escapement
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Photographed at the Church Street workshop: master watchmaker utilizing precision brass tweezers, ocular loupe, and micro-screwdrivers during high-beat escapement regulation.
            </p>
          </div>
        </motion.div>

        {/* 4 Interactive Craftsmanship Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: idx * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActiveStage(idx)}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between backdrop-blur-md ${
                activeStage === idx
                  ? 'bg-[#14141c]/95 border-[#d4af37] shadow-lg shadow-black/60 ring-1 ring-[#d4af37]/40'
                  : 'bg-[#0e0e12]/80 border-white/10 hover:border-white/20 hover:bg-[#121216]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#d4af37] font-bold">0{idx + 1}.</span>
                  <span className="text-zinc-400">{stage.category}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white mb-2">
                  {stage.title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-4">
                  {stage.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#d4af37]">
                {stage.spec}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

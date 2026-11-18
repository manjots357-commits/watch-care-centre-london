import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wrench,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  Droplets,
  Activity,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  process: string[];
  equipment: string;
  turnaround: string;
  icon: React.ElementType;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'overhaul',
    title: 'Complete Mechanical Overhaul',
    subtitle: 'Comprehensive Tear-Down & Re-Assembly',
    description:
      'Complete disassembly of the movement down to the bare mainplate. Ultrasonic cleansing of 100+ individual gears, pinions, and balance springs, followed by lubrication with multi-viscosity Swiss synthetic oils and multi-day regulation.',
    process: [
      'Complete de-casing and mechanical stripdown to individual components',
      '4-stage ultrasonic cleaning in specialized chemical baths',
      'Inspection of pivots, jewels, and escapement teeth for microscopic wear',
      'Reassembly with 5 distinct grades of Moebius synthetic horological lubricants',
      'Final 72-hour power reserve and multi-position timing verification',
    ],
    equipment: 'Stereoscopic microscope, Bergeon micro-screwdrivers, Elma ultrasonic cleaner',
    turnaround: '7 – 14 Working Days',
    icon: Wrench,
  },
  {
    id: 'timing',
    title: 'Precision Timing & Regulation',
    subtitle: 'Witschi Electronic Chronometry',
    description:
      'Multi-axis acoustic measurement of balance wheel frequency, beat error, and amplitude. Hairspring manipulation and microstella/regulating screw tuning to return timekeeping to chronometer standards.',
    process: [
      'Initial baseline diagnostic on Witschi Chronoscope across 5 positions',
      'Measurement of balance amplitude (target 270°–310°) and beat error (≤0.2ms)',
      'Demagnetization using high-frequency flux neutralization',
      'Adjustment of regulator arm or free-sprung balance inertia weights',
      'Simulated wrist-wear oscillation cycle testing',
    ],
    equipment: 'Witschi Chronoscope X1, Greiner vibrograf, electronic demagnetizer',
    turnaround: '2 – 4 Working Days',
    icon: Activity,
  },
  {
    id: 'polishing',
    title: 'Laser Casing & Bevel Refinishing',
    subtitle: 'Factory Geometry & Satin Graining',
    description:
      'Aesthetic restoration that respects original factory lines. Laser welding fills deep gouges with matching alloy without removing surrounding metal, followed by precision lapping to restore razor-sharp chamfers and satin brushing.',
    process: [
      'Disassembly and isolation of case components, bezel, and caseback',
      'Micro-laser deposition to fill nicks and scratches with parent metal alloy',
      'Horizontal lapping wheel treatment for crisp, undistorted bevel edges',
      'Directional satin graining matching original factory brush texture',
      'Mirror polishing of flanks and final ultrasonic degreasing',
    ],
    equipment: 'Horological lapping machine, Nd:YAG laser welder, diamond paste wheels',
    turnaround: '3 – 7 Working Days',
    icon: Sparkles,
  },
  {
    id: 'waterproof',
    title: 'Water Resistance & Hyperbaric Reseal',
    subtitle: 'Dual-Stage Pressure & Vacuum Verification',
    description:
      'Thorough inspection and renewal of all internal gaskets—caseback, crystal, crown tube, and chronograph pushers. Tested in specialized dry vacuum and wet pressurized chambers up to 300 meters.',
    process: [
      'Removal and microscopic inspection of degraded rubber, silicone, or Teflon seals',
      'Installation of genuine Swiss O-rings coated with Fomblin barrier grease',
      'Air pressure differential and vacuum testing in dry chamber',
      'Submersion hyperbaric wet pressure cycle up to rated bar depth',
      'Condensation testing on heated plate to ensure zero residual moisture',
    ],
    equipment: 'Roxane dry/wet pressure chamber, Bergeon vacuum testing vessel',
    turnaround: '1 – 3 Working Days',
    icon: Droplets,
  },
  {
    id: 'crystal',
    title: 'Sapphire Crystal & Cyclops Replacement',
    subtitle: 'Scratch-Proof Optical Precision',
    description:
      'Replacement of scratched or cracked mineral and sapphire crystals. Fitted with anti-reflective coatings and factory-specification magnification cyclops lenses for optimal date legibility.',
    process: [
      'Careful extraction using specialized die press to protect dial and bezel',
      'De-dusting and removal of microscopic glass fragments inside case',
      'Installation of high-hardness sapphire lens with calibrated I-ring gasket',
      'Precision alignment of date magnifier lens (cyclops)',
      'Immediate water resistance seal confirmation',
    ],
    equipment: 'Bergeon crystal press, UV optical curing lamps, anti-dust laminar flow bench',
    turnaround: '2 – 5 Working Days',
    icon: Shield,
  },
  {
    id: 'bracelet',
    title: 'Bracelet Restoration & Link Tightening',
    subtitle: 'Stretch Removal & Clasp Recalibration',
    description:
      'Restoring stability and comfort to stretched or loose metal bracelets. Pins and friction sleeves are renewed, link play is tightened, and deployment clasps are tension-adjusted for secure fastening.',
    process: [
      'Disassembly of individual links and removal of worn friction pins',
      'Ultrasonic bath extraction of trapped dirt and metallic grime inside links',
      'Installation of oversized hardened stainless steel or gold pins',
      'Tightening of lateral tolerance play between link segments',
      'Refinishing of clasp surfaces and micro-adjustment tuning',
    ],
    equipment: 'Link pin extractor press, ultrasonic bath, micro-honing reamers',
    turnaround: '4 – 8 Working Days',
    icon: Layers,
  },
];

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);

  return (
    <section id="services" className="py-20 md:py-28 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#070709] via-[#09090d] to-[#070709]">
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
              <span>02. Horological Disciplines</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Church Street Atelier</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Luxury Watch Services
            </h2>
          </div>
          <p className="text-zinc-300 text-sm max-w-md font-sans leading-relaxed">
            From complete mechanical overhauls to razor-sharp bevel polishing and hyperbaric pressure testing.
          </p>
        </motion.div>

        {/* Services Grid (6 3D-Glossy Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = selectedService.id === s.id;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setSelectedService(s)}
                className={`p-6 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border backdrop-blur-md ${
                  isSelected
                    ? 'bg-[#14141c]/95 border-[#d4af37] shadow-xl shadow-black/80 ring-1 ring-[#d4af37]/40'
                    : 'bg-[#0e0e12]/80 border-white/10 hover:border-white/20 hover:bg-[#121218]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl border ${
                        isSelected
                          ? 'bg-[#d4af37]/20 text-[#f5eedb] border-[#d4af37]/50 shadow-inner'
                          : 'bg-white/[0.04] text-zinc-300 border-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <span className="text-xs font-mono text-[#d4af37] tabular-nums">
                      {s.turnaround}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-1.5 tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-mono tracking-wider mb-3">
                    {s.subtitle}
                  </p>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-300 hover:text-white flex items-center gap-1 font-medium">
                    <span>Inspect Procedure</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(s.title);
                    }}
                    className="text-[#d4af37] hover:text-[#f5eedb] font-semibold uppercase tracking-wider text-[11px] cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Service Detailed Procedure Drawer / Card */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 md:p-8 rounded-2xl glass-panel-deep border border-white/10 border-t-[#d4af37]/40 relative shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block mb-1">
                  Atelier Procedure Breakdown
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-zinc-400 block font-mono">Estimated Turnaround</span>
                  <span className="text-sm font-semibold text-[#f5eedb]">{selectedService.turnaround}</span>
                </div>
                <button
                  onClick={() => onSelectService(selectedService.title)}
                  className="btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer"
                >
                  Book This Service
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              <div className="lg:col-span-8 space-y-3">
                <h4 className="text-xs font-mono tracking-wider uppercase text-zinc-400 mb-2">
                  Step-by-Step Watchmaker Protocol:
                </h4>
                <div className="space-y-2.5">
                  {selectedService.process.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-zinc-200">
                      <span className="w-5 h-5 rounded-full bg-white/[0.05] text-[#f5eedb] flex items-center justify-center font-mono text-xs shrink-0 border border-[#d4af37]/40">
                        {idx + 1}
                      </span>
                      <span className="font-light leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-5 rounded-xl bg-[#121216] border border-white/10 space-y-4 text-xs">
                <div>
                  <span className="text-[#d4af37] uppercase font-mono tracking-wider block mb-1">
                    Diagnostic Apparatus
                  </span>
                  <span className="text-zinc-300 font-sans leading-relaxed block">
                    {selectedService.equipment}
                  </span>
                </div>
                <div>
                  <span className="text-[#d4af37] uppercase font-mono tracking-wider block mb-1">
                    Quality Standard
                  </span>
                  <span className="text-zinc-300 font-sans leading-relaxed block">
                    100% genuine replacement seals & factory-specified lubricants. Multi-positional verification before handover.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

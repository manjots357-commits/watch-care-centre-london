import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface BrandSpecialtiesProps {
  onSelectBrand: (brandName: string) => void;
}

export default function BrandSpecialtiesSection({ onSelectBrand }: BrandSpecialtiesProps) {
  const [activeTab, setActiveTab] = useState<'rolex' | 'patek' | 'richard-mille'>('rolex');

  return (
    <section id="specialties" className="py-20 md:py-28 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#070709] via-[#09090d] to-[#070709]">
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
              <span>03. Independent Specialisms</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Swiss Haute Horlogerie</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Rolex, Patek Philippe & Richard Mille
            </h2>
          </div>
          <p className="text-zinc-300 text-sm max-w-md font-sans leading-relaxed">
            Specialist independent maintenance, calibration, and case restoration for the world’s three most demanding horological brands.
          </p>
        </motion.div>

        {/* Brand Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 p-1.5 bg-[#101015] rounded-xl border border-white/10 max-w-md mb-8 shadow-lg"
        >
          <button
            onClick={() => setActiveTab('rolex')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
              activeTab === 'rolex'
                ? 'btn-gold shadow-md font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Rolex
          </button>
          <button
            onClick={() => setActiveTab('patek')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
              activeTab === 'patek'
                ? 'btn-gold shadow-md font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Patek Philippe
          </button>
          <button
            onClick={() => setActiveTab('richard-mille')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
              activeTab === 'richard-mille'
                ? 'btn-gold shadow-md font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Richard Mille
          </button>
        </motion.div>

        {/* Tab 1: Rolex Deep Dive */}
        {activeTab === 'rolex' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl glass-panel-deep p-6 md:p-10 border border-white/10 animate-in fade-in duration-300 shadow-2xl border-t-[#d4af37]/40">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block mb-2">
                  Specialist Rolex Calibration & Overhaul
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                  Submariner, Daytona & Oyster Perpetual Care
                </h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                  Rolex movements are celebrated for their unyielding robustness and chronometric precision. Our workshop is equipped to service modern and vintage references, from Calibre 3135 workhorses to modern Calibre 3235 with Chronergy escapements and the Calibre 4130 Daytona chronograph.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Microstella Inertia Regulation:</strong> Direct tuning of rim balance weights for precision timing within superlative chronometer tolerances.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">904L Oystersteel Refinishing:</strong> Precise satin graining on lug tops and mirror-polished case flanks while maintaining original sharp chamfers.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Twinlock & Triplock Waterproof Seals:</strong> Microscopic inspection of tube gaskets and crown seating to ensure absolute waterproof integrity.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Typical Calibres Serviced</span>
                  <span className="text-xs font-mono text-[#d4af37]">3135 · 3235 · 4130 · 3186 · 3285</span>
                </div>
                <button
                  onClick={() => onSelectBrand('Rolex')}
                  className="btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Rolex Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/10 min-h-[340px]">
              <img
                src="/src/assets/images/service_rolex_timepiece_1793775498703.jpg"
                alt="Rolex Luxury Chronometer Timepiece on Dark Slate"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-[#d4af37] font-mono">
                Rolex Chronometer & Sports References · Church Street London
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Patek Philippe Deep Dive */}
        {activeTab === 'patek' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl glass-panel-deep p-6 md:p-10 border border-white/10 animate-in fade-in duration-300 shadow-2xl border-t-[#d4af37]/40">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block mb-2">
                  Haute Horlogerie & Complications
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                  Patek Philippe Mechanical Restoration
                </h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                  Patek Philippe represents the pinnacle of classical Genevan watchmaking. Servicing Calatrava, Nautilus, and complicated calendar calibres demands exceptional touch, preserving hand-bevelled bridge chamfers, mirror-polished screw sinks, and delicate grand feu enamel dials.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Gyromax Free-Sprung Balance:</strong> Fine adjustment of eccentric poising weights without altering active spring length.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Complication Synchronisation:</strong> Precise calendar jumper spring and moon phase gearing calibration.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Conservative Precious Metal Finishing:</strong> Sympathetic cleaning of 18K rose, yellow, white gold, and platinum cases.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Typical Calibres Serviced</span>
                  <span className="text-xs font-mono text-[#d4af37]">240 PS · 324 SC · 330 · CH 28-520 · 315</span>
                </div>
                <button
                  onClick={() => onSelectBrand('Patek Philippe')}
                  className="btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Patek Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/10 min-h-[340px]">
              <img
                src="/src/assets/images/service_patek_timepiece_1793775499941.jpg"
                alt="Patek Philippe Complications Rose Gold Watch"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-[#d4af37] font-mono">
                Patek Philippe Haute Horlogerie Restoration · London
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Richard Mille Deep Dive */}
        {activeTab === 'richard-mille' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl glass-panel-deep p-6 md:p-10 border border-white/10 animate-in fade-in duration-300 shadow-2xl border-t-[#d4af37]/40">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block mb-2">
                  Avant-Garde Architectural Horology
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                  Richard Mille Technical Maintenance
                </h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                  Richard Mille engineered a revolution in materials, utilizing Carbon TPT, Grade 5 Titanium baseplates, and skeletonized bridges designed for extreme G-force resistance. Servicing requires calibrated torque screwdrivers and specialized gasket seating.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Spline Screw Torque Control:</strong> Use of dedicated 4-slot and 5-slot micro-torque keys to avoid casing stress fractures.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Variable-Geometry Rotor Tuning:</strong> Adjusting heavy inertia wings to match individual client activity profiles.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">Triple O-Ring Case Resealing:</strong> Replacement of perimeter Nitrile gaskets on curved tonneau chassis.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">Typical Models Serviced</span>
                  <span className="text-xs font-mono text-[#d4af37]">RM 011 · RM 035 · RM 055 · RM 030 · RM 67</span>
                </div>
                <button
                  onClick={() => onSelectBrand('Richard Mille')}
                  className="btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Richard Mille Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/10 min-h-[340px]">
              <img
                src="/src/assets/images/service_richard_mille_timepiece_1793775499462.jpg"
                alt="Richard Mille Skeletonized Titanium Tonneau Watch"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-[#d4af37] font-mono">
                Richard Mille Skeletonized Chronometers · London Atelier
              </div>
            </div>
          </div>
        )}

        {/* Independent Specialist Legal Disclosure */}
        <div className="mt-8 p-4 rounded-xl bg-[#101015] border border-white/10 flex items-start gap-3 text-xs text-zinc-400">
          <AlertCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-zinc-300">Independent Atelier Disclosure:</strong> Watch Care Centre Ltd is an independent horological workshop and is not an authorized distributor, agent, or representative of Rolex SA, Patek Philippe SA, Richard Mille, or any other mentioned watchmaker. All brand names, model names, and registered trademarks are utilized strictly for descriptive identification, repair compatibility, and informational reference.
          </p>
        </div>
      </div>
    </section>
  );
}

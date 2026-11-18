import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#070709] via-[#09090d] to-[#070709]">
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
              <span>01. Horological Atelier</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">London NW8</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              About Watch Care Centre Ltd
            </h2>
          </div>
          <p className="text-zinc-300 text-sm max-w-md font-sans leading-relaxed">
            Preserving the precision, longevity, and heritage of fine mechanical timepieces in the heart of London.
          </p>
        </motion.div>

        {/* 2-Column Split: Atelier Story & Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Workshop Details & Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-5 text-zinc-300 text-sm md:text-base leading-relaxed font-light">
              <p>
                Established as a dedicated horological restoration workshop in London, <strong className="text-white font-medium">Watch Care Centre Ltd</strong> provides meticulous servicing, restoration, and aesthetic refinishing for premier Swiss mechanical timepieces.
              </p>
              <p>
                Our Church Street facility is equipped with industry-standard Swiss diagnostic timing apparatus, including multi-position Witschi chronoscopes, specialized ultrasonic cleaning lines, and hyperbaric pressure chambers. Every timepiece entrusted to us undergoes complete deconstruction, sympathetic hand cleaning, high-purity synthetic epilame lubrication, and rigorous multi-day timing regulation.
              </p>
              <p>
                Whether servicing a daily-worn Rolex chronometer, a grand complication Patek Philippe, or an avant-garde Richard Mille, our approach prioritizes original factory tolerances, sharp bevel preservation, and transparent client communication.
              </p>
            </div>

            {/* Atelier Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl glass-panel">
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider block mb-1">
                  Diagnostics
                </span>
                <span className="text-base font-serif font-semibold text-white block">
                  Electronic Chronometry
                </span>
                <span className="text-xs text-zinc-400 mt-1 block">
                  Witschi rate, beat error & amplitude calibration
                </span>
              </div>

              <div className="p-4 rounded-xl glass-panel">
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider block mb-1">
                  Water Resistance
                </span>
                <span className="text-base font-serif font-semibold text-white block">
                  Dual-Chamber Testing
                </span>
                <span className="text-xs text-zinc-400 mt-1 block">
                  Pressure & vacuum seal verification up to 300m
                </span>
              </div>
            </div>

            {/* Direct London Address & Communication Bar */}
            <div className="p-4 rounded-xl bg-[#101015]/95 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs shadow-lg">
              <div className="flex items-center gap-2 text-zinc-200">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Shop G105, 13–25 Church Street, London NW8 8DT</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <a
                  href="tel:+447737364429"
                  className="hover:text-[#d4af37] flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>+44 7737 364429</span>
                </a>
                <a
                  href="mailto:wccltd24@hotmail.com"
                  className="hover:text-[#d4af37] flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>wccltd24@hotmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Workshop Atmosphere Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/15 group min-h-[380px] lg:min-h-full shadow-2xl"
          >
            <img
              src="/src/assets/images/workshop_interior_london_1793775502324.jpg"
              alt="Watch Care Centre London Workshop Interior with Master Watchmaker Bench"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            {/* Dark gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/95 via-transparent to-transparent pointer-events-none" />

            {/* Floating Atelier Spec Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel-deep text-xs text-zinc-300 border border-white/10">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-white uppercase tracking-widest text-[10px]">
                  London Atelier Protocol
                </span>
                <span className="font-mono text-[#d4af37] text-[10px]">
                  Church Street · Marylebone
                </span>
              </div>
              <p className="text-zinc-300 font-sans">
                Master watchmakers working under controlled illumination with micro-screwdrivers, loupes, and precision Swiss timing apparati.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

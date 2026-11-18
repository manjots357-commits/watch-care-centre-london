import React from 'react';
import { ArrowRight, Compass, Shield, Clock, MapPin, Play, Pause } from 'lucide-react';

interface HeroSectionProps {
  onBookService: () => void;
  onExploreCalibre?: () => void;
  isVideoPlaying?: boolean;
  onTogglePlayback?: () => void;
}

export default function HeroSection({
  onBookService,
  onExploreCalibre,
  isVideoPlaying = true,
  onTogglePlayback,
}: HeroSectionProps) {
  const scrollToCalibreStudio = () => {
    if (onExploreCalibre) {
      onExploreCalibre();
      return;
    }
    const el = document.getElementById('calibre-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero - Precision Watchmaking at Watch Care Centre Ltd"
      className="relative w-full min-h-[92svh] md:min-h-[100svh] flex flex-col justify-between overflow-hidden"
    >
      {/* Top Spacer to accommodate sticky navbar */}
      <div className="w-full pt-20 sm:pt-24 shrink-0" aria-hidden="true" />

      {/* Hero Core Content (Centered, crisp typography, Swiss luxury contrast) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-8">
        {/* Subtle, unboxed metadata badge in Champagne Gold & Charcoal */}
        <div className="inline-flex items-center justify-center flex-wrap gap-2 text-xs font-mono tracking-[0.24em] text-[#d4af37] uppercase mb-6 px-4 py-1.5 rounded-full bg-[#121216]/85 border border-[#d4af37]/35 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            London Horology Atelier
          </span>
          <span aria-hidden="true" className="text-[#8c6634]">·</span>
          <span>Church Street NW8</span>
          <span aria-hidden="true" className="text-[#8c6634]">·</span>
          <span className="text-zinc-300">Independent Specialists</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] [text-wrap:balance]">
          PRECISION IN EVERY SECOND.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-xl md:text-2xl text-zinc-200 font-sans font-light leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] [text-wrap:balance]">
          Expert Care for the World’s Finest Timepieces.
        </p>

        {/* Action CTAs: Exactly Two Primary Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-10">
          <button
            onClick={onBookService}
            className="btn-gold px-8 py-4 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Enquire for Service</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={scrollToCalibreStudio}
            className="btn-outline-craft px-8 py-4 text-xs sm:text-sm font-mono tracking-wider uppercase rounded-xl transition-all flex items-center gap-2.5 cursor-pointer shadow-lg"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Explore Our Craft</span>
          </button>
        </div>

        {/* Fast Credentials Bar in Swiss Atelier Style */}
        <div className="inline-flex items-center justify-center flex-wrap gap-4 sm:gap-8 text-xs font-mono text-zinc-300 pt-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            ±2 sec/day Swiss Regulation
          </span>
          <span aria-hidden="true" className="text-zinc-600 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            Hyperbaric Pressure Tested
          </span>
          <span aria-hidden="true" className="text-zinc-600 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            Church Street NW8 Walk-in
          </span>
        </div>
      </div>

      {/* Bottom Control & Status Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-7 flex items-center justify-between text-xs font-mono text-zinc-300">
        {/* Left: Video Playback & Status */}
        <div className="flex items-center gap-3">
          {onTogglePlayback && (
            <button
              onClick={onTogglePlayback}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121216]/85 hover:bg-[#1a1a22] border border-white/10 backdrop-blur-md text-zinc-200 hover:text-white transition-colors cursor-pointer"
              aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
            >
              {isVideoPlaying ? <Pause className="w-3.5 h-3.5 text-[#d4af37]" /> : <Play className="w-3.5 h-3.5 text-[#d4af37]" />}
              <span className="hidden sm:inline">{isVideoPlaying ? 'Pause Cinematic' : 'Play Cinematic'}</span>
            </button>
          )}
          <span className="text-[11px] text-zinc-400 hidden md:inline">
            Rolex Daytona Chronograph · Full Background
          </span>
        </div>

        {/* Right: Scroll Invitation */}
        <button
          onClick={scrollToCalibreStudio}
          className="flex items-center gap-2 hover:text-[#d4af37] transition-colors cursor-pointer text-zinc-400 group"
        >
          <span className="tracking-wider uppercase text-[11px]">Explore 3D Calibre</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#d4af37]" />
        </button>
      </div>
    </section>
  );
}

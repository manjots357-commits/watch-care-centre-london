import React, { useState } from 'react';
import { Menu, X, Sparkles, Film } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
  onOpenCinema?: () => void;
}

export default function Navbar({ onOpenBooking, onOpenDiagnostic, onOpenCinema }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070709]/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark in Swiss Luxury Typography */}
        <a
          href="#"
          className="text-lg md:text-xl font-serif font-bold tracking-wider text-white hover:text-[#f5eedb] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-gradient-gold font-bold">WATCH CARE CENTRE</span>
          <span className="text-xs font-mono tracking-widest font-normal text-[#d4af37] hidden sm:inline px-2 py-0.5 rounded bg-white/[0.04] border border-[#d4af37]/30">
            LONDON NW8
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium tracking-wider text-zinc-300 uppercase"
        >
          <a
            href="#calibre-studio"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            3D Calibre
          </a>
          <a
            href="#atelier-film"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 text-zinc-300 hover:text-[#f5eedb]"
          >
            <Film className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Workshop Film</span>
          </a>
          <a
            href="#about"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Atelier
          </a>
          <a
            href="#services"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Services
          </a>
          <a
            href="#specialties"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Brands
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Craftsmanship
          </a>
          <a
            href="#reviews"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: CTAs in Restrained Luxury */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDiagnostic}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider text-zinc-200 hover:text-white bg-[#121216]/90 hover:bg-[#1a1a22] rounded-lg border border-white/10 hover:border-[#d4af37]/50 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span className="text-[#f5eedb]">Diagnostic</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="btn-gold px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all font-sans whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Service
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#f5eedb]" /> : <Menu className="w-6 h-6 text-zinc-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-sm animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-3 font-medium tracking-wide uppercase text-zinc-300 text-xs">
            <a
              href="#calibre-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-[#d4af37]"
            >
              3D Calibre Studio
            </a>
            <a
              href="#atelier-film"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 text-zinc-300 flex items-center gap-2"
            >
              <Film className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Workshop Cinema Reel</span>
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-[#d4af37]"
            >
              Atelier Workshop
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-[#d4af37]"
            >
              Services & Overhauls
            </a>
            <a
              href="#specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-[#d4af37]"
            >
              Rolex · Patek Philippe · Richard Mille
            </a>
            <a
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-[#d4af37]"
            >
              Craftsmanship
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/5 hover:text-[#d4af37]"
            >
              Client Feedback
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37]"
            >
              Contact & Location
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnostic();
              }}
              className="w-full py-2.5 text-xs font-mono uppercase tracking-wider text-zinc-200 bg-[#121216] rounded-lg border border-white/10 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Timepiece Diagnostic</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider btn-gold rounded-lg shadow-md"
            >
              Book Service
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

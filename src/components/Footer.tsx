import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] backdrop-blur-md border-t border-white/10 pt-16 pb-12 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Atelier */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif font-bold text-gradient-gold tracking-wider">
                WATCH CARE CENTRE
              </span>
              <span className="text-[10px] font-mono text-[#d4af37] border border-[#d4af37]/40 bg-white/[0.04] px-2 py-0.5 rounded">
                LONDON NW8
              </span>
            </div>

            <p className="text-zinc-300 font-light leading-relaxed max-w-sm">
              Independent master horological workshop delivering Swiss-standard mechanical overhauls, precision escapement regulation, laser casing refinishing, and pressure resealing.
            </p>

            <div className="space-y-1.5 text-zinc-300 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Shop G105, 13–25 Church Street, London NW8 8DT</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="tel:+447737364429" className="hover:text-[#d4af37] transition-colors">
                  +44 7737 364429
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="mailto:wccltd24@hotmail.com" className="hover:text-[#d4af37] transition-colors">
                  wccltd24@hotmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-semibold block">
              Horological Services
            </span>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Complete Mechanical Overhaul
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Witschi Electronic Regulation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Laser Bevel Refinishing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Water Resistance Resealing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Sapphire Crystal Fitting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Bracelet Tightening & Restretch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Independent Specialisms */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-semibold block">
              Specialist Focus & Links
            </span>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="#specialties" className="hover:text-[#d4af37] transition-colors">
                  Rolex Submariner, Daytona & Oyster Calibres
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-[#d4af37] transition-colors">
                  Patek Philippe Complications & Calatrava
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-[#d4af37] transition-colors">
                  Richard Mille Skeletonized Chronometers
                </a>
              </li>
              <li>
                <a href="#atelier-film" className="hover:text-[#d4af37] transition-colors">
                  Workshop Cinema Reel
                </a>
              </li>
              <li>
                <a
                  href="https://watchcarecentreltd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4af37] hover:text-[#f5eedb] flex items-center gap-1 transition-colors"
                >
                  <span>Current Client Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-zinc-400 font-mono">
              Workshop Schedule: Mon–Sat 10:00 – 18:00
              <br />
              Sunday: By Private Consultation Only
            </div>
          </div>
        </div>

        {/* Legal & Trademark Disclosure */}
        <div className="pt-8 pb-4 text-[11px] text-zinc-400 leading-relaxed space-y-2 border-b border-white/10">
          <p>
            <strong className="text-zinc-200">Redesign Concept Notice:</strong> This digital experience is an ultra-premium website redesign concept created for Watch Care Centre Ltd, London. It is presented for concept evaluation and design review.
          </p>
          <p>
            <strong className="text-zinc-200">Trademark Disclaimer:</strong> Watch Care Centre Ltd is an independent watch service and repair facility. We are not an authorized agent, distributor, or representative of Rolex Watch U.S.A., Inc., Rolex SA, Patek Philippe SA, Richard Mille, Audemars Piguet, Omega SA, Cartier, or any other trademark owner. All brand marks, trade names, and models remain the property of their respective trademark holders and are utilized solely for descriptive identification and repair compatibility.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} Watch Care Centre Ltd. Registered in England & Wales. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-[#d4af37] transition-colors cursor-pointer"
            aria-label="Scroll back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#d4af37]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

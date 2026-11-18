import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, X } from 'lucide-react';

export default function ConceptBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Design Concept Notice"
      className="bg-gradient-to-r from-[#070709] via-[#101015] to-[#070709] border-b border-white/10 px-4 py-2 text-xs text-zinc-300 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
          <p className="truncate">
            <span className="font-semibold text-white tracking-wider">REDESIGN CONCEPT</span>
            <span className="text-zinc-400"> — Crafted for </span>
            <span className="font-medium text-white">Watch Care Centre Ltd, London</span>
            <span className="text-zinc-500 hidden sm:inline"> (Shop G105, 13–25 Church St, NW8 8DT)</span>
            <span className="text-[#d4af37] hidden md:inline"> · Swiss Haute Horlogerie Edition</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://watchcarecentreltd.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-400 hover:text-[#d4af37] transition-colors whitespace-nowrap"
          >
            <span>Existing Site</span>
            <ExternalLink className="w-3 h-3 text-[#d4af37]" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

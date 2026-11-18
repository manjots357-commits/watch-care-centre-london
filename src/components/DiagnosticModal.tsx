import React, { useState } from 'react';
import { X, Wrench, Clock, Droplets, Activity, Sparkles } from 'lucide-react';

interface DiagnosticIssue {
  id: string;
  title: string;
  icon: React.ElementType;
  urgency: 'low' | 'moderate' | 'critical';
  diagnosis: string;
  recommendedService: string;
  turnaround: string;
}

const ISSUES: DiagnosticIssue[] = [
  {
    id: 'accuracy',
    title: 'Running noticeably fast or slow (±20s/day)',
    icon: Activity,
    urgency: 'moderate',
    diagnosis:
      'Likely hairspring magnetization from laptops/phones or degraded escapement lubrication causing low balance amplitude.',
    recommendedService: 'Precision Timing & Escapement Regulation',
    turnaround: '2 – 4 Working Days',
  },
  {
    id: 'moisture',
    title: 'Condensation or mist under the glass',
    icon: Droplets,
    urgency: 'critical',
    diagnosis:
      'Gasket breakdown or unthreaded crown. Steel movement components risk rapid rust oxidation within 48 hours without immediate intervention.',
    recommendedService: 'Emergency Dehydration & Waterproof Reseal',
    turnaround: 'Immediate Priority (1 – 2 Days)',
  },
  {
    id: 'stopped',
    title: 'Watch stopped completely / won’t wind',
    icon: Clock,
    urgency: 'moderate',
    diagnosis:
      'Fractured mainspring within the barrel, broken balance staff pivot, or mechanical gear train obstruction.',
    recommendedService: 'Complete Mechanical Overhaul',
    turnaround: '7 – 14 Working Days',
  },
  {
    id: 'rattling',
    title: 'Rattling or grinding noise when moved',
    icon: Wrench,
    urgency: 'moderate',
    diagnosis:
      'Worn automatic rotor axle bearings or detached casing movement clamp allowing internal motion.',
    recommendedService: 'Rotor Assembly Service & Clamp Tightening',
    turnaround: '3 – 5 Working Days',
  },
  {
    id: 'cosmetic',
    title: 'Scratched crystal, dented casing, or dull finish',
    icon: Sparkles,
    urgency: 'low',
    diagnosis:
      'Superficial impact damage. Deep nicks can be laser-welded with parent alloy and bevels restored on a lapping wheel.',
    recommendedService: 'Laser Casing & Bevel Refinishing',
    turnaround: '3 – 7 Working Days',
  },
];

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export default function DiagnosticModal({ isOpen, onClose, onSelectService }: DiagnosticModalProps) {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(ISSUES[0].id);

  if (!isOpen) return null;

  const current = ISSUES.find((i) => i.id === selectedIssueId) || ISSUES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Timepiece Diagnostic Assistant"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#0e0e12] border border-white/10 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto border-t-[#d4af37]/40">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/[0.04] text-[#d4af37] border border-white/10">
              <Wrench className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                Timepiece Diagnostic Guide
              </h3>
              <p className="text-xs text-zinc-300">
                Identify mechanical symptoms & recommended workshop protocols
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close diagnostic guide"
          >
            <X className="w-5 h-5 text-zinc-300" />
          </button>
        </div>

        {/* Symptoms List */}
        <div className="my-6 space-y-2.5">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block mb-2">
            Select Your Watch’s Primary Symptom:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ISSUES.map((issue) => {
              const Icon = issue.icon;
              const isSelected = issue.id === selectedIssueId;
              return (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#181820] border-[#d4af37] shadow-md ring-1 ring-[#d4af37]/40'
                      : 'bg-[#121216] border-white/10 hover:border-white/20 hover:bg-[#16161c]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isSelected ? 'text-[#f5eedb]' : 'text-[#d4af37]'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {issue.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider block mt-1 ${
                        issue.urgency === 'critical'
                          ? 'text-rose-400 font-bold'
                          : issue.urgency === 'moderate'
                          ? 'text-[#d4af37]'
                          : 'text-zinc-400'
                      }`}
                    >
                      Priority: {issue.urgency}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagnosis Outcome Card */}
        <div className="p-5 rounded-xl bg-[#121216] border border-white/10 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#d4af37] uppercase tracking-widest text-[11px]">
              Horological Assessment
            </span>
            <span className="font-mono text-zinc-400 text-[11px]">
              Turnaround: {current.turnaround}
            </span>
          </div>

          <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
            {current.diagnosis}
          </p>

          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-zinc-400 block text-[11px] font-mono">Recommended Service:</span>
              <strong className="text-[#f5eedb] font-medium">{current.recommendedService}</strong>
            </div>

            <button
              onClick={() => {
                onSelectService(current.recommendedService);
                onClose();
              }}
              className="btn-gold px-4 py-2 font-semibold text-xs whitespace-nowrap transition-all rounded-lg shadow uppercase tracking-wider cursor-pointer"
            >
              Enquire for this Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

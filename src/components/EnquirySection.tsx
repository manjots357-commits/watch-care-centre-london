import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  validateEnquiry,
  estimateServiceLeadTime,
  formatWhatsAppBookingUrl,
  generateReferenceNumber,
  EnquiryInput,
} from '../utils/enquiry.ts';

interface EnquirySectionProps {
  prefilledService?: string;
  prefilledBrand?: string;
}

export default function EnquirySection({ prefilledService, prefilledBrand }: EnquirySectionProps) {
  const [formData, setFormData] = useState<EnquiryInput>({
    fullName: '',
    email: '',
    phone: '',
    watchBrand: prefilledBrand || 'Rolex',
    modelReference: '',
    serviceType: prefilledService || 'Complete Mechanical Overhaul',
    urgency: 'standard',
    preferredDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceType: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledBrand) {
      setFormData((prev) => ({ ...prev, watchBrand: prefilledBrand }));
    }
  }, [prefilledBrand]);

  const estimate = estimateServiceLeadTime(formData.watchBrand, formData.serviceType);
  const whatsappUrl = formatWhatsAppBookingUrl('+44 7737 364429', formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiry(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const refCode = generateReferenceNumber();
    setSubmittedRef(refCode);
  };

  const copyRefCode = () => {
    if (!submittedRef) return;
    navigator.clipboard.writeText(submittedRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/10 relative scroll-mt-20 bg-gradient-to-b from-[#070709] via-[#09090d] to-[#070709]">
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
              <span>06. Atelier Consultation</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Appointments & Estimates</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Contact & Service Enquiry
            </h2>
          </div>
          <p className="text-zinc-300 text-sm max-w-md font-sans leading-relaxed">
            Schedule an appointment at our Church Street workshop or request an initial assessment for your timepiece.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Location Details */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Church Street Location Box */}
              <div className="p-6 rounded-2xl glass-panel-deep border border-white/10 space-y-4 shadow-xl border-t-[#d4af37]/40">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-white/[0.04] text-[#d4af37] border border-white/10 shrink-0">
                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider block mb-0.5">
                      London Workshop
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white mb-1">
                      Watch Care Centre Ltd
                    </h3>
                    <address className="not-italic text-sm text-zinc-300 leading-relaxed font-sans">
                      Shop G105, 13–25 Church Street
                      <br />
                      London NW8 8DT, United Kingdom
                    </address>
                    <p className="text-xs text-zinc-400 mt-2 font-mono">
                      Nearest Stations: Marylebone · Edgware Road · Baker Street
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-start gap-3 text-xs text-zinc-300">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Opening Hours</span>
                    <span>Monday – Saturday: 10:00 – 18:00</span>
                    <br />
                    <span>Sunday: By Prior Appointment Only</span>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Telephone */}
                <a
                  href="tel:+447737364429"
                  className="p-4 rounded-xl hover:border-[#d4af37]/50 transition-all flex items-center gap-3 group bg-[#0e0e12] border border-white/10 shadow-md"
                >
                  <div className="p-2 rounded-lg bg-white/[0.05] text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-zinc-950 transition-colors shrink-0">
                    <Phone className="w-4 h-4 text-[#d4af37] group-hover:text-zinc-950" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase block">
                      Telephone
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      +44 7737 364429
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:wccltd24@hotmail.com"
                  className="p-4 rounded-xl hover:border-[#d4af37]/50 transition-all flex items-center gap-3 group bg-[#0e0e12] border border-white/10 shadow-md"
                >
                  <div className="p-2 rounded-lg bg-white/[0.05] text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-zinc-950 transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-[#d4af37] group-hover:text-zinc-950" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase block">
                      Email Atelier
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      wccltd24@hotmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Valid WhatsApp Direct Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 via-emerald-900/30 to-zinc-900 border border-emerald-500/30 hover:border-emerald-400 text-emerald-200 transition-all flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                      Instant WhatsApp Enquiry
                    </span>
                    <span className="text-xs text-zinc-300">
                      Chat directly with our Church Street watchmakers
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>

            {/* Turnaround Lead Time Estimation Card */}
            <div className="p-5 rounded-xl bg-[#0e0e12] border border-white/10 text-xs text-zinc-300 space-y-2 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-zinc-400 uppercase text-[11px]">
                  Estimated Workshop Window
                </span>
                <span className="font-mono font-semibold text-[#d4af37]">
                  {estimate.estimatedDays.min} – {estimate.estimatedDays.max} Days
                </span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Based on <strong className="text-white">{formData.watchBrand}</strong> ({estimate.complexityTier.toUpperCase()}). Every piece undergoes full timing regulation before release.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Appointment & Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {submittedRef ? (
              <div className="p-8 rounded-2xl glass-panel-deep border border-emerald-500/30 text-center space-y-6 animate-in zoom-in-95 duration-300 shadow-2xl">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                    Enquiry Registered Successfully
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    Thank You, {formData.fullName}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
                    Our master horologist on Church Street will review your {formData.watchBrand} request and respond within 24 hours.
                  </p>
                </div>

                {/* Reference Code Box */}
                <div className="p-4 rounded-xl bg-[#0e0e12] border border-white/10 max-w-sm mx-auto flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-zinc-400 block">Atelier Job Ref:</span>
                    <span className="text-base font-mono font-bold text-[#d4af37] tracking-wider">
                      {submittedRef}
                    </span>
                  </div>
                  <button
                    onClick={copyRefCode}
                    className="p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Copy reference code"
                  >
                    <Copy className="w-4 h-4 text-[#d4af37]" />
                    <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        watchBrand: 'Rolex',
                        modelReference: '',
                        serviceType: 'Complete Mechanical Overhaul',
                        urgency: 'standard',
                        preferredDate: '',
                        notes: '',
                      });
                    }}
                    className="px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/5 rounded-lg border border-white/10 uppercase tracking-wider cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl glass-panel-deep border border-white/10 space-y-5 shadow-2xl border-t-[#d4af37]/40"
                noValidate
              >
                <div className="border-b border-white/10 pb-4 mb-2">
                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    Timepiece Assessment Form
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans">
                    Complete the details below to receive a workshop evaluation and appointment confirmation.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Sterling / Dr. Watson"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 7737 364429"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@example.co.uk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-400 mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Brand & Model Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                      Watch Brand *
                    </label>
                    <select
                      value={formData.watchBrand}
                      onChange={(e) => setFormData({ ...formData, watchBrand: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="Rolex">Rolex</option>
                      <option value="Patek Philippe">Patek Philippe</option>
                      <option value="Richard Mille">Richard Mille</option>
                      <option value="Audemars Piguet">Audemars Piguet</option>
                      <option value="Omega">Omega</option>
                      <option value="Cartier">Cartier</option>
                      <option value="Breitling">Breitling</option>
                      <option value="IWC Schaffhausen">IWC Schaffhausen</option>
                      <option value="Other Swiss Luxury">Other Swiss Luxury Brand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                      Model / Reference (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Submariner 126610LN or RM 011"
                      value={formData.modelReference}
                      onChange={(e) => setFormData({ ...formData, modelReference: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>
                </div>

                {/* Service Type & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="Complete Mechanical Overhaul">Complete Mechanical Overhaul</option>
                      <option value="Precision Timing & Regulation">Precision Timing & Regulation</option>
                      <option value="Laser Casing & Bevel Refinishing">Laser Casing & Bevel Refinishing</option>
                      <option value="Water Resistance & Hyperbaric Reseal">Water Resistance & Hyperbaric Reseal</option>
                      <option value="Sapphire Crystal Replacement">Sapphire Crystal Replacement</option>
                      <option value="Bracelet Restoration & Link Tightening">Bracelet Restoration & Link Tightening</option>
                      <option value="General Inspection & Diagnostic">General Inspection & Diagnostic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                      Preferred Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>
                </div>

                {/* Notes / Special Instructions */}
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                    Timepiece Symptoms / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any particular issues: time loss, condensation, winding resistance, or damage history..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#101015] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>

                {/* Submit Button in 18K Champagne Gold */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-wider btn-gold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Service Request</span>
                  </button>
                  <p className="text-[11px] text-zinc-400 text-center mt-2.5 font-mono">
                    Direct enquiry routed to Watch Care Centre Ltd, London NW8. No obligation.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

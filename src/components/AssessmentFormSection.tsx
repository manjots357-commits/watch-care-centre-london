import React, { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import {
  ATELIER_INFO,
  FORM_WATCH_BRANDS,
  HOROLOGICAL_SERVICES,
} from '../data/watchCareData';

interface AssessmentFormSectionProps {
  selectedBrand: string;
  selectedService: string;
  prefilledNotes: string;
}

interface SubmittedEnquiry {
  refCode: string;
  fullName: string;
  phone: string;
  email: string;
  brand: string;
  modelRef: string;
  service: string;
  preferredDate: string;
  notes: string;
}

export const AssessmentFormSection: React.FC<AssessmentFormSectionProps> = ({
  selectedBrand,
  selectedService,
  prefilledNotes,
}) => {
  const uid = useId();
  const formRef = useRef<HTMLFormElement | null>(null);
  const dirtyMapRef = useRef<WeakMap<Element, { interacted: boolean; blurred: boolean }>>(
    new WeakMap()
  );

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [watchBrand, setWatchBrand] = useState(selectedBrand || 'Rolex');
  const [modelRef, setModelRef] = useState('');
  const [serviceRequired, setServiceRequired] = useState(
    selectedService || HOROLOGICAL_SERVICES[0].title
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState<SubmittedEnquiry | null>(null);

  useEffect(() => {
    if (selectedBrand) setWatchBrand(selectedBrand);
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedService) setServiceRequired(selectedService);
  }, [selectedService]);

  useEffect(() => {
    if (prefilledNotes) {
      setNotes((prev) => (prev ? prev : prefilledNotes));
    }
  }, [prefilledNotes]);

  const syncControlAria = (
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    forceValidate = false
  ) => {
    const supportsUserInvalid =
      typeof CSS !== 'undefined' && CSS.supports?.('selector(:user-invalid)');
    const valid = el.checkValidity();

    if (supportsUserInvalid && !forceValidate) {
      const matchesInvalid = el.matches(':user-invalid');
      if (matchesInvalid) {
        el.setAttribute('aria-invalid', 'true');
      } else {
        el.removeAttribute('aria-invalid');
      }
      return;
    }

    el.classList.toggle('user-invalid-fallback', !valid);
    el.classList.toggle('user-valid-fallback', valid);
    if (!valid) {
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.removeAttribute('aria-invalid');
    }
  };

  const handleControlBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const el = e.currentTarget;
    const state = dirtyMapRef.current.get(el) ?? { interacted: false, blurred: false };
    state.blurred = true;
    dirtyMapRef.current.set(el, state);
    if (state.interacted) {
      syncControlAria(el, true);
    } else {
      syncControlAria(el, false);
    }
  };

  const handleControlInput = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const el = e.currentTarget;
    const state = dirtyMapRef.current.get(el) ?? { interacted: false, blurred: false };
    state.interacted = true;
    dirtyMapRef.current.set(el, state);
    if (el.hasAttribute('aria-invalid') || state.blurred) {
      syncControlAria(el, true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const controls = Array.from(form.elements).filter(
      (c): c is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
        c instanceof HTMLInputElement ||
        c instanceof HTMLSelectElement ||
        c instanceof HTMLTextAreaElement
    );

    if (!form.checkValidity()) {
      controls.forEach((ctrl) => syncControlAria(ctrl, true));
      const firstInvalid = controls.find((ctrl) => !ctrl.checkValidity());
      firstInvalid?.focus();
      return;
    }

    const code = `WCC-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmitted({
      refCode: code,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      brand: watchBrand,
      modelRef: modelRef.trim() || 'Not specified',
      service: serviceRequired,
      preferredDate: preferredDate || 'Flexible / Earliest Bench Slot',
      notes: notes.trim() || 'Standard bench inspection requested.',
    });
  };

  const resetForAnother = () => {
    setSubmitted(null);
    setModelRef('');
    setNotes('');
  };

  const nameId = `${uid}-fullname`;
  const phoneId = `${uid}-phone`;
  const phoneHintId = `${uid}-phone-hint`;
  const emailId = `${uid}-email`;
  const emailHintId = `${uid}-email-hint`;
  const brandId = `${uid}-brand`;
  const modelId = `${uid}-model`;
  const serviceId = `${uid}-service`;
  const dateId = `${uid}-date`;
  const notesId = `${uid}-notes`;

  return (
    <section id="contact" className="cosmic-section contact-enquiry-section">
      <div className="container-cosmic">
        <div className="section-header-split" data-reveal>
          <div>
            <span className="cosmic-eyebrow">
              <span>06. ATELIER CONSULTATION · APPOINTMENTS &amp; ESTIMATES</span>
            </span>
            <h2 className="cosmic-h2">Contact &amp; Service Enquiry</h2>
          </div>
          <p className="cosmic-lead">
            Schedule an appointment at our Hatton Garden workshop or request an initial assessment
            for your timepiece.
          </p>
        </div>

        <div className="contact-consultation-grid">
          {/* Left Column: London Workshop Card + Direct Channels + WhatsApp */}
          <div className="contact-left-stack" data-reveal>
            <div className="workshop-address-card mirror-glass-card">
              <div className="workshop-card-top">
                <div className="workshop-pin-box" aria-hidden="true">
                  <MapPin size={20} className="text-violet-glow" />
                </div>
                <div>
                  <span className="cosmic-mono-tag">LONDON WORKSHOP</span>
                  <h3 className="workshop-entity-name">{ATELIER_INFO.name}</h3>
                  <address className="workshop-address-lines">
                    {ATELIER_INFO.addressLine1}
                    <br />
                    {ATELIER_INFO.addressLine2}
                  </address>
                  <p className="workshop-stations-line">{ATELIER_INFO.nearestStations}</p>
                </div>
              </div>

              <div className="workshop-hours-block">
                <Clock size={16} className="text-violet-glow" aria-hidden="true" />
                <div>
                  <strong>Opening Hours</strong>
                  <p>{ATELIER_INFO.hoursWeekday}</p>
                  <p>{ATELIER_INFO.hoursSunday}</p>
                </div>
              </div>
            </div>

            <div className="contact-direct-pair">
              <a href={ATELIER_INFO.phoneHref} className="contact-mini-card mirror-glass-card">
                <div className="mini-icon-box" aria-hidden="true">
                  <Phone size={17} className="text-violet-glow" />
                </div>
                <div>
                  <span className="mini-card-label">TELEPHONE</span>
                  <strong>{ATELIER_INFO.phoneDisplay}</strong>
                </div>
              </a>

              <a href={ATELIER_INFO.emailHref} className="contact-mini-card mirror-glass-card">
                <div className="mini-icon-box" aria-hidden="true">
                  <Mail size={17} className="text-violet-glow" />
                </div>
                <div>
                  <span className="mini-card-label">EMAIL ATELIER</span>
                  <strong>{ATELIER_INFO.email}</strong>
                </div>
              </a>
            </div>

            <a
              href={ATELIER_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-instant-card mirror-glass-card"
            >
              <div className="whatsapp-icon-box" aria-hidden="true">
                <MessageSquare size={19} />
              </div>
              <div className="whatsapp-copy">
                <span>INSTANT WHATSAPP ENQUIRY</span>
                <p>Chat directly with our Hatton Garden watchmakers</p>
              </div>
              <ExternalLink size={16} className="whatsapp-ext" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Timepiece Assessment Form */}
          <div className="assessment-form-card mirror-glass-card" data-reveal>
            <div className="assessment-form-header">
              <h3>Timepiece Assessment Form</h3>
              <p>
                Complete the details below to receive a workshop evaluation and appointment
                confirmation.
              </p>
            </div>

            {submitted ? (
              <div className="assessment-success-box" role="status" aria-live="polite">
                <div className="success-head">
                  <CheckCircle2 size={24} className="text-emerald-glow" aria-hidden="true" />
                  <div>
                    <span className="cosmic-mono-tag">DOSSIER LOGGED · {submitted.refCode}</span>
                    <h4>Workshop Assessment Request Prepared</h4>
                  </div>
                </div>

                <dl className="success-summary-dl">
                  <div>
                    <dt>Client</dt>
                    <dd>{submitted.fullName}</dd>
                  </div>
                  <div>
                    <dt>Timepiece</dt>
                    <dd>
                      {submitted.brand} ({submitted.modelRef})
                    </dd>
                  </div>
                  <div>
                    <dt>Requested Discipline</dt>
                    <dd>{submitted.service}</dd>
                  </div>
                  <div>
                    <dt>Preferred Date</dt>
                    <dd>{submitted.preferredDate}</dd>
                  </div>
                </dl>

                <div className="success-actions-row">
                  <a
                    href={`mailto:${ATELIER_INFO.email}?subject=${encodeURIComponent(
                      `[${submitted.refCode}] ${submitted.brand} — ${submitted.service}`
                    )}&body=${encodeURIComponent(
                      `Name: ${submitted.fullName}\nPhone: ${submitted.phone}\nEmail: ${submitted.email}\nWatch Brand: ${submitted.brand}\nModel/Ref: ${submitted.modelRef}\nService: ${submitted.service}\nPreferred Date: ${submitted.preferredDate}\nSymptoms/Notes: ${submitted.notes}`
                    )}`}
                    className="btn-cosmic-primary"
                  >
                    <span>Dispatch via Email Client</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>

                  <button type="button" className="btn-cosmic-ghost" onClick={resetForAnother}>
                    Submit Another Timepiece
                  </button>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                action={ATELIER_INFO.emailHref}
                method="POST"
                noValidate
                onSubmit={handleSubmit}
                className="cosmic-assessment-form"
              >
                <div className="form-row-two">
                  <div className="cosmic-field">
                    <label htmlFor={nameId}>FULL NAME *</label>
                    <input
                      id={nameId}
                      name="full_name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      placeholder="e.g. Lord Sterling / Dr. Watson"
                      value={fullName}
                      onBlur={handleControlBlur}
                      onInput={handleControlInput}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <span className="field-error-msg" role="alert">
                      Please enter your full name (at least 2 characters).
                    </span>
                  </div>

                  <div className="cosmic-field">
                    <label htmlFor={phoneId}>PHONE NUMBER *</label>
                    <span id={phoneHintId} className="field-hint-above">
                      UK or international number for bench updates
                    </span>
                    <input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="[0-9+\-\s()]{7,22}"
                      aria-describedby={phoneHintId}
                      placeholder="e.g. 020 7242 9998"
                      value={phone}
                      onBlur={handleControlBlur}
                      onInput={handleControlInput}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <span className="field-error-msg" role="alert">
                      Please enter a valid contact telephone number.
                    </span>
                  </div>
                </div>

                <div className="cosmic-field">
                  <label htmlFor={emailId}>EMAIL ADDRESS *</label>
                  <span id={emailHintId} className="field-hint-above">
                    Format: client@example.co.uk (used for written quotation)
                  </span>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    aria-describedby={emailHintId}
                    placeholder="e.g. client@example.co.uk"
                    value={email}
                    onBlur={handleControlBlur}
                    onInput={handleControlInput}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="field-error-msg" role="alert">
                    Please enter a valid email address.
                  </span>
                </div>

                <div className="form-row-two">
                  <div className="cosmic-field">
                    <label htmlFor={brandId}>WATCH BRAND *</label>
                    <select
                      id={brandId}
                      name="watch_brand"
                      required
                      value={watchBrand}
                      onBlur={handleControlBlur}
                      onChange={(e) => setWatchBrand(e.target.value)}
                    >
                      {FORM_WATCH_BRANDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cosmic-field">
                    <label htmlFor={modelId}>MODEL / REFERENCE (OPTIONAL)</label>
                    <input
                      id={modelId}
                      name="model_reference"
                      type="text"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="e.g. Submariner 126610LN or RM 011"
                      value={modelRef}
                      onChange={(e) => setModelRef(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="cosmic-field">
                    <label htmlFor={serviceId}>SERVICE REQUIRED *</label>
                    <select
                      id={serviceId}
                      name="service_required"
                      required
                      value={serviceRequired}
                      onBlur={handleControlBlur}
                      onChange={(e) => setServiceRequired(e.target.value)}
                    >
                      {HOROLOGICAL_SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cosmic-field">
                    <label htmlFor={dateId}>PREFERRED DATE (OPTIONAL)</label>
                    <input
                      id={dateId}
                      name="preferred_date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="cosmic-field">
                  <label htmlFor={notesId}>TIMEPIECE SYMPTOMS / NOTES</label>
                  <textarea
                    id={notesId}
                    name="symptoms_notes"
                    rows={4}
                    placeholder="Describe any particular issues: time loss, condensation, winding resistance, or damage history..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-cosmic-primary submit-assessment-btn">
                  <span>REQUEST ATELIER ASSESSMENT</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

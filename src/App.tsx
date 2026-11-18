import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Compass,
  Droplets,
  ExternalLink,
  Gauge,
  Info,
  Layers,
  MapPin,
  Pause,
  Phone,
  Play,
  Shield,
  Sparkles,
  Star,
  Watch,
  Mail,
} from 'lucide-react';
import {
  ATELIER_INFO,
  HERO_RIBBON_ITEMS,
  HOROLOGICAL_SERVICES,
  MEDIA_PATHS,
  SPECIALIST_BRAND_TABS,
  STUDIO_METRIC_CARDS,
  VERIFIED_REVIEWS,
  type HorologicalService,
  type ReviewFilterCategory,
} from './data/watchCareData';
import { motionBridge } from './engine/motionBridge';
import { CosmicBackgroundWebGL } from './components/CosmicBackgroundWebGL';
import { CosmicNavbar } from './components/CosmicNavbar';
import { CinematicCalibreStudio } from './components/CinematicCalibreStudio';
import { MacroCinemaReel } from './components/MacroCinemaReel';
import { TimepieceDiagnosticPanel } from './components/TimepieceDiagnosticPanel';
import { AssessmentFormSection } from './components/AssessmentFormSection';

const LondonLiveClock: React.FC = React.memo(() => {
  const [londonTime, setLondonTime] = useState<string>(() =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  );

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const timer = window.setInterval(() => {
      setLondonTime(fmt.format(new Date()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>LON {londonTime}</span>;
});

const SERVICE_ICON_MAP: Record<HorologicalService['iconKey'], React.ReactNode> = {
  watch: <Watch size={20} aria-hidden="true" />,
  activity: <Activity size={20} aria-hidden="true" />,
  sparkles: <Sparkles size={20} aria-hidden="true" />,
  droplet: <Droplets size={20} aria-hidden="true" />,
  shield: <Shield size={20} aria-hidden="true" />,
  layers: <Layers size={20} aria-hidden="true" />,
};

const STUDIO_METRIC_ICONS: Record<string, React.ReactNode> = {
  gauge: <Gauge size={16} aria-hidden="true" />,
  shield: <Shield size={16} aria-hidden="true" />,
  sparkles: <Sparkles size={16} aria-hidden="true" />,
  compass: <Compass size={16} aria-hidden="true" />,
};

const REVIEW_FILTERS: { id: ReviewFilterCategory; label: string }[] = [
  { id: 'all', label: `All Reviews (${VERIFIED_REVIEWS.length})` },
  { id: 'rolex', label: 'Rolex' },
  { id: 'patek', label: 'Patek Philippe' },
  { id: 'overhauls', label: 'Mechanical Overhauls' },
];

export const App: React.FC = () => {
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const studioSectionRef = useRef<HTMLElement | null>(null);
  const brandTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [heroPlaying, setHeroPlaying] = useState(true);

  const [inspectedServiceId, setInspectedServiceId] = useState<string>(
    HOROLOGICAL_SERVICES[0].id
  );
  const [activeBrandTabIdx, setActiveBrandTabIdx] = useState<number>(0);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilterCategory>('all');

  const [formBrand, setFormBrand] = useState<string>('Rolex');
  const [formService, setFormService] = useState<string>(HOROLOGICAL_SERVICES[0].title);
  const [formNotes, setFormNotes] = useState<string>('');

  const inspectedService =
    HOROLOGICAL_SERVICES.find((s) => s.id === inspectedServiceId) ?? HOROLOGICAL_SERVICES[0];
  const activeBrand = SPECIALIST_BRAND_TABS[activeBrandTabIdx] ?? SPECIALIST_BRAND_TABS[0];
  const filteredReviews = VERIFIED_REVIEWS.filter((r) => r.categories.includes(reviewFilter));

  // Lightweight passive scroll synchronization (zero `:root` style invalidation)
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      ticking = false;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      motionBridge.pageScrollProgress = progress;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Zero-allocation cursor tracking for 3D backdrop (no DOM style mutations)
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      motionBridge.pointerTargetX = (e.clientX / w) * 2 - 1;
      motionBridge.pointerTargetY = -((e.clientY / h) * 2 - 1);
      motionBridge.clientX = e.clientX;
      motionBridge.clientY = e.clientY;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  // Compositor-only editorial reveal observer + Active Section Tracker
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (reduced) {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
    } else {
      const revObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              revObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.04, rootMargin: '70px 0px 0px 0px' }
      );
      revealEls.forEach((el) => revObs.observe(el));

      const sectionIds = [
        'hero',
        'studio',
        'macro-reel',
        'atelier',
        'services',
        'brands',
        'craftsmanship',
        'reviews',
        'contact',
      ];
      const secObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-32% 0px -52% 0px' }
      );
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) secObs.observe(el);
      });

      return () => {
        revObs.disconnect();
        secObs.disconnect();
      };
    }
  }, []);

  // Hero background video reduced-motion & viewport pause management
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      v.pause();
      setHeroPlaying(false);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play()
              .then(() => setHeroPlaying(true))
              .catch(() => setHeroPlaying(false));
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const toggleHeroVideo = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setHeroPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setHeroPlaying(false);
    }
  };

  const handleBookService = (serviceTitle: string, brand?: string, extraNote?: string) => {
    setFormService(serviceTitle);
    if (brand) setFormBrand(brand);
    if (extraNote) setFormNotes(extraNote);
    navigateToSection('contact');
  };

  const handleBrandTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const total = SPECIALIST_BRAND_TABS.length;
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % total;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + total) % total;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = total - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveBrandTabIdx(nextIdx);
      brandTabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="cosmic-app-root">
      {/* Global Fixed Three.js GPU Backdrop */}
      <CosmicBackgroundWebGL />

      {/* Top Scroll Progress Hairline */}
      <div ref={scrollProgressRef} className="cosmic-scroll-progress" aria-hidden="true" />

      <CosmicNavbar
        activeSection={activeSection}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={setIsDrawerOpen}
        onNavigate={navigateToSection}
      />

      <div id="page-inert-region" className="cosmic-ui-layer">
        <main id="main-content">
          {/* =================================================================
              NEW ASYMMETRIC ARCHITECTURAL GENEVA SPLIT-SCREEN HERO
             ================================================================= */}
          <section id="hero" className="hero-editorial-stage">
            <div className="hero-ambient-aura" aria-hidden="true" />

            <div className="container-cosmic hero-split-grid">
              {/* Left 7-Column Architectural Editorial Console */}
              <div className="hero-editorial-col">
                <div className="hero-telemetry-bar">
                  <span className="telemetry-live-badge">
                    <span className="telemetry-emerald-dot" aria-hidden="true" />
                    <span>ATELIER OPEN · LONDON EC1N</span>
                  </span>
                  <span className="telemetry-clock-chip">
                    <Clock size={12} aria-hidden="true" />
                    <LondonLiveClock />
                  </span>
                </div>

                <div className="hero-overline-rule">
                  <span className="gold-hairline" aria-hidden="true" />
                  <span>INDEPENDENT HAUTE HORLOGERIE · 67–68 HATTON GARDEN EC1N</span>
                </div>

                <h1 className="hero-architectural-h1">
                  <span>Mastery Inside</span>
                  <span className="hero-italic-accent">Every Micro-Second.</span>
                </h1>

                <p className="hero-editorial-lead">
                  Dedicated Swiss mechanical restoration, Witschi 6-axis chronometry, and
                  sympathetic case refinishing for <strong>Rolex</strong>,{' '}
                  <strong>Patek Philippe</strong>, and <strong>Richard Mille</strong> collectors in
                  Central London.
                </p>

                <div className="hero-action-console">
                  <button
                    type="button"
                    className="btn-gold-editorial"
                    onClick={() => navigateToSection('contact')}
                  >
                    <span>BOOK TIMEPIECE ASSESSMENT</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="btn-cosmic-glass"
                    onClick={() => navigateToSection('studio')}
                  >
                    <Compass size={15} className="text-gold-glow" aria-hidden="true" />
                    <span>3D CALIBRE FILM</span>
                  </button>

                  <button
                    type="button"
                    className="btn-cosmic-glass"
                    onClick={() => navigateToSection('diagnostic')}
                  >
                    <Activity size={15} className="text-violet-glow" aria-hidden="true" />
                    <span>SYMPTOM TRIAGE</span>
                  </button>
                </div>

                {/* 3-Tile Architectural Bento Spec Strip */}
                <div className="hero-bento-trio">
                  <div className="hero-bento-tile mirror-glass-card">
                    <span className="bento-kpi">±2 sec/day</span>
                    <span className="bento-caption">Witschi 6-Position Swiss Regulation</span>
                  </div>

                  <div className="hero-bento-tile mirror-glass-card">
                    <span className="bento-kpi">10 ATM · 300m</span>
                    <span className="bento-caption">Dry Vacuum &amp; Wet Hyperbaric Proof</span>
                  </div>

                  <div className="hero-bento-tile mirror-glass-card">
                    <span className="bento-kpi">12-Month</span>
                    <span className="bento-caption">Written Hatton Garden Mechanical Warranty</span>
                  </div>
                </div>
              </div>

              {/* Right 5-Column Floating 3D Sapphire Watch Cinema Showcase */}
              <div className="hero-showcase-col">
                <div className="hero-orbital-ring" aria-hidden="true">
                  <svg viewBox="0 0 420 420" fill="none">
                    <circle
                      cx="210"
                      cy="210"
                      r="198"
                      stroke="rgba(243, 198, 119, 0.22)"
                      strokeWidth="1"
                      strokeDasharray="3 7"
                    />
                    <circle
                      cx="210"
                      cy="210"
                      r="172"
                      stroke="rgba(192, 132, 252, 0.2)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                <div className="hero-vitrine-frame mirror-glass-card">
                  <div className="vitrine-top-strip">
                    <span className="vitrine-tag">
                      <Sparkles size={12} className="text-gold-glow" aria-hidden="true" />
                      <span>GENEVA CHRONOGRAPH</span>
                    </span>
                    <span className="vitrine-freq">28,800 VPH · 4 HZ</span>
                  </div>

                  <div className="vitrine-video-window">
                    {/* Above-the-fold hero showcase video: omit loading="lazy" so poster & initial frames load eagerly (`lazy-load-video-and-audio`) */}
                    <video
                      ref={heroVideoRef}
                      src={MEDIA_PATHS.heroShowcaseWatch}
                      poster={MEDIA_PATHS.heroShowcaseWatchPoster}
                      width={560}
                      height={864}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="Open-worked Geneva mechanical chronograph movement with golden hourglass complication and spinning gear train"
                      className="hero-vitrine-video"
                    />
                    <div className="vitrine-inner-sheen" aria-hidden="true" />
                  </div>

                  <div className="vitrine-bottom-bar">
                    <button
                      type="button"
                      className="vitrine-play-toggle"
                      aria-pressed={!heroPlaying}
                      onClick={toggleHeroVideo}
                    >
                      {heroPlaying ? (
                        <Pause size={13} aria-hidden="true" />
                      ) : (
                        <Play size={13} aria-hidden="true" />
                      )}
                      <span>{heroPlaying ? 'Live 3D Film' : 'Paused'}</span>
                    </button>

                    <button
                      type="button"
                      className="vitrine-studio-jump"
                      onClick={() => navigateToSection('studio')}
                    >
                      <span>INSPECT ZONES</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Floating Glass Atelier Location Card overlapping Vitrine */}
                <div className="hero-floating-badge mirror-glass-card">
                  <MapPin size={15} className="text-gold-glow" aria-hidden="true" />
                  <div>
                    <strong>67–68 Hatton Garden</strong>
                    <span>Suite 18 · London EC1N 8JY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Haute Horlogerie Specification Ribbon */}
            <div className="hero-spec-ribbon" aria-label="Atelier capabilities">
              <div className="container-cosmic hero-ribbon-inner">
                {HERO_RIBBON_ITEMS.map((item, idx) => (
                  <React.Fragment key={item}>
                    <span className="ribbon-spec-item">{item}</span>
                    {idx < HERO_RIBBON_ITEMS.length - 1 && (
                      <span className="ribbon-diamond" aria-hidden="true">
                        ✦
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================================
              CINEMATIC 3D CALIBRE STUDIO — "ANATOMY OF HAUTE HORLOGERIE."
             ================================================================= */}
          <section
            id="studio"
            ref={studioSectionRef}
            className="cosmic-section studio-calibre-section calibre-studio-visibility-host"
          >
            <div className="container-cosmic">
              <div className="section-header-split" data-reveal>
                <div>
                  <span className="cosmic-eyebrow">
                    <Compass size={13} aria-hidden="true" />
                    <span>3D CINEMATIC CALIBRE STUDIO · SWISS BENCH ARCHITECTURE</span>
                  </span>
                  <h2 className="cosmic-h2">Anatomy of Haute Horlogerie.</h2>
                </div>
                <p className="cosmic-lead">
                  Step inside our 3D mechanical chronograph bench. Scrub the movement timeline in
                  slow motion, switch optical studio grades, and inspect every calibration station
                  from crown gasket torque to 4Hz balance regulation.
                </p>
              </div>

              <div data-reveal>
                <CinematicCalibreStudio
                  visibilityHostRef={studioSectionRef}
                  onSelectService={(serviceTitle, note) =>
                    handleBookService(serviceTitle, undefined, note)
                  }
                />
              </div>

              {/* 4 Mirror Glassmorphism Metric Cards */}
              <div className="studio-metrics-grid" data-reveal>
                {STUDIO_METRIC_CARDS.map((card) => (
                  <article key={card.id} className="studio-metric-card mirror-glass-card">
                    <div className="metric-card-eyebrow">
                      <span className="text-violet-glow">{STUDIO_METRIC_ICONS[card.iconKey]}</span>
                      <span>{card.eyebrow}</span>
                    </div>
                    <h3 className="metric-card-value">{card.value}</h3>
                    <p className="metric-card-detail">{card.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================================
              MACRO CINEMA REEL
             ================================================================= */}
          <MacroCinemaReel
            onBookWaterSealTest={() =>
              handleBookService(
                'Water Resistance & Hyperbaric Reseal',
                undefined,
                'Requesting 10 ATM hydrostatic & vacuum water resistance certification.'
              )
            }
          />

          {/* =================================================================
              02. HOROLOGICAL ATELIER · LONDON EC1N — ABOUT PERI WATCH CARE LTD
             ================================================================= */}
          <section id="atelier" className="cosmic-section atelier-about-section">
            <div className="container-cosmic">
              <div className="section-header-split" data-reveal>
                <div>
                  <span className="cosmic-eyebrow">
                    <span>02. HOROLOGICAL ATELIER · LONDON EC1N</span>
                  </span>
                  <h2 className="cosmic-h2">About Peri Watch Care Ltd</h2>
                </div>
                <p className="cosmic-lead">
                  Preserving the precision, longevity, and heritage of fine mechanical timepieces in
                  the heart of London.
                </p>
              </div>

              <div className="atelier-editorial-grid">
                <div className="atelier-copy-column" data-reveal>
                  <p className="atelier-paragraph">
                    Established as a dedicated horological restoration workshop in London,{' '}
                    <strong>Peri Watch Care Ltd</strong> provides meticulous servicing,
                    restoration, and aesthetic refinishing for premier Swiss mechanical timepieces.
                  </p>
                  <p className="atelier-paragraph">
                    Our Hatton Garden facility is equipped with industry-standard Swiss diagnostic
                    timing apparatus, including multi-position Witschi chronoscopes, specialized
                    ultrasonic cleaning lines, and hyperbaric pressure chambers. Every timepiece
                    entrusted to us undergoes complete deconstruction, sympathetic hand-finishing,
                    high-purity synthetic epilame lubrication, and rigorous multi-day timing
                    regulation.
                  </p>
                  <p className="atelier-paragraph">
                    Whether servicing a daily-worn Rolex chronometer, a grand complication Patek
                    Philippe, or an avant-garde Richard Mille, our approach prioritizes original
                    factory tolerances, sharp bevel preservation, and transparent client
                    communication.
                  </p>

                  <div className="atelier-dual-pillars">
                    <div className="atelier-pillar-box mirror-glass-card">
                      <span className="cosmic-mono-tag">PRECISION</span>
                      <h3>Witschi Chronometry</h3>
                      <p>Multi-axis beat error &amp; amplitude analysis</p>
                    </div>

                    <div className="atelier-pillar-box mirror-glass-card">
                      <span className="cosmic-mono-tag">WATER RESISTANCE</span>
                      <h3>Hyperbaric Testing</h3>
                      <p>Pressure &amp; vacuum seal verification up to 300m</p>
                    </div>
                  </div>

                  <div className="atelier-location-bar mirror-glass-card">
                    <MapPin size={16} className="text-violet-glow" aria-hidden="true" />
                    <span>New House, 67–68 Hatton Garden, London EC1N 8JY</span>
                  </div>
                </div>

                <figure className="atelier-portrait-frame mirror-glass-card" data-reveal>
                  <img
                    src={MEDIA_PATHS.watchmakerPortrait}
                    alt="Master watchmaker at Peri Watch Care London regulating a mechanical movement under magnification"
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="atelier-portrait-img"
                  />
                  <figcaption className="atelier-portrait-caption mirror-glass-card">
                    <span className="cosmic-mono-tag">LONDON ATELIER PROTOCOL</span>
                    <p>
                      Master watchmakers working under controlled illumination with
                      micro-screwdrivers, loupes, and precision Swiss timing apparatus.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* =================================================================
              TIMEPIECE DIAGNOSTIC TRIAGE DECK (MIRROR GLASSMORPHISM CARDS)
             ================================================================= */}
          <TimepieceDiagnosticPanel
            onSelectDiagnosticService={(srvTitle, note) =>
              handleBookService(srvTitle, undefined, note)
            }
          />

          {/* =================================================================
              SERVICES & INTERACTIVE ATELIER PROCEDURE BREAKDOWN
             ================================================================= */}
          <section id="services" className="cosmic-section services-discipline-section">
            <div className="container-cosmic">
              <div className="section-header-split" data-reveal>
                <div>
                  <span className="cosmic-eyebrow">
                    <span>01. HOROLOGICAL DISCIPLINES · SWISS BENCH STANDARDS</span>
                  </span>
                  <h2 className="cosmic-h2">Horological Services &amp; Restoration</h2>
                </div>
                <p className="cosmic-lead">
                  Select <strong>Inspect Procedure</strong> on any specialist discipline to review
                  our watchmakers’ step-by-step bench protocol, apparatus, and turnaround window.
                </p>
              </div>

              <div className="services-six-grid">
                {HOROLOGICAL_SERVICES.map((srv) => {
                  const isInspected = srv.id === inspectedService.id;
                  return (
                    <article
                      key={srv.id}
                      className={`service-cosmic-card mirror-glass-card ${
                        isInspected ? 'is-inspected' : ''
                      }`}
                      data-reveal
                    >
                      <div className="service-card-top">
                        <div className="service-glyph-box">
                          {SERVICE_ICON_MAP[srv.iconKey]}
                        </div>
                        <span className="service-turnaround-mono">{srv.turnaround}</span>
                      </div>

                      <h3 className="service-cosmic-title">{srv.title}</h3>
                      <p className="service-cosmic-sub">{srv.tagline}</p>
                      <p className="service-cosmic-desc">{srv.description}</p>

                      <div className="service-card-actions">
                        <button
                          type="button"
                          aria-pressed={isInspected}
                          className="service-inspect-link"
                          onClick={() => {
                            setInspectedServiceId(srv.id);
                            document
                              .getElementById('procedure-breakdown-panel')
                              ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                        >
                          <span>Inspect Procedure</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          className="service-enquire-tag"
                          onClick={() => handleBookService(srv.title)}
                        >
                          ENQUIRE
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Interactive Atelier Procedure Breakdown */}
              <div
                id="procedure-breakdown-panel"
                className="procedure-breakdown-card mirror-glass-card"
                data-reveal
              >
                <div className="procedure-top-bar">
                  <div>
                    <span className="cosmic-mono-tag">ATELIER PROCEDURE BREAKDOWN</span>
                    <h3 className="procedure-title">{inspectedService.title}</h3>
                  </div>

                  <div className="procedure-top-right">
                    <div className="procedure-turnaround-readout">
                      <span>Estimated Turnaround</span>
                      <strong>{inspectedService.turnaround}</strong>
                    </div>
                    <button
                      type="button"
                      className="btn-cosmic-primary"
                      onClick={() => handleBookService(inspectedService.title)}
                    >
                      <span>BOOK THIS SERVICE</span>
                    </button>
                  </div>
                </div>

                <div className="procedure-body-grid">
                  <div className="procedure-steps-wrap">
                    <span className="procedure-subhead">STEP-BY-STEP WATCHMAKER PROTOCOL:</span>
                    <ol className="procedure-ordered-list">
                      {inspectedService.protocolSteps.map((step, i) => (
                        <li key={step}>
                          <span className="step-index-badge" aria-hidden="true">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <aside
                    aria-label="Diagnostic apparatus and quality standard"
                    className="procedure-apparatus-box mirror-glass-card"
                  >
                    <div className="apparatus-group">
                      <span className="cosmic-mono-tag">DIAGNOSTIC APPARATUS</span>
                      <p>{inspectedService.apparatus}</p>
                    </div>
                    <div className="apparatus-group">
                      <span className="cosmic-mono-tag">QUALITY STANDARD</span>
                      <p>{inspectedService.qualityStandard}</p>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              03. INDEPENDENT SPECIALISTS · ROLEX, PATEK PHILIPPE & RICHARD MILLE
             ================================================================= */}
          <section id="brands" className="cosmic-section specialist-brands-section">
            <div className="container-cosmic">
              <div className="section-header-split" data-reveal>
                <div>
                  <span className="cosmic-eyebrow">
                    <span>03. INDEPENDENT SPECIALISTS · SWISS HAUTE HORLOGERIE</span>
                  </span>
                  <h2 className="cosmic-h2">Rolex, Patek Philippe &amp; Richard Mille</h2>
                </div>
                <p className="cosmic-lead">
                  Specialist independent maintenance, calibration, and case restoration for the
                  world’s three most demanding horological brands.
                </p>
              </div>

              <div
                className="brands-tablist-bar"
                role="tablist"
                aria-label="Specialist horological marques"
                data-reveal
              >
                {SPECIALIST_BRAND_TABS.map((tab, idx) => {
                  const selected = idx === activeBrandTabIdx;
                  return (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        brandTabRefs.current[idx] = el;
                      }}
                      id={`brand-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={`brand-panel-${tab.id}`}
                      tabIndex={selected ? 0 : -1}
                      onKeyDown={(e) => handleBrandTabKeyDown(e, idx)}
                      onClick={() => setActiveBrandTabIdx(idx)}
                      className={`brand-tab-btn ${selected ? 'is-selected' : ''}`}
                    >
                      {tab.tabLabel}
                    </button>
                  );
                })}
              </div>

              <div
                id={`brand-panel-${activeBrand.id}`}
                role="tabpanel"
                aria-labelledby={`brand-tab-${activeBrand.id}`}
                className="brand-showcase-panel mirror-glass-card"
                data-reveal
              >
                <div className="brand-panel-copy">
                  <span className="cosmic-mono-tag">{activeBrand.eyebrow}</span>
                  <h3 className="brand-panel-headline">{activeBrand.headline}</h3>
                  <p className="brand-panel-summary">{activeBrand.summary}</p>

                  <ul role="list" className="brand-highlights-list">
                    {activeBrand.highlights.map((hl) => (
                      <li key={hl.bold}>
                        <CheckCircle2 size={16} className="text-violet-glow" aria-hidden="true" />
                        <span>
                          <strong>{hl.bold}</strong> {hl.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="brand-panel-footer">
                    <div className="brand-calibres-list">
                      <span>Typical Calibres Serviced</span>
                      <strong>{activeBrand.calibres}</strong>
                    </div>

                    <button
                      type="button"
                      className="btn-cosmic-primary"
                      onClick={() =>
                        handleBookService(
                          'Complete Mechanical Overhaul',
                          activeBrand.watchBrandSelectValue
                        )
                      }
                    >
                      <span>{activeBrand.ctaLabel}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <figure className="brand-panel-figure">
                  <img
                    src={activeBrand.imageSrc}
                    alt={activeBrand.imageCaption}
                    width={990}
                    height={612}
                    loading="lazy"
                    className="brand-panel-img"
                  />
                  <figcaption className="brand-panel-img-caption">
                    {activeBrand.imageCaption}
                  </figcaption>
                </figure>
              </div>

              <div className="independent-disclosure-box mirror-glass-card" data-reveal>
                <Info size={17} className="text-violet-glow" aria-hidden="true" />
                <p>
                  <strong>Independent Atelier Disclosure:</strong> Peri Watch Care Ltd is an
                  independent horological workshop and is not an authorized distributor, agent, or
                  representative of Rolex SA, Patek Philippe SA, Richard Mille, or any other
                  mentioned watchmaker. All brand names, model names, and registered trademarks are
                  utilized strictly for descriptive identification, repair compatibility, and
                  informational reference.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================
              04. HOROLOGICAL DISCIPLINE · CRAFTSMANSHIP & BENCHWORK
             ================================================================= */}
          <section id="craftsmanship" className="cosmic-section craftsmanship-section">
            <div className="container-cosmic">
              <div className="section-header-split" data-reveal>
                <div>
                  <span className="cosmic-eyebrow">
                    <span>04. HOROLOGICAL DISCIPLINE · MICRO-ENGINEERING</span>
                  </span>
                  <h2 className="cosmic-h2">Craftsmanship &amp; Benchwork</h2>
                </div>
                <p className="cosmic-lead">
                  Every millimeter of a fine mechanical movement demands unflinching concentration,
                  specialized optics, and decades of horological discipline.
                </p>
              </div>

              <figure className="craftsmanship-panorama mirror-glass-card" data-reveal>
                <img
                  src={MEDIA_PATHS.atelierBenchwork}
                  alt="Senior watchmaker with eye loupe and brass tweezers assembling a Swiss mechanical watch movement beside precision Bergeon screwdrivers"
                  width={1651}
                  height={537}
                  loading="lazy"
                  className="craftsmanship-panorama-img"
                />
                <figcaption className="craftsmanship-overlay-card mirror-glass-card">
                  <span className="cosmic-mono-tag">
                    ATELIER BENCHWORK PROTOCOL · LONDON EC1N
                  </span>
                  <p>
                    Hand-dressed escapement pivots, Bergeon torque-calibrated screwdriver sets, and
                    dust-controlled casing chambers in Hatton Garden.
                  </p>
                </figcaption>
              </figure>

              <div className="craftsmanship-pillars-grid" data-reveal>
                <div className="craft-mini-card mirror-glass-card">
                  <span className="cosmic-mono-tag">01 · DECONTAMINATION</span>
                  <h3>Elma 4-Bath Ultrasonic</h3>
                  <p>
                    Sequential wash, rinse, and warm forced-air drying dissolving aged lubricants
                    without stressing shellac pallet stones.
                  </p>
                </div>
                <div className="craft-mini-card mirror-glass-card">
                  <span className="cosmic-mono-tag">02 · TRIBOLOGY</span>
                  <h3>Moebius Epilame Oils</h3>
                  <p>
                    Five viscosity-graded Swiss synthetic oils applied via micro-oilers to ruby
                    cap-jewels, mainspring walls, and impulse planes.
                  </p>
                </div>
                <div className="craft-mini-card mirror-glass-card">
                  <span className="cosmic-mono-tag">03 · METALLURGY</span>
                  <h3>Sharp Bevel Preservation</h3>
                  <p>
                    Flat diamond-plate lapping reconstructs crisp factory lug chamfers juxtaposed
                    against directional satin grain.
                  </p>
                </div>
                <div className="craft-mini-card mirror-glass-card">
                  <span className="cosmic-mono-tag">04 · CHRONOMETRY</span>
                  <h3>72-Hour Multi-Axis Audit</h3>
                  <p>
                    Six-position rate, beat-error, and power-reserve verification prior to client
                    handover in Hatton Garden.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              05. VERIFIED CLIENT REVIEWS
             ================================================================= */}
          <section id="reviews" className="cosmic-section reviews-cosmic-section">
            <div className="container-cosmic">
              <div className="section-header-split" data-reveal>
                <div>
                  <span className="cosmic-eyebrow">
                    <span>05. COLLECTOR VERIFICATION · LONDON CLIENTELE</span>
                  </span>
                  <h2 className="cosmic-h2">Customer Reviews</h2>
                </div>
                <div className="reviews-rating-summary">
                  <div className="stars-row" aria-label="5.0 out of 5.0 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                        className="star-filled"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span>5.0 / 5.0 Rating · Central London Clients</span>
                </div>
              </div>

              <div
                className="reviews-filter-bar"
                role="group"
                aria-label="Filter verified collector reviews"
                data-reveal
              >
                {REVIEW_FILTERS.map((f) => {
                  const active = reviewFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setReviewFilter(f.id)}
                      className={`review-filter-pill ${active ? 'is-active' : ''}`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              <div className="reviews-cards-grid">
                {filteredReviews.map((rev) => (
                  <article key={rev.id} className="review-cosmic-card mirror-glass-card" data-reveal>
                    <div className="review-card-top">
                      <div className="stars-row" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill="currentColor"
                            className="star-filled"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="review-date-mono">{rev.date}</span>
                    </div>

                    <p className="review-quote-body">“{rev.quote}”</p>

                    <footer className="review-card-footer">
                      <div className="review-author-row">
                        <strong>{rev.author}</strong>
                        <span className="verified-badge">
                          <BadgeCheck size={14} aria-hidden="true" />
                          <span>Verified</span>
                        </span>
                      </div>
                      <div className="review-location-model">
                        <span>{rev.location}</span>
                        <span className="dot-sep" aria-hidden="true">
                          ·
                        </span>
                        <span className="review-model-highlight">{rev.timepiece}</span>
                      </div>
                      <p className="review-service-tag">Service: {rev.service}</p>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================================
              06. CONTACT & SERVICE ENQUIRY + TIMEPIECE ASSESSMENT FORM
             ================================================================= */}
          <AssessmentFormSection
            selectedBrand={formBrand}
            selectedService={formService}
            prefilledNotes={formNotes}
          />
        </main>

        {/* ===================================================================
            COSMIC TWILIGHT LUXURY FOOTER
           =================================================================== */}
        <footer className="cosmic-footer">
          <div className="container-cosmic">
            <div className="footer-columns-grid">
              <div className="footer-brand-column">
                <div className="cosmic-brand-mark">
                  <span className="brand-serif-primary">{ATELIER_INFO.brandTitle}</span>
                  <span className="brand-sans-city">{ATELIER_INFO.brandCity}</span>
                </div>
                <p className="footer-brand-desc">
                  Independent master horological workshop delivering Swiss-standard mechanical
                  overhauls, precision escapement regulation, laser casing refinishing, and pressure
                  resealing.
                </p>
                <ul role="list" className="footer-contact-list">
                  <li>
                    <MapPin size={14} className="text-violet-glow" aria-hidden="true" />
                    <span>New House, 67–68 Hatton Garden, London EC1N 8JY</span>
                  </li>
                  <li>
                    <Phone size={14} className="text-violet-glow" aria-hidden="true" />
                    <a href={ATELIER_INFO.phoneHref}>{ATELIER_INFO.phoneDisplay}</a>
                  </li>
                  <li>
                    <Mail size={14} className="text-violet-glow" aria-hidden="true" />
                    <a href={ATELIER_INFO.emailHref}>{ATELIER_INFO.email}</a>
                  </li>
                </ul>
              </div>

              <nav aria-label="Horological Services" className="footer-links-col">
                <h2 className="footer-col-title">HOROLOGICAL SERVICES</h2>
                <ul role="list">
                  {HOROLOGICAL_SERVICES.map((s) => (
                    <li key={s.id}>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookService(s.title);
                        }}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="footer-links-col">
                <h2 className="footer-col-title">SPECIALIST FOCUS &amp; LINKS</h2>
                <ul role="list">
                  <li>
                    <a
                      href="#brands"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveBrandTabIdx(0);
                        navigateToSection('brands');
                      }}
                    >
                      Rolex Submariner, Daytona &amp; Oyster Calibres
                    </a>
                  </li>
                  <li>
                    <a
                      href="#brands"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveBrandTabIdx(1);
                        navigateToSection('brands');
                      }}
                    >
                      Patek Philippe Complications &amp; Calatrava
                    </a>
                  </li>
                  <li>
                    <a
                      href="#brands"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveBrandTabIdx(2);
                        navigateToSection('brands');
                      }}
                    >
                      Richard Mille Skeletonized Chronographs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#macro-reel"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToSection('macro-reel');
                      }}
                    >
                      Macro Testing Cinema Reel
                    </a>
                  </li>
                  <li>
                    <a
                      href={ATELIER_INFO.existingSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-portal-link"
                    >
                      <span>Current Client Portal</span>
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </li>
                </ul>

                <div className="footer-schedule-note">
                  <p>Workshop Schedule: Mon–Sat: 10:00 – 18:00</p>
                  <p>Sunday: By Private Consultation Only</p>
                </div>
              </div>
            </div>

            <div className="footer-disclaimers-box">
              <p>
                <strong>Redesign Concept Notice:</strong> This digital experience is an ultra-luxury
                real-time 3D WebGL website redesign concept created for Peri Watch Care Ltd,
                London. It is presented for concept evaluation and design review.
              </p>
              <p>
                <strong>Trademark Disclaimer:</strong> Peri Watch Care Ltd is an independent watch
                service and repair facility. We are not an authorized agent, distributor, or
                representative of Rolex Watch U.S.A. Inc., Rolex SA, Patek Philippe SA, Richard
                Mille, Audemars Piguet, Omega SA, Cartier, or any other trademark owner. All brand
                marks, trade names, and models remain the property of their respective trademark
                holders and are utilized solely for descriptive identification and repair
                compatibility.
              </p>
            </div>

            <div className="footer-bottom-row">
              <p>
                © 2026 Peri Watch Care Ltd. Registered in England &amp; Wales. All rights
                reserved.
              </p>
              <button
                type="button"
                className="back-to-top-btn"
                onClick={() => navigateToSection('hero')}
              >
                <span>Back to top</span>
                <ArrowUp size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;

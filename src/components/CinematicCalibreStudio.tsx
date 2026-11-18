import React, { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Sparkles,
  Wrench,
} from 'lucide-react';
import {
  CINEMATIC_3D_CHAPTERS,
  MEDIA_PATHS,
  type CinematicWatchChapter,
} from '../data/watchCareData';

interface CinematicCalibreStudioProps {
  visibilityHostRef?: React.RefObject<HTMLElement | null>;
  onSelectService: (serviceTitle: string, note: string) => void;
}

const SPEED_MODES = [
  { label: 'Realtime (1.0x)', rate: 1.0 },
  { label: 'Slow-Mo (0.5x)', rate: 0.5 },
  { label: 'Precision (0.75x)', rate: 0.75 },
];

const OPTICAL_TONES = [
  { id: 'warm-gold', label: '18K Warm Gold', swatch: '#e5b869', filter: 'saturate(1.12) contrast(1.05)' },
  {
    id: 'cosmic-violet',
    label: 'Cosmic Twilight',
    swatch: '#c084fc',
    filter: 'saturate(1.18) contrast(1.08) hue-rotate(-8deg)',
  },
  {
    id: 'steel-daylight',
    label: '904L Daylight',
    swatch: '#dce4f2',
    filter: 'saturate(0.94) contrast(1.08) brightness(1.04)',
  },
  {
    id: 'atelier-loupe',
    label: 'High-Contrast Loupe',
    swatch: '#94a3b8',
    filter: 'saturate(1.05) contrast(1.16) brightness(1.02)',
  },
] as const;

export const CinematicCalibreStudio: React.FC<CinematicCalibreStudioProps> = ({
  visibilityHostRef,
  onSelectService,
}) => {
  const scrubId = useId();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const portalCardRef = useRef<HTMLDivElement | null>(null);
  const lastReportedTimeRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speedIdx, setSpeedIdx] = useState(0);
  const [toneIdx, setToneIdx] = useState(0);
  const [cinemaExpanded, setCinemaExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(9.04);
  const [activeChapterId, setActiveChapterId] = useState<string>(CINEMATIC_3D_CHAPTERS[0].id);

  const activeChapter: CinematicWatchChapter =
    CINEMATIC_3D_CHAPTERS.find((c) => c.id === activeChapterId) ?? CINEMATIC_3D_CHAPTERS[0];

  // Offscreen lazy media fallback (`lazy-load-video-and-audio`) + `efficient-background-processing`
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = reducedMotionQuery.matches;

    video.playbackRate = SPEED_MODES[speedIdx].rate;

    if (prefersReduced) {
      video.removeAttribute('autoplay');
      video.pause();
      setIsPlaying(false);
    }

    const onMotionPrefChange = (ev: MediaQueryListEvent) => {
      prefersReduced = ev.matches;
      if (prefersReduced) {
        video.pause();
        setIsPlaying(false);
      } else {
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };
    reducedMotionQuery.addEventListener('change', onMotionPrefChange);

    // Fallback when native HTMLMediaElement.prototype.loading is unavailable
    const supportsLazyMedia = Object.hasOwn(HTMLMediaElement.prototype, 'loading');
    let lazyLoadObserver: IntersectionObserver | null = null;
    if (!supportsLazyMedia && video.dataset.deferredPoster) {
      lazyLoadObserver = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (video.dataset.deferredPoster) {
              video.poster = video.dataset.deferredPoster;
              delete video.dataset.deferredPoster;
            }
            video.preload = 'metadata';
            video.load();
            obs.unobserve(video);
          }
        },
        { rootMargin: '220px 0px' }
      );
      lazyLoadObserver.observe(video);
    }

    const pausePlayback = () => {
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };

    const resumePlayback = () => {
      if (prefersReduced) return;
      video.playbackRate = SPEED_MODES[speedIdx].rate;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    const hostEl = visibilityHostRef?.current ?? video;
    const onContentVisibility = (e: Event) => {
      const cvEvent = e as Event & { skipped?: boolean };
      if (cvEvent.skipped) {
        pausePlayback();
      } else {
        resumePlayback();
      }
    };
    hostEl.addEventListener('contentvisibilityautostatechange', onContentVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resumePlayback();
          } else {
            pausePlayback();
          }
        });
      },
      { rootMargin: '180px 0px', threshold: 0.08 }
    );
    io.observe(hostEl);

    return () => {
      reducedMotionQuery.removeEventListener('change', onMotionPrefChange);
      lazyLoadObserver?.disconnect();
      hostEl.removeEventListener('contentvisibilityautostatechange', onContentVisibility);
      io.disconnect();
    };
  }, [speedIdx, visibilityHostRef]);

  // Subtle 3D perspective tilt on mouse hover over the Cinema Portal
  const handlePortalPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = portalCardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
    card.style.setProperty('--tilt-rx', `${(-ny * 4.5).toFixed(2)}deg`);
    card.style.setProperty('--tilt-ry', `${(nx * 5.5).toFixed(2)}deg`);
  };

  const resetPortalTilt = () => {
    const card = portalCardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-rx', '0deg');
    card.style.setProperty('--tilt-ry', '0deg');
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEED_MODES.length;
    setSpeedIdx(next);
    if (videoRef.current) {
      videoRef.current.playbackRate = SPEED_MODES[next].rate;
    }
  };

  const handleScrub = (pct: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(duration) || duration <= 0) return;
    const targetSec = (pct / 100) * duration;
    v.currentTime = targetSec;
    setCurrentTime(targetSec);
  };

  const selectChapter = (chapter: CinematicWatchChapter) => {
    setActiveChapterId(chapter.id);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(chapter.timestampSec, Math.max(0, duration - 0.1));
    setCurrentTime(v.currentTime);
    if (v.paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const progressPct = duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;
  const supportsLazyAttr =
    typeof HTMLMediaElement !== 'undefined' &&
    Object.hasOwn(HTMLMediaElement.prototype, 'loading');

  return (
    <div className={`cinematic-studio-shell ${cinemaExpanded ? 'is-cinema-expanded' : ''}`}>
      {/* Left: 3D Perspective-Tilt Cinema Showcase Frame */}
      <div
        ref={portalCardRef}
        className="cinematic-3d-portal mirror-glass-card"
        onPointerMove={handlePortalPointerMove}
        onPointerLeave={resetPortalTilt}
      >
        <div className="cinematic-portal-glow" aria-hidden="true" />

        <div className="cinematic-portal-topbar">
          <span className="cinematic-live-pill">
            <span className="hud-live-dot" aria-hidden="true" />
            <span>3D ATELIER CINEMA · SUSPENDED CALIBRE</span>
          </span>

          <button
            type="button"
            className="cinematic-expand-btn"
            aria-pressed={cinemaExpanded}
            onClick={() => setCinemaExpanded((prev) => !prev)}
          >
            {cinemaExpanded ? (
              <Minimize2 size={13} aria-hidden="true" />
            ) : (
              <Maximize2 size={13} aria-hidden="true" />
            )}
            <span>{cinemaExpanded ? 'STANDARD VIEW' : 'CINEMA VIEW'}</span>
          </button>
        </div>

        <div className="cinematic-video-viewport">
          <video
            ref={videoRef}
            src={MEDIA_PATHS.studioSuspendedCalibre}
            width={464}
            height={832}
            poster={supportsLazyAttr ? MEDIA_PATHS.studioSuspendedCalibrePoster : undefined}
            data-deferred-poster={
              !supportsLazyAttr ? MEDIA_PATHS.studioSuspendedCalibrePoster : undefined
            }
            {...({ loading: 'lazy' } as React.VideoHTMLAttributes<HTMLVideoElement>)}
            autoPlay
            loop
            muted
            playsInline
            preload={supportsLazyAttr ? 'metadata' : 'none'}
            style={{ filter: OPTICAL_TONES[toneIdx].filter }}
            onLoadedMetadata={(e) => {
              const dur = e.currentTarget.duration;
              if (Number.isFinite(dur) && dur > 0) setDuration(dur);
            }}
            onTimeUpdate={(e) => {
              const t = e.currentTarget.currentTime;
              if (Math.abs(t - lastReportedTimeRef.current) >= 0.28) {
                lastReportedTimeRef.current = t;
                setCurrentTime(t);
              }
            }}
            aria-label="Suspended exploded mechanical calibre with glowing copper gear train, sapphire bezel ring and stacked escapement discs"
            className="cinematic-3d-video-el"
          />

          <div className="cinematic-corner-hud">
            <span className="cosmic-mono-tag">
              {activeChapter.code} · {activeChapter.zoneLabel}
            </span>
            <strong>{activeChapter.tolerance}</strong>
          </div>
        </div>

        {/* Bottom Scrub & Optical Controls Console */}
        <div className="cinematic-controls-dock">
          <div className="cinematic-scrub-row">
            <label htmlFor={scrubId} className="cinematic-scrub-label">
              <Compass size={14} className="text-gold-glow" aria-hidden="true" />
              <span>
                Calibre Timeline: <strong>{progressPct}%</strong>
              </span>
            </label>

            <input
              id={scrubId}
              type="range"
              min={0}
              max={100}
              value={progressPct}
              onChange={(e) => handleScrub(Number(e.target.value))}
              aria-label="Scrub 3D watch cinema timeline"
              className="calibre-explode-slider"
            />

            <div className="cinematic-transport-btns">
              <button
                type="button"
                className="calibre-icon-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause 3D cinema video' : 'Play 3D cinema video'}
              >
                {isPlaying ? (
                  <Pause size={14} aria-hidden="true" />
                ) : (
                  <Play size={14} aria-hidden="true" />
                )}
              </button>

              <button type="button" className="calibre-speed-btn" onClick={cycleSpeed}>
                {SPEED_MODES[speedIdx].label}
              </button>
            </div>
          </div>

          <div className="cinematic-tones-row" role="group" aria-label="Optical studio lighting grade">
            <span className="cinematic-tone-caption">OPTICAL GRADE:</span>
            <div className="cinematic-tone-pills">
              {OPTICAL_TONES.map((tone, i) => {
                const active = i === toneIdx;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setToneIdx(i)}
                    className={`calibre-seg-btn ${active ? 'is-active' : ''}`}
                  >
                    <span
                      className="finish-swatch-dot"
                      style={{ backgroundColor: tone.swatch }}
                      aria-hidden="true"
                    />
                    <span>{tone.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Interactive 4-Zone Horological Bench Inspection Console */}
      {!cinemaExpanded && (
        <div className="cinematic-bench-panel mirror-glass-card">
          <div className="bench-panel-header">
            <span className="cosmic-eyebrow">
              <Sparkles size={13} aria-hidden="true" />
              <span>3D MICRO-MECHANICAL INSPECTION</span>
            </span>
            <h3 className="bench-panel-title">Select a Calibre Zone to Inspect</h3>
            <p className="bench-panel-sub">
              Jump directly to each watchmaker station inside the 3D chronograph movement to review
              our Hatton Garden EC1N tolerances and Swiss bench tooling.
            </p>
          </div>

          <div className="bench-chapters-list" role="group" aria-label="3D movement inspection zones">
            {CINEMATIC_3D_CHAPTERS.map((chap) => {
              const selected = chap.id === activeChapter.id;
              return (
                <button
                  key={chap.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectChapter(chap)}
                  className={`bench-chapter-btn ${selected ? 'is-selected' : ''}`}
                >
                  <span className="bench-chap-code">{chap.code}</span>
                  <span className="bench-chap-body">
                    <strong>{chap.title}</strong>
                    <small>{chap.zoneLabel}</small>
                  </span>
                  <span className="bench-chap-time">{chap.timestampSec.toFixed(1)}s</span>
                </button>
              );
            })}
          </div>

          <div className="bench-active-readout">
            <div className="bench-readout-top">
              <span className="cosmic-mono-tag">ACTIVE STATION · {activeChapter.code}</span>
              <span className="bench-tolerance-badge">
                <CheckCircle2 size={13} aria-hidden="true" />
                <span>{activeChapter.tolerance}</span>
              </span>
            </div>

            <p className="bench-readout-desc">{activeChapter.description}</p>

            <div className="bench-apparatus-line">
              <Wrench size={14} className="text-gold-glow" aria-hidden="true" />
              <span>
                <strong>Apparatus:</strong> {activeChapter.apparatus}
              </span>
            </div>

            <button
              type="button"
              className="btn-cosmic-primary bench-book-cta"
              onClick={() =>
                onSelectService(
                  activeChapter.recommendedService,
                  `Enquiring from 3D Calibre Studio (${activeChapter.title}).`
                )
              }
            >
              <span>BOOK {activeChapter.recommendedService.toUpperCase()}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

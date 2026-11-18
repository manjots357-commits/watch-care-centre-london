import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Droplets,
  Film,
  Pause,
  Play,
  ShieldCheck,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { MACRO_REELS, MEDIA_PATHS } from '../data/watchCareData';

interface MacroCinemaReelProps {
  onBookWaterSealTest: () => void;
}

const PLAYBACK_RATES = [1, 0.5, 1.5];

export const MacroCinemaReel: React.FC<MacroCinemaReelProps> = ({ onBookWaterSealTest }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastReportedTimeRef = useRef<number>(0);

  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [rateIdx, setRateIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(5.21);

  const currentReel = MACRO_REELS[activeReelIdx];
  const supportsLazyAttr =
    typeof HTMLMediaElement !== 'undefined' &&
    Object.hasOwn(HTMLMediaElement.prototype, 'loading');

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    v.playbackRate = PLAYBACK_RATES[rateIdx];
    if (reduced) {
      v.pause();
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          } else {
            v.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeReelIdx, rateIdx]);

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

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const cycleRate = () => {
    const next = (rateIdx + 1) % PLAYBACK_RATES.length;
    setRateIdx(next);
    if (videoRef.current) {
      videoRef.current.playbackRate = PLAYBACK_RATES[next];
    }
  };

  const jumpToMarker = (sec: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = sec;
    setCurrentTime(sec);
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <section id="macro-reel" ref={sectionRef} className="cosmic-section macro-reel-section">
      <div className="container-cosmic">
        <div className="section-header-split" data-reveal>
          <div>
            <span className="cosmic-eyebrow">
              <Film size={13} aria-hidden="true" />
              <span>MACRO HOROLOGY CINEMA · BENCH INSPECTION REELS</span>
            </span>
            <h2 className="cosmic-h2">Macro Cinema Reel.</h2>
          </div>
          <div className="reel-switcher-group">
            <p className="cosmic-lead">
              Close-focus optical inspection of screw-down caseback architecture, gasket channels,
              and mirror-lapped chamfers recorded for our NW8 atelier bench standard.
            </p>
            <div className="reel-tabs-row" role="group" aria-label="Select macro cinema reel">
              {MACRO_REELS.map((reel, idx) => (
                <button
                  key={reel.id}
                  type="button"
                  aria-pressed={activeReelIdx === idx}
                  className={`reel-select-pill ${activeReelIdx === idx ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveReelIdx(idx);
                    setCurrentTime(0);
                  }}
                >
                  {idx === 0 ? 'Reel 01 · Celestial Clock' : 'Reel 02 · Calibre Study'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="macro-cinema-grid" data-reveal>
          {/* Vertical / Studio Macro Video Frame */}
          <div className="macro-video-shell mirror-glass-card">
            <div className="macro-video-badge">{currentReel.badge}</div>
            <video
              key={currentReel.src}
              ref={videoRef}
              src={currentReel.src}
              width={720}
              height={720}
              poster={
                activeReelIdx === 0 && supportsLazyAttr
                  ? MEDIA_PATHS.macroReelPrimaryPoster
                  : undefined
              }
              {...({ loading: 'lazy' } as React.VideoHTMLAttributes<HTMLVideoElement>)}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
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
              className="macro-video-el"
              aria-label={currentReel.title}
            />

            <div className="macro-video-hud">
              <div className="macro-hud-left">
                <button
                  type="button"
                  className="macro-ctrl-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause macro reel' : 'Play macro reel'}
                >
                  {isPlaying ? (
                    <Pause size={14} aria-hidden="true" />
                  ) : (
                    <Play size={14} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  className="macro-ctrl-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute macro reel' : 'Mute macro reel'}
                >
                  {isMuted ? (
                    <VolumeX size={14} aria-hidden="true" />
                  ) : (
                    <Volume2 size={14} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  className="macro-speed-pill"
                  onClick={cycleRate}
                  aria-label={`Playback speed ${PLAYBACK_RATES[rateIdx]}x`}
                >
                  {PLAYBACK_RATES[rateIdx]}x Speed
                </button>
              </div>
              <span className="macro-timecode">
                {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
              </span>
            </div>
          </div>

          {/* Right Column: Chapters + 3 Hydrostatic Telemetry Cards + Action Bar */}
          <div className="macro-telemetry-col">
            <div className="macro-chapters-card mirror-glass-card">
              <div className="macro-chapters-head">
                <span className="cosmic-mono-tag">REEL CHAPTERS &amp; DIAGNOSTICS</span>
                <h3>{currentReel.title}</h3>
                <p>{currentReel.subtitle}</p>
              </div>

              <div className="macro-markers-grid">
                {currentReel.markers.map((m) => {
                  const isNear = Math.abs(currentTime - m.timeSec) < 3.2;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => jumpToMarker(m.timeSec)}
                      className={`macro-marker-btn ${isNear ? 'is-current' : ''}`}
                    >
                      <span className="marker-time">{m.label}</span>
                      <span className="marker-desc">{m.detail}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="macro-spec-trio">
              <div className="macro-spec-card mirror-glass-card">
                <Droplets size={18} className="text-violet-glow" aria-hidden="true" />
                <strong>10 ATM</strong>
                <span>Hydrostatic</span>
              </div>

              <div className="macro-spec-card mirror-glass-card">
                <ShieldCheck size={18} className="text-violet-glow" aria-hidden="true" />
                <strong>Hermetic</strong>
                <span>Screw-Down Case</span>
              </div>

              <div className="macro-spec-card mirror-glass-card">
                <Activity size={18} className="text-violet-glow" aria-hidden="true" />
                <strong>Witschi X1</strong>
                <span>Acoustic Reg.</span>
              </div>
            </div>

            <div className="macro-cta-banner mirror-glass-card">
              <div>
                <strong>Watch Care Centre Ltd · Church Street NW8</strong>
                <p>All tests performed on-site with certificate of water resistance.</p>
              </div>
              <button
                type="button"
                className="btn-cosmic-primary"
                onClick={onBookWaterSealTest}
              >
                <span>BOOK WATER SEAL TEST</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

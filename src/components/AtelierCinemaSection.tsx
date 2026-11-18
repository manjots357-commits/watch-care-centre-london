import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Droplets,
  ShieldCheck,
  Activity,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface AtelierCinemaSectionProps {
  onBookService: () => void;
  onSelectService?: (serviceName: string) => void;
}

const CHAPTERS = [
  {
    time: 0,
    title: 'Hydrostatic Water Testing',
    subtitle: 'Dual-Chamber Hyperbaric Verification',
    badge: '10 ATM Pressure',
    description:
      'High-speed capture of surface water tension and bezel seal integrity under heavy water flow, testing synthetic crown gaskets and crystal I-rings.',
  },
  {
    time: 2,
    title: 'Engraved Caseback & Hermetic Seal',
    subtitle: 'Arctic Expedition Reference',
    badge: 'Hermetic Screw-Down',
    description:
      'Inspection of detailed caseback relief engraving, threading cleanliness, and high-purity Fomblin barrier grease application on caseback O-rings.',
  },
  {
    time: 4,
    title: 'Automatic Calibre Oscillation',
    subtitle: 'Balance Wheel Kinematics',
    badge: '28,800 VPH (4 Hz)',
    description:
      'Master watchmaker bench regulation under studio illumination, inspecting beat error and free-sprung amplitude stability.',
  },
  {
    time: 6,
    title: 'Extreme Climate Endurance',
    subtitle: 'Thermal Shock Resistance',
    badge: '-30°C Cold Tolerance',
    description:
      'Viscosity stability testing of synthetic Swiss horological lubricants under simulated arctic frost and rapid condensation shifts.',
  },
];

export default function AtelierCinemaSection({ onBookService, onSelectService }: AtelierCinemaSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }

      let idx = 0;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        if (video.currentTime >= CHAPTERS[i].time - 0.2) {
          idx = i;
          break;
        }
      }
      setActiveChapterIndex(idx);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    if (!isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const cyclePlaybackSpeed = () => {
    if (!videoRef.current) return;
    const speeds = [1.0, 0.5, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section id="atelier-film" className="py-20 md:py-28 border-t border-white/10 relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#070709] via-[#09090d] to-[#070709]">
      {/* Subtle warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Workshop Cinema Reel</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Church Street NW8</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Hydrostatic Testing & Caseback Craft.
            </h2>
          </div>
          <p className="text-zinc-300 text-sm max-w-md font-sans leading-relaxed">
            Witness high-precision water resistance testing, laser caseback relief inspection, and high-beat automatic regulation captured at our London atelier.
          </p>
        </motion.div>

        {/* Interactive Theater Container */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl p-6 md:p-8 bg-[#0c0c10]/95 border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative"
        >
          {/* Left Column: Portrait Cinematic Reel Player */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-[#070709] group">
              <video
                ref={videoRef}
                src="/assets/video/waterproof_horology_reel.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />

              {/* Subtle Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/95 via-transparent to-[#070709]/50 pointer-events-none" />

              {/* Floating Top Reel Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-200">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101015]/85 border border-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>4K MACRO RECORDING</span>
                </div>
                <div className="px-2 py-1 rounded-full bg-[#101015]/85 border border-white/10 backdrop-blur-md">
                  {playbackSpeed}x
                </div>
              </div>

              {/* In-Video Bottom Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2.5 z-20">
                {/* Time progress bar */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    handleSeek(pos * (duration || 10));
                  }}
                  className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden cursor-pointer relative"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#f5eedb] transition-all duration-100"
                    style={{ width: `${((currentTime || 0) / (duration || 10)) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="p-2 rounded-lg bg-[#141418]/90 hover:bg-[#202028] border border-white/10 text-[#f5eedb] transition-all cursor-pointer shadow-md"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="p-2 rounded-lg bg-[#141418]/90 hover:bg-[#202028] border border-white/10 text-[#f5eedb] transition-all cursor-pointer shadow-md"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={cyclePlaybackSpeed}
                      aria-label="Toggle playback speed"
                      className="px-2 py-1 rounded-lg bg-[#141418]/90 hover:bg-[#202028] border border-white/10 text-[11px] font-mono text-[#d4af37] transition-all cursor-pointer shadow-md"
                    >
                      {playbackSpeed}x Speed
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-zinc-400">
                      {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                    </span>
                    <button
                      onClick={toggleFullscreen}
                      aria-label="Toggle fullscreen"
                      className="p-2 rounded-lg bg-[#141418]/90 hover:bg-[#202028] border border-white/10 text-[#f5eedb] transition-all cursor-pointer shadow-md"
                    >
                      {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Horology Inspection & Chapter Breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Active Chapter Highlight Header */}
              <div className="p-5 rounded-2xl bg-[#121216]/90 border border-white/10 shadow-lg mb-6 backdrop-blur-md border-t-[#d4af37]/35">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                    <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider">
                      Current Inspection Phase
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#f5eedb] border border-[#d4af37]/40">
                    {activeChapter.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1.5">
                  {activeChapter.title}
                </h3>
                <p className="text-xs text-[#d4af37] font-mono tracking-wider mb-3">
                  {activeChapter.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {activeChapter.description}
                </p>
              </div>

              {/* 4 Interactive Chapter Cue Buttons */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                  Reel Chapters & Diagnostics
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CHAPTERS.map((ch, idx) => {
                    const isActive = activeChapterIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSeek(ch.time)}
                        className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-[#181820] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#d4af37]'
                            : 'bg-[#101015]/80 border-white/10 hover:border-[#d4af37]/40 hover:bg-[#14141a]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-mono font-bold text-[#d4af37]">
                              0{idx + 1}.
                            </span>
                            <span className="text-xs font-serif font-bold text-white line-clamp-1">
                              {ch.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400 block">
                            Atelier Marker: 00:0{ch.time}s
                          </span>
                        </div>
                        <span className="text-xs text-[#d4af37]">
                          {isActive ? <Activity className="w-4 h-4 text-[#d4af37] animate-pulse" /> : <ArrowRight className="w-3.5 h-3.5 opacity-50" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Atelier Technical Badges Bar */}
            <div className="pt-4 border-t border-white/10">
              <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                <div className="p-3 rounded-xl bg-[#101015] border border-white/10">
                  <Droplets className="w-4 h-4 text-[#d4af37] mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">10 ATM</span>
                  <span className="text-[10px] font-mono text-zinc-400">Hydrostatic</span>
                </div>
                <div className="p-3 rounded-xl bg-[#101015] border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37] mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Hermetic</span>
                  <span className="text-[10px] font-mono text-zinc-400">Screw-Down Case</span>
                </div>
                <div className="p-3 rounded-xl bg-[#101015] border border-white/10">
                  <Sparkles className="w-4 h-4 text-[#d4af37] mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Witschi X1</span>
                  <span className="text-[10px] font-mono text-zinc-400">Acoustic Reg.</span>
                </div>
              </div>

              {/* Consultation Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-zinc-300 font-sans">
                  <span className="text-white font-medium block">Watch Care Centre Ltd · Church Street NW8</span>
                  <span className="text-zinc-400">All tests performed on-site with certificate of water resistance.</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (onSelectService) onSelectService('Water Resistance & Hyperbaric Reseal');
                      else onBookService();
                    }}
                    className="btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Water Seal Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

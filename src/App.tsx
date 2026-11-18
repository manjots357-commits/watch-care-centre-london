/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import ConceptBanner from './components/ConceptBanner.tsx';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import CalibreStudioSection from './components/CalibreStudioSection.tsx';
import AtelierCinemaSection from './components/AtelierCinemaSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import BrandSpecialtiesSection from './components/BrandSpecialtiesSection.tsx';
import CraftsmanshipGallery from './components/CraftsmanshipGallery.tsx';
import ReviewsSection from './components/ReviewsSection.tsx';
import EnquirySection from './components/EnquirySection.tsx';
import Footer from './components/Footer.tsx';
import DiagnosticModal from './components/DiagnosticModal.tsx';
import GlobalCosmicCanvas from './components/GlobalCosmicCanvas.tsx';
import LuxuryMetricsDock from './components/LuxuryMetricsDock.tsx';
import { useSmoothScrollAnd3D } from './utils/useSmoothScrollAnd3D.ts';

export default function App() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Complete Mechanical Overhaul');
  const [selectedBrand, setSelectedBrand] = useState<string>('Rolex');
  
  // Technical Pillar 9: Lenis Butter-Smooth Inertia Scrolling & GSAP ScrollTrigger Synchronization
  useSmoothScrollAnd3D();
  
  // Global background video state
  const globalVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches && globalVideoRef.current) {
      globalVideoRef.current.pause();
      setIsVideoPlaying(false);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches && globalVideoRef.current) {
        globalVideoRef.current.pause();
        setIsVideoPlaying(false);
      } else if (!e.matches && globalVideoRef.current) {
        globalVideoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Ensure background video plays automatically on load
  useEffect(() => {
    if (globalVideoRef.current && !isReducedMotion) {
      globalVideoRef.current.play().catch(() => {});
    }
  }, [isReducedMotion]);

  const handleTogglePlayback = () => {
    if (!globalVideoRef.current) return;
    if (isVideoPlaying) {
      globalVideoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      globalVideoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCalibreStudio = () => {
    const el = document.getElementById('calibre-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCinema = () => {
    const el = document.getElementById('atelier-film');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromSection = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToEnquiry();
  };

  const handleSelectBrandFromSection = (brandName: string) => {
    setSelectedBrand(brandName);
    scrollToEnquiry();
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-[#f5eedb] relative">
      {/* =========================================================================
          FULL-SCREEN CINEMATIC BACKGROUND VIDEO ACROSS THE ENTIRE WEBSITE
          - Covers 100vw x 100vh viewport
          - CSS object-fit: cover and object-position: center
          - autoPlay, muted, loop, playsInline
          - Subtle black overlay & vignette for crystal clarity
          - Reduced-motion fallback & responsive poster
          ========================================================================= */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {!isReducedMotion && (
          <video
            ref={globalVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/video/hero_poster.jpg"
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          >
            <source src="/assets/video/full_background.mp4" type="video/mp4" />
            <source src="/assets/aistudio/FULL_BACKGROUND__ab096e04.mp4" type="video/mp4" />
            <img
              src="/assets/video/hero_poster.jpg"
              alt="Luxury chronograph watch precision movement"
              className="w-full h-full object-cover object-center"
            />
          </video>
        )}

        {/* Fallback Static Poster for Reduced Motion */}
        {isReducedMotion && (
          <img
            src="/assets/video/hero_poster.jpg"
            alt="Luxury chronograph watch precision movement"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08]"
          />
        )}

        {/* Subtle cinematic black vignette preserving crystal clarity of the full background video */}
        {/* 1. Gentle top & bottom fade for navigation and footer contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/70 via-black/25 to-[#070709]/85 pointer-events-none" />
        {/* 2. Soft radial vignette centering focus on the chronograph */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(7,7,9,0.65)_100%)] pointer-events-none" />
      </div>

      {/* Full-Viewport Global 3D WebGL Canvas: Micro champagne & silver dust particles */}
      <GlobalCosmicCanvas />

      {/* Content wrapper sitting proudly above the full-screen background video & 3D canvas */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Redesign Concept Notice Banner */}
        <ConceptBanner />

        {/* 2. Top Navigation Bar */}
        <Navbar
          onOpenBooking={scrollToEnquiry}
          onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
          onOpenCinema={scrollToCinema}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 3. Hero Section with 100vw x 100vh Fullscreen Cinematic Experience */}
          <HeroSection
            isVideoPlaying={isVideoPlaying}
            onTogglePlayback={handleTogglePlayback}
            onBookService={scrollToEnquiry}
            onExploreCalibre={scrollToCalibreStudio}
          />

          {/* 3.1. Floating 3D Horological Benchmarks & Quick Diagnostic Dock */}
          <LuxuryMetricsDock
            onSelectService={handleSelectServiceFromSection}
            onSelectBrand={handleSelectBrandFromSection}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
          />

          {/* 4. Interactive 3D Calibre Studio */}
          <CalibreStudioSection
            onBookService={scrollToEnquiry}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
          />

          {/* 5. User Uploaded Macro Watch Cinema Reel (Hydrostatic & Caseback Craft) */}
          <AtelierCinemaSection
            onBookService={scrollToEnquiry}
            onSelectService={handleSelectServiceFromSection}
          />

          {/* 6. About Watch Care Centre Ltd */}
          <AboutSection />

          {/* 7. Luxury Watch Services */}
          <ServicesSection onSelectService={handleSelectServiceFromSection} />

          {/* 8. Rolex, Patek Philippe & Richard Mille Specialties */}
          <BrandSpecialtiesSection onSelectBrand={handleSelectBrandFromSection} />

          {/* 9. Watch Repair Craftsmanship Gallery */}
          <CraftsmanshipGallery />

          {/* 10. Verified Customer Reviews */}
          <ReviewsSection />

          {/* 11. Contact & Appointment Enquiry Form */}
          <EnquirySection
            prefilledService={selectedService}
            prefilledBrand={selectedBrand}
          />
        </main>

        {/* 11. Footer */}
        <Footer />

        {/* Interactive Timepiece Diagnostic Modal */}
        <DiagnosticModal
          isOpen={isDiagnosticOpen}
          onClose={() => setIsDiagnosticOpen(false)}
          onSelectService={(service) => {
            setSelectedService(service);
            scrollToEnquiry();
          }}
        />
      </div>
    </div>
  );
}

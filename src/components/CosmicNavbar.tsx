import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Film, Menu, Phone, X } from 'lucide-react';
import { ATELIER_INFO } from '../data/watchCareData';

interface CosmicNavbarProps {
  activeSection: string;
  isDrawerOpen: boolean;
  onToggleDrawer: (open: boolean) => void;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS: { id: string; label: string; isReel?: boolean }[] = [
  { id: 'studio', label: '3D CALIBRE' },
  { id: 'macro-reel', label: 'MACRO REEL', isReel: true },
  { id: 'atelier', label: 'ATELIER' },
  { id: 'services', label: 'SERVICES' },
  { id: 'brands', label: 'MARQUES' },
  { id: 'reviews', label: 'REVIEWS' },
  { id: 'contact', label: 'CONTACT' },
];

export const CosmicNavbar: React.FC<CosmicNavbarProps> = ({
  activeSection,
  isDrawerOpen,
  onToggleDrawer,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Manage inert state on underlying content when mobile drawer opens (`accessibility` guide)
  useEffect(() => {
    const inertTarget = document.getElementById('page-inert-region');
    if (isDrawerOpen) {
      inertTarget?.setAttribute('inert', '');
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      inertTarget?.removeAttribute('inert');
      document.body.style.overflow = '';
    }
    return () => {
      inertTarget?.removeAttribute('inert');
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggleDrawer(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, onToggleDrawer]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (isDrawerOpen) {
      onToggleDrawer(false);
    }
    onNavigate(sectionId);
  };

  return (
    <header className={`cosmic-header-shell ${isScrolled ? 'is-scrolled' : ''}`}>
      <a href="#main-content" className="skip-link visually-hidden">
        Skip to main content
      </a>

      <div className="container-cosmic floating-capsule-wrap">
        <div className="cosmic-capsule-bar">
          <a
            href="#hero"
            className="cosmic-brand-mark"
            onClick={(e) => handleLinkClick(e, 'hero')}
          >
            <span className="brand-crest-emblem" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
                <circle cx="16" cy="16" r="12.5" stroke="currentColor" strokeWidth="1.4" />
                <circle
                  cx="16"
                  cy="16"
                  r="8.2"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2.2 2.2"
                />
                <path
                  d="M16 7.5V16L21.5 19.2"
                  stroke="#f3c677"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="2" fill="#f3c677" />
              </svg>
            </span>
            <span className="brand-wordmark-stack">
              <span className="brand-serif-primary">{ATELIER_INFO.brandTitle}</span>
              <span className="brand-sans-city">HATTON GARDEN · {ATELIER_INFO.brandCity} EC1N</span>
            </span>
          </a>

          <nav aria-label="Primary" className="cosmic-desktop-nav">
            <ul role="list" className="cosmic-nav-list">
              {NAV_LINKS.map((item) => {
                const isCurrent = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      aria-current={isCurrent ? 'location' : undefined}
                      className={`cosmic-nav-link ${item.isReel ? 'is-reel-accent' : ''} ${
                        isCurrent ? 'is-active' : ''
                      }`}
                    >
                      {item.isReel && <Film size={12} aria-hidden="true" />}
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="capsule-right-actions">
            <a href={ATELIER_INFO.phoneHref} className="capsule-phone-chip">
              <Phone size={13} aria-hidden="true" />
              <span>EC1N BENCH</span>
            </a>

            <button
              type="button"
              className="capsule-book-cta"
              onClick={() => onNavigate('contact')}
            >
              <span>BOOK SERVICE</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>

            <button
              ref={menuBtnRef}
              type="button"
              className="cosmic-mobile-trigger"
              aria-expanded={isDrawerOpen}
              aria-controls="cosmic-mobile-drawer"
              aria-label="Open navigation menu"
              onClick={() => onToggleDrawer(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="cosmic-drawer-backdrop"
          onClick={() => {
            onToggleDrawer(false);
            menuBtnRef.current?.focus();
          }}
        >
          <div
            id="cosmic-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="cosmic-mobile-drawer mirror-glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-top-row">
              <span className="brand-serif-primary">PERI WATCH CARE</span>
              <button
                ref={closeBtnRef}
                type="button"
                className="drawer-close-btn"
                aria-label="Close navigation menu"
                onClick={() => {
                  onToggleDrawer(false);
                  menuBtnRef.current?.focus();
                }}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile Primary">
              <ul role="list" className="drawer-nav-list">
                {NAV_LINKS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className={`drawer-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
                    >
                      {item.isReel && <Film size={15} aria-hidden="true" />}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="drawer-footer-meta">
              <p>{ATELIER_INFO.addressLine1}</p>
              <a href={ATELIER_INFO.phoneHref}>{ATELIER_INFO.phoneDisplay}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

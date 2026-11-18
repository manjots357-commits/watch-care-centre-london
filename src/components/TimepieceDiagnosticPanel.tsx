import React, { useState } from 'react';
import { Activity, ArrowRight, Clock, ShieldAlert, Wrench } from 'lucide-react';
import { DIAGNOSTIC_SYMPTOMS } from '../data/watchCareData';

interface TimepieceDiagnosticPanelProps {
  onSelectDiagnosticService: (serviceTitle: string, symptomSummary: string) => void;
}

export const TimepieceDiagnosticPanel: React.FC<TimepieceDiagnosticPanelProps> = ({
  onSelectDiagnosticService,
}) => {
  const [selectedId, setSelectedId] = useState<string>(DIAGNOSTIC_SYMPTOMS[0].id);
  const current =
    DIAGNOSTIC_SYMPTOMS.find((item) => item.id === selectedId) ?? DIAGNOSTIC_SYMPTOMS[0];

  return (
    <section id="diagnostic" className="cosmic-section diagnostic-section">
      <div className="container-cosmic">
        <div className="section-header-split" data-reveal>
          <div>
            <span className="cosmic-eyebrow">
              <Activity size={13} aria-hidden="true" />
              <span>INTERACTIVE BENCH TELEMETRY · SYMPTOM TRIAGE</span>
            </span>
            <h2 className="cosmic-h2">Timepiece Diagnostic Triage.</h2>
          </div>
          <p className="cosmic-lead">
            Select an observed symptom below to inspect our Church Street watchmakers’ recommended
            diagnostic protocol, test apparatus, and estimated workshop turnaround.
          </p>
        </div>

        <div className="diagnostic-interactive-grid" data-reveal>
          <div className="diagnostic-cards-list" role="group" aria-label="Observed timepiece symptoms">
            {DIAGNOSTIC_SYMPTOMS.map((sym) => {
              const active = sym.id === selectedId;
              return (
                <button
                  key={sym.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedId(sym.id)}
                  className={`diagnostic-symptom-card mirror-glass-card ${
                    active ? 'is-selected' : ''
                  }`}
                >
                  <div className="diag-card-top">
                    <span className="cosmic-mono-tag">{sym.telemetryTag}</span>
                    <span className="diag-turnaround">{sym.estimatedTurnaround}</span>
                  </div>
                  <h3>{sym.symptomTitle}</h3>
                  <p>{sym.observedSigns}</p>
                </button>
              );
            })}
          </div>

          <div className="diagnostic-output-panel mirror-glass-card">
            <span className="cosmic-mono-tag">RECOMMENDED ATELIER PROTOCOL</span>
            <h3 className="diag-output-title">{current.recommendedService}</h3>
            <p className="diag-output-desc">{current.observedSigns}</p>

            <div className="diag-meta-boxes">
              <div className="diag-meta-item">
                <Wrench size={16} className="text-violet-glow" aria-hidden="true" />
                <div>
                  <span className="diag-meta-label">BENCH APPARATUS</span>
                  <strong>{current.benchApparatus}</strong>
                </div>
              </div>

              <div className="diag-meta-item">
                <Clock size={16} className="text-gold-glow" aria-hidden="true" />
                <div>
                  <span className="diag-meta-label">ESTIMATED TURNAROUND</span>
                  <strong>{current.estimatedTurnaround}</strong>
                </div>
              </div>

              <div className="diag-meta-item is-advisory">
                <ShieldAlert size={16} className="text-violet-glow" aria-hidden="true" />
                <div>
                  <span className="diag-meta-label">HOROLOGIST ADVISORY</span>
                  <p>{current.urgencyNote}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-cosmic-primary full-width-btn"
              onClick={() =>
                onSelectDiagnosticService(
                  current.recommendedService,
                  `Diagnostic Triage: ${current.symptomTitle}`
                )
              }
            >
              <span>BOOK THIS DIAGNOSTIC ASSESSMENT</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

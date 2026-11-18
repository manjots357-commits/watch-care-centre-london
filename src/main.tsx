import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/cosmic.css';

class RootSafetyBoundary extends Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100svh',
            background: '#07040e',
            color: '#f8f6ff',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            fontFamily: 'Georgia, serif',
          }}
        >
          <div style={{ maxWidth: '38rem', textAlign: 'center' }}>
            <h1 style={{ color: '#c084fc', marginBottom: '0.75rem' }}>
              Peri Watch Care Ltd — London EC1N
            </h1>
            <p style={{ color: '#d4cce6', marginBottom: '1.25rem' }}>
              New House, 67–68 Hatton Garden, London EC1N 8JY ·{' '}
              <a href="tel:+442072429998" style={{ color: '#f3c677' }}>
                020 7242 9998
              </a>
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root mount container #root was not found in index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RootSafetyBoundary>
      <App />
    </RootSafetyBoundary>
  </React.StrictMode>
);

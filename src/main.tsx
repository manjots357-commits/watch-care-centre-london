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
              Watch Care Centre Ltd — London NW8
            </h1>
            <p style={{ color: '#d4cce6', marginBottom: '1.25rem' }}>
              Shop G105, 13–25 Church Street, London NW8 8DT ·{' '}
              <a href="tel:+447737364429" style={{ color: '#f3c677' }}>
                +44 7737 364429
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

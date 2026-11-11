import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep the error visible in browser developer tools for diagnosis.
    console.error('BD Legal Assistant render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#F5F7FA', color: '#101C35', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
          <section style={{ maxWidth: 420 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>Something went wrong</h1>
            <p style={{ marginTop: 12, lineHeight: 1.6 }}>The page could not load correctly. Please reload the website. Your saved information has not been intentionally deleted.</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: '12px 20px', borderRadius: 10, border: 0, background: '#101C35', color: '#D4AF37', fontWeight: 600 }}>
              Reload website
            </button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

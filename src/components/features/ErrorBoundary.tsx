import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Fallback UI personnalisé. Si absent, affiche le fallback par défaut. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary — capture les erreurs React dans l'arbre enfant.
 *
 * Usage :
 *   <ErrorBoundary>
 *     <MyComponent />
 *   </ErrorBoundary>
 *
 *   <ErrorBoundary fallback={<CustomError />}>
 *     <MyComponent />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
    // TODO: Send to error tracking service (Sentry, etc.) in production
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <section className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-6xl font-bold opacity-10">500</p>
          <p className="opacity-50">Something went wrong.</p>
          <button
            onClick={this.handleReset}
            className="underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
          >
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

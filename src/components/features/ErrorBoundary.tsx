import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Custom fallback UI. If absent, displays the default fallback. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary — catches React errors in the child tree.
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
        <section className="flex min-h-screen flex-col items-center justify-center gap-4">
          <p className="text-6xl font-bold opacity-10">500</p>
          <p className="opacity-50">Something went wrong.</p>
          <button
            onClick={this.handleReset}
            className="underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
          >
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

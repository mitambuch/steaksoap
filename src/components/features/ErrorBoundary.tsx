import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Custom fallback UI. If absent, displays the default fallback. */
  fallback?: ReactNode;
  /** When any value changes, the boundary resets (e.g. pass [pathname]). */
  resetKeys?: ReadonlyArray<unknown>;
}

interface State {
  hasError: boolean;
  error?: Error | undefined;
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

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      this.props.resetKeys.some((key, i) => key !== prevProps.resetKeys?.[i])
    ) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
    // Add your error tracking service here (Sentry, etc.) for production
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <section
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-4"
        >
          <h1 className="text-6xl font-bold opacity-10">500</h1>
          <p className="opacity-80">Something went wrong.</p>
          <button
            type="button"
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

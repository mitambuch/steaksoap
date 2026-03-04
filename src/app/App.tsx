import { ErrorBoundary } from '@components/features/ErrorBoundary';
import { ToastContainer } from '@components/ui/Toast';
import { ThemeProvider } from '@context/ThemeContext';
import { BrowserRouter, useLocation } from 'react-router-dom';

import AppRoutes from './routes';

function AppContent() {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary resetKeys={[pathname]}>
      <AppRoutes />
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

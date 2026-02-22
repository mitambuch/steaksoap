import { ErrorBoundary } from '@components/features/ErrorBoundary';
import { ToastContainer } from '@components/ui/Toast';
import { ThemeProvider } from '@context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

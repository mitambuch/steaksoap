import { ErrorBoundary } from '@components/features/ErrorBoundary';
import { ThemeProvider } from '@context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

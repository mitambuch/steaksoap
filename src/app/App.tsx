import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@components/features/ErrorBoundary';
import AppRoutes from './routes';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Providers globaux ici (Theme, Auth, etc.) */}
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

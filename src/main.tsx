import './index.css';
import '@config/i18n'; // WHY: initialise i18next before React renders so t() works on first paint

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';

const root = document.getElementById('root');
if (!root) throw new Error('[main] #root element not found in index.html');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

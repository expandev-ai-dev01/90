import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@/assets/styles/globals.css';

/**
 * @entry main
 * @summary Application entry point that initializes React and renders the root App component
 * @type application-entry
 * @category core
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { mountShell } from '~/styles/scheme';
import '~/styles/global.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Elemento #root ausente');
}

const matchesDark =
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

mountShell(document.documentElement, root, matchesDark);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Elemento #root ausente');
}

createRoot(root).render(
  <StrictMode>
    <div />
  </StrictMode>,
);

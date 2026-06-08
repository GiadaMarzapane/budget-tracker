// src/main.tsx — Vite entry point.

import { StrictMode } from 'react';
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// ── Convex client wiring ────────────────────────────────────────────────────
// When you're ready to hook up the backend, uncomment the block below and
// wrap <App /> in <ConvexProvider client={convex}>.
//
import { ConvexReactClient } from 'convex/react';
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

createRoot(root).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </StrictMode>,
);

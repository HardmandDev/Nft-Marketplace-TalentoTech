import { Buffer } from 'buffer';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './index.css'

globalThis.Buffer = Buffer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

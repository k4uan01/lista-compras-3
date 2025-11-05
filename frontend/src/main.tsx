import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🚀 App iniciando...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Elemento root não encontrado!');
  throw new Error('Root element not found');
}

console.log('✅ Root element encontrado, renderizando App...');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

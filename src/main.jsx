import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Punto de entrada de la app. Aquí se monta <App/> dentro del div #root
// StrictMode ayuda a detectar problemas potenciales en desarrollo.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import RickMortyPage from './pages/RickMortyPage'
import UsersPage from './pages/UsersPage'

// Componente principal de la aplicación.
// Usa React Router para navegación entre páginas:
// - "/" → Rick and Morty (API pública)
// - "/users" → CRUD de usuarios (backend local)

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-[#0b132b] text-white'>
        {/* Navbar con navegación entre rutas */}
        <Navbar />
        
        {/* Definición de rutas */}
        <Routes>
          {/* Ruta principal: Rick and Morty */}
          <Route path="/" element={<RickMortyPage />} />
          
          {/* Ruta de CRUD de usuarios */}
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

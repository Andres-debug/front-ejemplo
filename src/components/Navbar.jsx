import { Link, useLocation } from 'react-router-dom';

// Componente de navegación con React Router
// Usa Link en lugar de botones para navegación real con URLs
const Navbar = () => {
  const location = useLocation();

  // Función helper para determinar si una ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1c2541] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Título */}
          <h1 className="text-2xl font-bold">
            {isActive('/') ? '🛸 Rick and Morty' : '👥 Gestión de Usuarios'}
          </h1>

          {/* Links de navegación */}
          <div className="flex gap-4">
            <Link
              to="/"
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                isActive('/')
                  ? 'bg-[#5bc0be] text-white'
                  : 'bg-[#3a506b] text-gray-300 hover:bg-[#4a6078]'
              }`}
            >
              Rick & Morty
            </Link>
            <Link
              to="/users"
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                isActive('/users')
                  ? 'bg-[#5bc0be] text-white'
                  : 'bg-[#3a506b] text-gray-300 hover:bg-[#4a6078]'
              }`}
            >
              Usuarios CRUD
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

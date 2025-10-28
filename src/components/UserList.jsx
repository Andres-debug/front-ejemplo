import { useEffect } from 'react';
import useUserStore from '../store/useUserStore';

// Componente que muestra la lista de usuarios con opciones de editar y eliminar
// Consume el store de Zustand para acceder al estado global y las acciones
const UserList = () => {
  // Obtenemos usuarios, acciones y estado de loading del store
  const { users, loading, error, fetchUsers, removeUser, setSelectedUser } = useUserStore();

  // Efecto que carga los usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Manejador para editar un usuario
  const handleEdit = (user) => {
    // Guardamos el usuario seleccionado en el store
    // El formulario detectará este cambio y se llenará automáticamente
    setSelectedUser(user);
    // Scroll suave hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manejador para eliminar un usuario
  const handleDelete = async (id, nombre) => {
    // Confirmación antes de eliminar
    if (window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      try {
        await removeUser(id);
        alert('Usuario eliminado exitosamente');
      } catch {
        alert('Error al eliminar el usuario');
      }
    }
  };

  // Mostrar loader mientras se cargan los datos
  if (loading && (!users || users.length === 0)) {
    return (
      <div className="bg-[#1c2541] rounded-2xl p-6">
        <p className="text-center text-gray-400">Cargando usuarios...</p>
      </div>
    );
  }

  // Mostrar mensaje de error si ocurre algún problema
  if (error) {
    return (
      <div className="bg-[#1c2541] rounded-2xl p-6">
        <p className="text-center text-red-400">{error}</p>
        <button 
          onClick={fetchUsers}
          className="mt-4 mx-auto block bg-[#5bc0be] hover:bg-[#4a9f9d] 
                   text-white px-4 py-2 rounded-lg transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Mostrar mensaje si no hay usuarios o users es undefined
  if (!users || users.length === 0) {
    return (
      <div className="bg-[#1c2541] rounded-2xl p-6">
        <p className="text-center text-gray-400">
          No hay usuarios registrados. ¡Crea el primero!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1c2541] rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      
      {/* Grid responsivo de tarjetas de usuario */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(users) && users.map((user) => (
          <div 
            key={user.id} 
            className="bg-[#0b132b] rounded-xl p-4 border border-[#3a506b] 
                     hover:border-[#5bc0be] transition"
          >
            {/* Información del usuario */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {user.nombre}
              </h3>
              <p className="text-gray-400 text-sm break-all">
                {user.correo}
              </p>
              {/* Mostramos el número de posts si existen */}
              {user.Posts && user.Posts.length > 0 && (
                <p className="text-[#5bc0be] text-xs mt-2">
                  📝 {user.Posts.length} post{user.Posts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="flex-1 bg-[#5bc0be] hover:bg-[#4a9f9d] text-white 
                         py-2 px-3 rounded-lg text-sm font-medium transition"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => handleDelete(user.id, user.nombre)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white 
                         py-2 px-3 rounded-lg text-sm font-medium transition"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de loading durante operaciones */}
      {loading && (
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Actualizando...</p>
        </div>
      )}
    </div>
  );
};

export default UserList;

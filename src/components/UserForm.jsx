import { useState, useEffect } from 'react';
import useUserStore from '../store/useUserStore';

// Componente de formulario para crear y editar usuarios
// Usa Zustand para gestionar el estado global y las operaciones CRUD
const UserForm = () => {
  // Obtenemos las acciones y el usuario seleccionado del store de Zustand
  const { addUser, updateUser, selectedUser, setSelectedUser } = useUserStore();
  
  // Estado local del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '', // Añadimos el campo password requerido por el backend
  });

  // Efecto para cargar datos cuando se selecciona un usuario para editar
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nombre: selectedUser.nombre || '',
        correo: selectedUser.correo || '',
        password: '', // No mostramos la contraseña por seguridad, se deja vacía para editar
      });
    } else {
      // Limpia el formulario cuando no hay usuario seleccionado
      setFormData({ nombre: '', correo: '', password: '' });
    }
  }, [selectedUser]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre.trim() || !formData.correo.trim()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Para creación, la contraseña es obligatoria
    if (!selectedUser && !formData.password.trim()) {
      alert('La contraseña es obligatoria para crear un nuevo usuario');
      return;
    }

    try {
      if (selectedUser) {
        // Modo edición: actualiza usuario existente
        // Solo enviamos la contraseña si se proporcionó una nueva
        const updateData = {
          nombre: formData.nombre,
          correo: formData.correo,
        };
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }
        await updateUser(selectedUser.id, updateData);
        alert('Usuario actualizado exitosamente');
      } else {
        // Modo creación: añade nuevo usuario
        console.log('Datos del formulario antes de enviar:', formData); // Log para debugging
        await addUser(formData);
        alert('Usuario creado exitosamente');
      }
      
      // Limpia el formulario tras el éxito
      setFormData({ nombre: '', correo: '', password: '' });
      setSelectedUser(null);
    } catch {
      alert('Error al guardar el usuario');
    }
  };

  // Manejador para cancelar la edición
  const handleCancel = () => {
    setFormData({ nombre: '', correo: '', password: '' });
    setSelectedUser(null);
  };

  return (
    <div className="bg-[#1c2541] rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {selectedUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa el nombre"
            className="w-full px-4 py-2 bg-[#0b132b] border border-[#3a506b] rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-[#5bc0be] transition"
          />
        </div>

        {/* Campo de correo */}
        <div>
          <label htmlFor="correo" className="block text-sm font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-2 bg-[#0b132b] border border-[#3a506b] rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-[#5bc0be] transition"
          />
        </div>

        {/* Campo de contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Contraseña {!selectedUser && <span className="text-red-400">*</span>}
            {selectedUser && <span className="text-gray-400 text-xs">(dejar vacío para mantener actual)</span>}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={selectedUser ? "Nueva contraseña (opcional)" : "Ingresa la contraseña"}
            className="w-full px-4 py-2 bg-[#0b132b] border border-[#3a506b] rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-[#5bc0be] transition"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#5bc0be] hover:bg-[#4a9f9d] text-white font-semibold 
                     py-2 px-4 rounded-lg transition duration-200"
          >
            {selectedUser ? 'Actualizar' : 'Crear'}
          </button>
          
          {/* Botón de cancelar solo aparece en modo edición */}
          {selectedUser && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-[#6c757d] hover:bg-[#5a6268] text-white font-semibold 
                       py-2 px-4 rounded-lg transition duration-200"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;

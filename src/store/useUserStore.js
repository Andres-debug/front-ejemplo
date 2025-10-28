// Store de Zustand para gestionar el estado global de usuarios
// Centraliza la lógica de negocio y las llamadas a la API

import { create } from 'zustand';
import * as userService from '../services/userService';

// Hook personalizado que crea el store con Zustand
// Retorna: objeto con estado y acciones para manejar usuarios
const useUserStore = create((set) => ({
  // ========== ESTADO ==========

  // Array de usuarios obtenidos del backend
  users: [],

  // Usuario actualmente seleccionado para editar (null si no hay selección)
  selectedUser: null,

  // Estado de carga para mostrar spinners/loaders
  loading: false,

  // Mensajes de error (null si no hay error)
  error: null,

  // ========== ACCIONES ==========

  // OBTENER TODOS LOS USUARIOS
  // Llama al backend y actualiza el estado con la lista de usuarios
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await userService.getAllUsers();
      set({ users: Array.isArray(users) ? users : [], loading: false });
    } catch {
      set({
        users: [], // Aseguramos que siempre sea un array
        error: 'Error al cargar usuarios',
        loading: false,
      });
    }
  },

  // CREAR NUEVO USUARIO (REGISTRO CON BCRYPT)
  // Parámetro: userData { nombre, correo, password }
  // Usa el endpoint /api/auth/register que hashea la contraseña con bcrypt
  // Añade el nuevo usuario al estado local tras crearlo en el backend
  addUser: async (userData) => {
    console.log('Datos recibidos en addUser (store):', userData); // Log para debugging
    set({ loading: true, error: null });
    try {
      const newUser = await userService.createUser(userData);
      // Agregamos el nuevo usuario al array existente
      set((state) => ({
        users: [...state.users, newUser],
        loading: false,
      }));
      return newUser; // Retornamos para feedback en el componente
    } catch (error) {
      set({
        error: 'Error al crear usuario',
        loading: false,
      });
      throw error;
    }
  },

  // ACTUALIZAR USUARIO EXISTENTE
  // Parámetros: id (number), userData { nombre, correo }
  // Actualiza el usuario en el backend y en el estado local
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      await userService.updateUser(id, userData);
      // Actualizamos el usuario en el array local
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...userData } : user
        ),
        selectedUser: null, // Limpiamos la selección tras actualizar
        loading: false,
      }));
    } catch (error) {
      set({
        error: 'Error al actualizar usuario',
        loading: false,
      });
      throw error;
    }
  },

  // ELIMINAR USUARIO
  // Parámetro: id (number)
  // Elimina el usuario del backend y del estado local
  removeUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await userService.deleteUser(id);
      // Filtramos el usuario eliminado del array local
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: 'Error al eliminar usuario',
        loading: false,
      });
      throw error;
    }
  },

  // SELECCIONAR USUARIO PARA EDICIÓN
  // Parámetro: user (objeto) o null para limpiar selección
  // Guarda el usuario en selectedUser para que el formulario lo use
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  // LIMPIAR ERROR
  // Útil para cerrar mensajes de error en la UI
  clearError: () => {
    set({ error: null });
  },
}));

export default useUserStore;

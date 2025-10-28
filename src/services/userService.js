// Servicio para manejar todas las peticiones HTTP relacionadas con usuarios
// Usa axios para simplificar las llamadas HTTP y el manejo de errores

import axios from 'axios';

// Configuración de axios con URL base del backend
// Todos los endpoints heredarán esta URL base automáticamente
const api = axios.create({
  baseURL: 'http://localhost:4000/api/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

// OBTENER TODOS LOS USUARIOS
// GET /api/user
// Retorna: array de usuarios con sus posts relacionados
export const getAllUsers = async () => {
  try {
    const response = await api.get('/');
    return response.data; // axios ya parsea el JSON automáticamente
  } catch (error) {
    console.error('Error en getAllUsers:', error.response?.data || error.message);
    throw error;
  }
};

// CREAR NUEVO USUARIO
// POST /api/user
// Parámetros: { nombre, correo }
// Retorna: objeto del usuario creado
export const createUser = async (userData) => {
  try {
    const response = await api.post('/', userData);
    return response.data;
  } catch (error) {
    console.error('Error en createUser:', error.response?.data || error.message);
    throw error;
  }
};

// ACTUALIZAR USUARIO EXISTENTE
// PUT /api/user/:id
// Parámetros: id (number), userData { nombre, correo }
// Retorna: mensaje de confirmación
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error en updateUser:', error.response?.data || error.message);
    throw error;
  }
};

// ELIMINAR USUARIO
// DELETE /api/user/:id
// Parámetros: id (number)
// Retorna: mensaje de confirmación
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteUser:', error.response?.data || error.message);
    throw error;
  }
};

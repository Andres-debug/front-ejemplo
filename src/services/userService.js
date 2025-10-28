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

// Configuración separada para autenticación (registro y login)
const authApi = axios.create({
  baseURL: 'http://localhost:4000/api/auth',
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

// CREAR NUEVO USUARIO (REGISTRO CON BCRYPT)
// POST /api/auth/register
// Parámetros: { nombre, correo, password }
// Retorna: objeto del usuario creado con contraseña hasheada
export const createUser = async (userData) => {
  try {
    console.log('Datos originales:', userData);
    
    // Validamos que todos los campos requeridos estén presentes
    if (!userData.nombre || !userData.correo || !userData.password) {
      throw new Error('Faltan campos requeridos: nombre, correo y password son obligatorios');
    }
    
    // Validamos que password no esté vacío
    if (userData.password.trim() === '') {
      throw new Error('La contraseña no puede estar vacía');
    }
    
    // Preparamos los datos exactamente como los espera el endpoint de registro
    const dataToSend = {
      nombre: userData.nombre.trim(),
      correo: userData.correo.trim(),
      password: userData.password.trim()
    };
    
    console.log('Datos enviados al endpoint de registro:', dataToSend);
    
    // CAMBIO IMPORTANTE: usamos authApi y el endpoint /register
    const response = await authApi.post('/register', dataToSend);
    console.log('Respuesta del backend (registro):', response.data);
    
    // El endpoint de registro devuelve { message, user }, extraemos el user
    return response.data.user;
  } catch (error) {
    console.error('Error en createUser (registro):', error.response?.data || error.message);
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

# Front ejemplo – React + Vite + Zustand + Axios# Front ejemplo – React + Vite



Aplicación en React que consume APIs y muestra:Aplicación en React que consume la API pública de Rick and Morty y muestra una lista de personajes. El proyecto fue creado con Vite para un arranque rápido en desarrollo.

1. **Rick and Morty**: Lista de personajes desde API pública

2. **CRUD de Usuarios**: Sistema completo de gestión de usuarios conectado a un backend local## ¿Qué hay en el código?



El proyecto fue creado con **Vite** para desarrollo rápido, usa **Zustand** para gestión de estado global y **axios** para peticiones HTTP.Estructura principal (solo lo relevante):



## ¿Qué hay en el código?- `src/main.jsx`: Punto de entrada. Monta el componente raíz `<App/>` en el DOM y activa `StrictMode`.

- `src/App.jsx`: Componente principal. Gestiona el estado de personajes, llama a la API con `fetch` en un `useEffect` y pasa los datos a la lista.

### Estructura principal- `src/components/Header.jsx`: Cabecera simple que recibe un título por props.

- `src/components/CharacterList.jsx`: Recibe el arreglo de personajes como prop y renderiza una cuadrícula de tarjetas. Muestra un mensaje de carga si no hay datos aún.

```- `src/components/CharacterCard.jsx`: Muestra la información básica de cada personaje (imagen, nombre, especie). Recibe un `character` por props.

src/

├── main.jsx              # Punto de entrada de ReactAdemás, encontrarás comentarios en el código fuente explicando qué hace cada parte.

├── App.jsx               # Componente raíz con navegación entre vistas

├── components/           # Componentes reutilizables## Conceptos clave

│   ├── Header.jsx        # Cabecera de la app

│   ├── CharacterList.jsx # Lista de personajes de Rick & Morty### ¿Qué es un componente?

│   ├── CharacterCard.jsx # Tarjeta individual de personaje

│   ├── UserForm.jsx      # Formulario CRUD de usuarios (con Zustand)Un componente en React es una pieza reutilizable de UI. Puedes pensarlo como una función que recibe entradas (props) y devuelve elementos de interfaz. Ejemplos en este proyecto: `App`, `Header`, `CharacterList`, `CharacterCard`.

│   └── UserList.jsx      # Lista de usuarios con edit/delete (con Zustand)

├── pages/### ¿Qué son las props?

│   └── UsersPage.jsx     # Página que combina formulario y lista

├── services/Las props (propiedades) son los “parámetros” que pasan datos desde un componente padre a un componente hijo. Son inmutables dentro del hijo. Aquí hay dos casos claros:

│   └── userService.js    # Llamadas HTTP con axios al backend

└── store/- `Header` recibe `title` desde `App`.

    └── useUserStore.js   # Store de Zustand para usuarios- `CharacterList` recibe `characters` desde `App` y, a su vez, pasa cada `character` a `CharacterCard`.

```

### ¿Cómo se conecta a una API y se pasan los datos?

### Archivos clave

El flujo es así:

- **`src/main.jsx`**: Punto de entrada. Monta `<App/>` en el DOM con `StrictMode`.

- **`src/App.jsx`**: Componente principal con navegación entre Rick & Morty y CRUD de usuarios.1. `App.jsx` usa `useEffect` para ejecutar una función asíncrona `getCharacters` cuando el componente se monta.

- **`src/store/useUserStore.js`**: Store de Zustand que centraliza el estado de usuarios y las operaciones CRUD.2. `getCharacters` hace un `fetch` a `https://rickandmortyapi.com/api/character`, convierte la respuesta a JSON y guarda `data.results` en el estado `characters` con `setCharacters`.

- **`src/services/userService.js`**: Capa de servicio con axios que se conecta al backend (puerto 4000).3. `App` pasa `characters` como prop a `CharacterList`.

- **`src/components/UserForm.jsx`**: Formulario reactivo que crea/edita usuarios usando el store.4. `CharacterList` hace `.map()` sobre el arreglo y para cada elemento renderiza `CharacterCard`, pasándole `character` por props.

- **`src/components/UserList.jsx`**: Lista que muestra usuarios con botones de editar y eliminar.5. `CharacterCard` muestra la imagen, nombre y especie que recibe por props.



Todos los archivos tienen **comentarios en español** explicando cada parte del código.Referencias rápidas en el código:



## Conceptos clave- Llamada a API y estado: `src/App.jsx`

- Paso de props padre → hijo: `App` → `CharacterList` → `CharacterCard`

### ¿Qué es un componente?- Prop simple de texto: `App` → `Header` (`title`)



Un componente en React es una pieza reutilizable de UI. Puede ser:## Cómo ejecutar el proyecto

- **Funcional**: una función que retorna JSX (todos los componentes de este proyecto).

- **Con estado**: usa hooks como `useState` para manejar datos internos.Requisitos: Node.js 18+ (recomendado) y npm.

- **Con efectos**: usa `useEffect` para ejecutar código al montar/actualizar.

1. Instalar dependencias

Ejemplos en este proyecto: `App`, `Header`, `CharacterList`, `UserForm`, `UserList`.

```powershell

### ¿Qué son las props?npm install

```

Las **props** (propiedades) son los "parámetros" que pasan datos desde un componente padre a un hijo. Son **inmutables** dentro del hijo.

2. Iniciar el servidor de desarrollo

**Ejemplos en el código:**

- `Header` recibe `title` desde `App`.```powershell

- `CharacterList` recibe `characters` desde `App`.npm run dev

- `CharacterCard` recibe cada `character` desde `CharacterList`.```



### ¿Qué es Zustand?3. Abre el enlace que te muestre la terminal (por defecto Vite usa http://localhost:5173).



**Zustand** es una librería de gestión de estado global minimalista para React. Es más simple que Redux.4. Build de producción (opcional)



**Ventajas:**```powershell

- ✅ Menos boilerplate que Reduxnpm run build

- ✅ API simple basada en hooks```

- ✅ No requiere Context Providers

- ✅ Fácil de integrar y testear## Notas y decisiones



**Cómo funciona en este proyecto:**- Se añadió documentación en comentarios dentro de los componentes para facilitar el aprendizaje: estado, efectos, props y flujo de datos.

- Se corrigió una clase CSS en `Header.jsx` (`className`) que tenía un corchete/comilla sin cerrar.

1. **Definimos un store** (`useUserStore.js`) con:- El estilo utiliza clases utilitarias (por ejemplo, colores hex) y un grid simple. Puedes adaptar Tailwind u otra solución si lo deseas.

   - **Estado**: `users`, `selectedUser`, `loading`, `error`

   - **Acciones**: `fetchUsers`, `addUser`, `updateUser`, `removeUser`, `setSelectedUser`## Siguientes pasos sugeridos



2. **Usamos el store** en componentes:- Añadir manejo de errores y estado de carga más completo (por ejemplo, `try/catch`, indicador de loading y empty states diferenciados).

   ```jsx- Paginación y filtros consumiendo parámetros de la API.

   import useUserStore from '../store/useUserStore';- Tipado de props (PropTypes o TypeScript) para mayor robustez.

   
   const { users, fetchUsers, addUser } = useUserStore();
   ```

3. **El store se actualiza** automáticamente y los componentes se re-renderizan.

### ¿Qué es axios?

**Axios** es una librería HTTP basada en promesas, más potente y fácil de usar que `fetch`.

**Ventajas sobre fetch:**
- ✅ Parseo automático de JSON
- ✅ Interceptores de request/response
- ✅ Manejo de errores más claro
- ✅ Configuración de baseURL
- ✅ Timeouts y cancelación de requests

**Ejemplo en este proyecto:**
```javascript
// Configuración inicial
const api = axios.create({
  baseURL: 'http://localhost:4000/api/user',
});

// Uso simple
const response = await api.get('/');
return response.data; // Ya parseado automáticamente
```

### ¿Cómo se conecta a la API del backend?

**Flujo del CRUD de usuarios:**

1. **`useUserStore.js`** define las acciones (ej: `fetchUsers`)
2. Cada acción llama a **`userService.js`** que usa **axios**
3. **`userService.js`** hace la petición HTTP al backend en `http://localhost:4000/api/user`
4. El backend (Express + Sequelize) responde con datos
5. **Zustand actualiza el estado** con los datos recibidos
6. Los **componentes se re-renderizan** automáticamente

**Endpoints del backend:**
- `GET /api/user` → Obtener todos los usuarios
- `POST /api/user` → Crear usuario (body: `{ nombre, correo }`)
- `PUT /api/user/:id` → Actualizar usuario
- `DELETE /api/user/:id` → Eliminar usuario

**Ejemplo de flujo completo:**

```
UserList.jsx (UI)
    ↓ llama a
useUserStore.fetchUsers() (Zustand)
    ↓ llama a
userService.getAllUsers() (axios)
    ↓ hace HTTP GET
Backend en localhost:4000
    ↓ responde con JSON
axios parsea automáticamente
    ↓ retorna data
Zustand actualiza state.users
    ↓ re-renderiza
UserList.jsx muestra los usuarios
```

### ¿Cómo se pasan datos entre componentes?

**Dos patrones principales:**

1. **Props (datos hacia abajo):**
   - `App` → `CharacterList` → `CharacterCard`
   - `App` → `Header` (el título)

2. **Estado global con Zustand (accesible desde cualquier componente):**
   - `UserForm` lee `selectedUser` y llama `addUser`/`updateUser`
   - `UserList` lee `users` y llama `fetchUsers`/`removeUser`
   - Ambos comparten el mismo estado sin pasar props

## Cómo ejecutar el proyecto

### Requisitos
- Node.js 18+ (recomendado)
- npm o yarn
- Backend corriendo en `http://localhost:4000` (para CRUD de usuarios)

### 1. Instalar dependencias

```powershell
npm install
```

Dependencias principales:
- `react` + `react-dom`: Librería de UI
- `vite`: Build tool y dev server
- `zustand`: Gestión de estado global
- `axios`: Cliente HTTP

### 2. Iniciar servidor de desarrollo

```powershell
npm run dev
```

Abre el enlace que muestre la terminal (por defecto `http://localhost:5173`).

### 3. Iniciar el backend (en otra terminal)

Navega a la carpeta del backend y ejecuta:

```powershell
cd ..\back-ejemplo
npm install
npm run dev
```

El backend debe correr en `http://localhost:4000`.

### 4. Build de producción (opcional)

```powershell
npm run build
```

Genera los archivos optimizados en la carpeta `dist/`.

## Funcionalidades implementadas

### Rick and Morty (ejemplo básico)
✅ Consumo de API pública con `fetch`  
✅ Estado local con `useState`  
✅ Carga de datos con `useEffect`  
✅ Renderizado condicional (loading)  
✅ Paso de props entre componentes  

### CRUD de Usuarios (ejemplo avanzado)
✅ Estado global con **Zustand**  
✅ Peticiones HTTP con **axios**  
✅ Crear usuarios (POST)  
✅ Leer usuarios (GET)  
✅ Actualizar usuarios (PUT)  
✅ Eliminar usuarios (DELETE)  
✅ Formulario reactivo con validación  
✅ Edición inline (click en "Editar" rellena el formulario)  
✅ Confirmación antes de eliminar  
✅ Manejo de estados de carga y error  

## Notas técnicas

### Decisiones de arquitectura

1. **Zustand en lugar de Context API**:
   - Menos código boilerplate
   - Mejor performance (no re-renderiza todo el árbol)
   - API más simple

2. **Axios en lugar de fetch**:
   - Manejo de errores más robusto
   - Configuración centralizada (baseURL)
   - Parseo automático de JSON

3. **Separación de capas**:
   - `services/`: lógica de API
   - `store/`: lógica de estado
   - `components/`: lógica de UI
   - Mejor testabilidad y mantenimiento

### Bugs corregidos
- ✅ Corregida clase CSS en `Header.jsx` (`className` tenía corchete sin cerrar)

### Mejoras recomendadas

- [ ] Añadir manejo de errores más robusto con toasts/notificaciones
- [ ] Implementar paginación en la lista de usuarios
- [ ] Añadir validación de formularios con librerías como `react-hook-form`
- [ ] Tipado con PropTypes o migrar a TypeScript
- [ ] Añadir tests unitarios con Vitest
- [ ] Implementar autenticación JWT para el CRUD
- [ ] Usar React Router para navegación real (en lugar de estado local)
- [ ] Añadir interceptores de axios para manejar tokens y errores globales

## Estructura de datos

### Usuario (del backend)
```javascript
{
  id: 1,
  nombre: "Juan Pérez",
  correo: "juan@example.com",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  Posts: [] // Relación con posts (puede estar vacío)
}
```

## Comandos útiles

```powershell
# Desarrollo
npm run dev

# Build
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## Recursos de aprendizaje

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Axios Docs](https://axios-http.com/)
- [Rick and Morty API](https://rickandmortyapi.com/)

import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

// Página principal del CRUD de usuarios
// Combina el formulario y la lista en una sola vista
const UsersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Gestión de Usuarios
      </h1>
      
      {/* Formulario para crear/editar */}
      <UserForm />
      
      {/* Lista de usuarios */}
      <UserList />
    </div>
  );
};

export default UsersPage;

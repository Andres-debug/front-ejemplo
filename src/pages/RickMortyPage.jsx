import { useEffect, useState } from 'react';
import CharacterList from '../components/CharacterList';

// Página de Rick and Morty
// Contiene la lógica de consumo de API y renderiza la lista de personajes
const RickMortyPage = () => {
  // Estado que almacena la lista de personajes obtenidos desde la API
  const [characters, setCharacters] = useState([]);

  // Función asíncrona que consume la API y actualiza el estado
  const getCharacters = async () => {
    try {
      // 1) Llamada HTTP GET a la API
      const response = await fetch('https://rickandmortyapi.com/api/character');
      // 2) Parseo de la respuesta a JSON
      const data = await response.json();
      // 3) Guardamos solo el array de resultados en el estado
      setCharacters(data.results);
    } catch (error) {
      console.error('Error al cargar personajes:', error);
    }
  };

  // useEffect con dependencia [] para que se ejecute solo una vez al montar el componente
  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="container mx-auto">
      <CharacterList characters={characters} />
    </div>
  );
};

export default RickMortyPage;

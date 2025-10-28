import React from "react";
import CharacterCard from "./CharacterCard";

// Lista de tarjetas. Recibe por props un array de personajes
// y se encarga de renderizar un loader o el grid de tarjetas.
export const CharacterList = ({ characters }) => {
  return (
    <main className="p-6">
      {/* Renderizado condicional: mientras no haya datos mostramos un mensaje */}
      {characters.length === 0 ? (
        <p className="text-center text-gray-400">Cargando Personajes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Iteramos sobre el array y pasamos cada personaje a CharacterCard */}
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CharacterList;

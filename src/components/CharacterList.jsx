import React from "react";
import CharacterCard from "./CharacterCard";

export const CharacterList = ({ characters }) => {
  return (
    <main className="p-6">
      {characters.length === 0 ? (
        <p>Cargando Personajes...</p>
      ) : (
        <div className="grid grid-cols-1">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CharacterList;

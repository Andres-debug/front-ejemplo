// Tarjeta de personaje. Recibe un objeto "character" como prop
// y muestra algunos de sus campos básicos (imagen, nombre, especie).
export const CharacterCard = ({ character }) => {
  return (
    <div className="bg-[#1c2541] rounded-2xl p-4 hover:scale-105 transition-transform duration-200">
      <img
        src={character.image}
        alt={character.name}
        className="rounded-xl w-full h-56 object-cover mb-3"
      />
      <h3 className="text-lg font-bold mb-1">{character.name}</h3>
      <p className="text-gray-400 text-sm">{character.species}</p>
    </div>
  )
}

export default CharacterCard
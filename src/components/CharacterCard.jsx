

export const CharacterCard = ({character}) => {
    return(
        <div className="bg-[#1c2541] rounded-2xl p-4">
            <img
                src={character.image}
                alt={character.name}
                className="rounded-xl w-full h-56 object-cover mb-3"
            />
            <h3>{character.name}</h3>
            <p>{character.species}</p>
        </div>
    )
}

export default CharacterCard
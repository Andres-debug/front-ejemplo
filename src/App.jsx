import { useEffect,useState } from 'react'
import './App.css'
import CharacterList from './components/CharacterList'
import Header from './components/Header';

function App() {

  const [characters, setCharacters] = useState([])

  const getCharacters = async ()=>{
    const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results)
  };

  useEffect(()=>{
    getCharacters();
  },[])

  return (
    <>
      <div className='min-h-screen bg-[#0b132b] text-white'>
    <Header title="Rick and Morty App"/>
    <CharacterList characters={characters}/>
      </div>
    </>
  )
}

export default App

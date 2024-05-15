
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//pulls the Character component in and maps it to display all characters
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch("/api/characters").then(res => res.json()).then(res => setCharacters(res))
  }, []);
  return (
    characters.map(character =>
      <>
        <Link to={`characters/${character.id}`}>
          <button key={character.name}>{character.name}</button>
        </Link>
      </>
    )
  )
}
export default Characters
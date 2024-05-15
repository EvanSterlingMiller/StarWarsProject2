
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//pulls the Character component in and maps it to display all characters
const Characters = (props) => {
  const characters = props.characters;

  return (
    <>
      <h1>Characters</h1>
      <div className='characterList'>
        {characters.map(character =>
        <>
          <Link to={`/character/${character.id}`}>
            <button key={character.name}>{character.name}</button>
          </Link>
        </>
      )}
      </div>
    </>
  )
}
export default Characters
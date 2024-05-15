import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

const Character = (props) => {
  let { id } = useParams();
//   const [film, setFilm] = useState({})
  
  const film = props.films;
 
  useEffect(() => {
    fetch(`/api/films/${id}/characters`).then(res => res.json()).then(res => setFilms(() => res))
  }, []);

  return (<>
    <h1>{character.name}</h1>
    <section id="generalInfo">
      <p>Height: {character.height} cm</p>
      <p>Mass: {character.mass} kg</p>
      <p>Born: {character.birth_year}</p>
    </section>
    <section id="planets">
      <h2>Homeworld</h2>
      <Link key={planet.id} to={`/planets/${planet.id}`}>
        <button key={planet.name}>{planet.name}</button>
      </Link>
    </section>
    <section id="films">
      <h2>Films appeared in</h2>
      {films.map(film =>
        <Link key={film.id} to={`/films/${film.id}`}>
          <button key={film.title}>{film.title}</button>
        </Link>

      )}
    </section>
  </>)
}
export default Character
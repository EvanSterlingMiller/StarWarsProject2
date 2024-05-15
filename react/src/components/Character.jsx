import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

const Character = () => {
  let { id } = useParams();
  const [character, setCharacter] = useState({});
  const [planet, setPlanet] = useState({});
  const [films, setFilms] = useState([]);


  useEffect(() => {
    let char;
    fetch(`/api/characters/${id}`)
      .then(res => res.json())
      .then(character => { char = character; return character })
      .then(character => setCharacter(character))
      .then(() => fetch(`/api/planets/${char.homeworld}`))
      .then(res => res.json())
      .then(homeworld => setPlanet(homeworld))
  }, []);

  useEffect(() => {
    fetch(`/api/characters/${id}/films`).then(res => res.json()).then(res => setFilms(() => res))
  }, []);

  useEffect(() => {
  }, []);
  console.log(character);
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
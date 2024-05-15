import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'

const Planets = (props) => {
    let { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [films, setFilms] = useState([]);


  useEffect(() => {
    fetch(`/api/planets/${id}`).then(res => res.json()).then(res => setPlanet(res))
  }, []);

  useEffect(() => {
    fetch(`/api/planets/${id}/films`).then(res => res.json()).then(res => setFilms(res))
  }, []);

  useEffect(() => {
    fetch(`/api/planets/${id}/characters`).then(res => res.json()).then(res => setCharacters(res))
  }, []);



  return (<>
    <h1>{planet.name}</h1>
    <section id="generalInfo">
      <p>Climate: {planet.climate}</p>
      <p>Surface Water: {planet.surface_water}</p>
      <p>Diameter: {planet.diameter}</p>
      <p>Rotation Period: {planet.rotation_period}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Gravity: {planet.gravity}</p>
      <p>Orbital Period: {planet.orbital_period}</p>
      <p>Population: {planet.population}</p>
    </section>


    <section id="characters">
      <h2>Characters Born Here</h2>
      {characters.map(character =>
        <>
          <Link to={`/characters/${character.id}`}>
            <button key={character.name}>{character.name}</button>
          </Link>
        </>
      )}
    </section>

    <section id="films">
      <h2>Films Featuring This Planet</h2>
      {films.map(film =>
        <>
          <Link to={`/films/${film.id}`}>
            <button key={film.title}>{film.title}</button>
          </Link>
        </>
      )}
    </section>
  </>)
}
export default Planets
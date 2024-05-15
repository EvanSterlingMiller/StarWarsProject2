import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

const Films = () => {
    let { id } = useParams();
    const [film, setFilm] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
  
  
    useEffect(() => {
      fetch(`/api/films/${id}`).then(res => res.json()).then(res => setFilm(res))
    }, []);
  
    useEffect(() => {
      fetch(`/api/films/${id}/characters`).then(res => res.json()).then(res => setCharacters(res))
    }, []);
  
    useEffect(() => {
      fetch(`/api/films/${id}/planets`).then(res => res.json()).then(res => setPlanets(res))
    }, []);
  
  
  
    return (<>
      <h1>{film.title}</h1>
      <section id="generalInfo">
        <p>{film.opening_crawl}</p>
        <p>Released: {film.release_date}</p>
        <p>Director: {film.director}</p>
        <p>Episode: {film.episode_id}</p>
      </section>
      <section id="characters">
        <h2>Appearing Characters</h2>
        {characters.map(character =>
          <>
            <Link to={`/characters/${character.id}`}>
              <button key={character.name}>{character.name}</button>
            </Link>
          </>
        )}
      </section>
      <section id="planets">
        <h2>Planets</h2>
        {planets.map(planet =>
          <>
            <Link to={`/planets/${planet.id}`}>
              <button key={planet.name}>{planet.name}</button>
            </Link>
          </>
        )}
      </section>
    </>)
}
export default Films
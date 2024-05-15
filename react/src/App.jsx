import { useState, useEffect } from 'react';
import './App.css'
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'

function App() {
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);


  // function to make fetch requests and validate data from server
  const getData = async () => {
    const url = "http://localhost:3000/api";
    try {
      // Fetch and validate character data
      const charRes = await fetch(`${url}/characters`);
      if(!charRes.ok){
        throw new Error("Error fetching character data");
      }
      const characters = await charRes.json();

      // Fetch and validate film data
      const filmRes = await fetch(`${url}/films`);
      if(!filmRes.ok){
        throw new Error("Error fetching film data");
      }
      const films = await filmRes.json();

      // Fetch and validate planet data
      const planetRes = await fetch(`${url}/planets`);
      if(!planetRes.ok){
        throw new Error("Error fetching planet data");
      }
      const planets = await planetRes.json();

      setCharacters(characters);
      setFilms(films);
      setPlanets(planets);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  },[])

  return (
    <>
      <Router>
      <h1>Star Wars look up</h1>
        <Routes>
            {/* <Route exact path="/" element={<Home />} />
            <Route exact path="/characters" element={<Characters />} />
            <Route exact path="films" element={<Films />} />
            <Route exact path="planets" element={<Planets />} /> */}
        </Routes>
    
      </Router>
    </>
  );
};

export default App;

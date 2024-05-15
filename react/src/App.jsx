import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route}from 'react-routter-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <h1>Star Wars look up</h1>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/characters" element={<Characters />} />
            <Route exact path="films" element={<Films />} />
            <Route exact path="planets" element={<Planets />} />
        </Routes>
    
      </Router>
    </>
  )
}

export default App

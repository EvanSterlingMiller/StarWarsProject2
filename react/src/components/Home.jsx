import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = (props) => {
    const characters = props.characters;
    const navigate = useNavigate();


    const goToCharacter = (charId) => {
        console.log("Our character", charId);
        navigate(`/characters`);
    }
    return(
        <>
            <h1>Star Wars look up</h1>
            <div id='characterList'>
                {
                characters.length !== 0 ? 
                characters.map(char => {
                    return(
                    <div className='character' onClick={() => goToCharacter(char.id)} key={char.id}>
                        <small>{char.name}</small>
                    </div>
                    )
                })
                :
                <></>
                }
            </div>
        </>
    )
};
export default Home;
import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Box} from "@mui/material";
import {PacmanLoader} from "react-spinners";

const NewGame = () => {

    const [gameCode, setGameCdoe] = useState(0);
    useEffect(() => setGameCdoe(Math.floor(Math.random() * 100000000)), []);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (<div className="App">
        <Header/>
        <header className="App-header">
            {/*<Play></Play>*/}
            <div className="App-body">
                <Box marginRight={5}>
                    <div style={{marginBottom: 40}}> Waiting for players to join</div>
                    Game code: {gameCode}
                </Box>
                <Box marginLeft={5}>
                </Box>
                <PacmanLoader color={"#f3b27a"} loading={loading} css size={100}/>
            </div>
        </header>
    </div>);
}

export default NewGame;

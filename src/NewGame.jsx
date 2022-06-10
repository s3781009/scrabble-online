import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Box} from "@mui/material";
import {PacmanLoader} from "react-spinners";
import axios from "axios";

const NewGame = () => {

    const [gameCode, setGameCdoe] = useState(0);
    useEffect(() => setGameCdoe(Math.floor(Math.random() * 100000000)), []);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    let [game, setGame] = useState(null);
    useEffect(() => {
        axios.get("https://scrabble-web-server.herokuapp.com/new")
            .then(res => {
                setGame(res.data);
                return game;
            }).then((gameId) => console.log(gameId));
    }, []);


    return (<div className="App">
        <Header/>
        {/*<Play></Play>*/}
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 100,
            font: "source code pro",
            fontWeight: 700,
            fontSize: 30,
            color: "white"
        }}>
            <Box marginRight={5}>
                <div style={{marginBottom: 40}}> Waiting for players to join</div>
                Game code:
                <div style={{color:"#f3b27a", marginTop:20}}>
                    {game !== null ? game.id : ""}
                </div>
                <div style={{marginTop: 40}}>
                    Number of players joined: <br/>  1
                </div>
                <div style={{marginTop: 100, marginRight: 200}}>
                    <PacmanLoader color={"#f3b27a"} loading={loading} css size={100}/>
                </div>
            </Box>
        </div>
    </div>);
}

export default NewGame;

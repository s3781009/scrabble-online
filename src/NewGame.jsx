import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Box} from "@mui/material";
import {PacmanLoader} from "react-spinners";
import axios from "axios";
import {motion} from 'framer-motion';
import {MdCloudDone} from "react-icons/all";
import {useNavigate} from 'react-router';

const NewGame = () => {
    const [input, setInput] = useState("");
    const [animateInput, setAnimateInput] = useState(false);
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState(null);
    const[gameState, setGameState ] = useState(null);
    const socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");
    const navigate = useNavigate();

    useEffect(() => {
        if(gameState!==null) {
            navigate('/play', {state: {game: gameState, initiator:true}});
        }
    }, [gameState]);

    useEffect(() => {
        if (game == null) {
            axios.get("https://scrabble-web-server.herokuapp.com/new")
                .then(res => {
                    setGame(res.data);
                }).catch((e) => console.log(e));
        }
    }, []);


    socket.onmessage = (message) => {
        console.log("received");
        console.log(JSON.parse(message.data));
        setGameState(JSON.parse(message.data));
    };


    socket.onerror = (err) => {
        console.log(err);
    };

    const sumbitName = () => {
        console.log("button pressed");
        setAnimateInput(true);
        socket.onopen = () => {
            if (game !== null) {
                let toSend = {
                    Connection: null, id: "", name: input, hand: null, gameCode: game.id.toString(), action: "join"
                };
                console.log(toSend);
                socket.send(JSON.stringify(toSend));
                console.log("sent");
            }
        };
    };

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
                {animateInput ?
                    <motion.div animate={{opacity: !animateInput ? 0 : 1}} style={{marginBottom: 40}}> Waiting for
                        Opponent to join
                    </motion.div> : null}
                Game code:
                <div style={{color: "#f3b27a", marginTop: 20}}>
                    {game !== null ? game.id : ""}
                </div>
                <motion.div animate={{opacity: animateInput ? 0 : 1}} style={{
                    display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 50
                }}>

                    <motion.input style={{
                        width: 400,
                        height: 50,
                        borderRadius: 10,
                        fontSize: 30,
                        backgroundColor: "#eee5e9ff",
                        fontWeight: 700,
                        border: 'none',
                    }} placeholder={"Your name..."} onChange={(e) => setInput(e.target.value)}></motion.input>
                    <motion.button whileHover={{scale: 1.3, opacity: 0.5}} style={{
                        marginLeft: 30,
                        width: 200,
                        height: 55,
                        backgroundColor: "#52dee5ff",
                        borderRadius: 10,
                        border: "none"
                    }} onClick={() => sumbitName()}>
                        <MdCloudDone/>
                    </motion.button>
                </motion.div>
                {/*<div style={{marginTop: 40}}>*/}
                {/*    Number of players joined: <br/> 1*/}
                {/*</div>*/}
                {/*/!*<div style={{marginTop:50}}>*!/*/}
                {/*/!*    <motion.button transition={{duration:100, type:"spring", damping:100, stiffness:500}}>Done</motion.button>*!/*/}
                {/*</div>*/}
                <div style={{marginTop: 60, marginRight: 200}}>
                    <motion.div animate={{opacity: !animateInput ? 0 : 1}}>
                        {animateInput ? <PacmanLoader color={"#f3b27a"} loading={loading} css size={100}/> : null}
                    </motion.div>
                </div>
            </Box>

        </div>
    </div>);
}

export default NewGame;

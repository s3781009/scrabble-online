import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Box} from "@mui/material";
import {PacmanLoader} from "react-spinners";
import axios from "axios";
import {motion} from 'framer-motion';

const NewGame = () => {
    const [input, setInput] = useState("");
    const [animateInput, setAnimateInput] = useState(false);
    const [gameCode, setGameCdoe] = useState(0);
    useEffect(() => setGameCdoe(Math.floor(Math.random() * 100000000)), []);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    let [game, setGame] = useState(null);
    const socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");
    useEffect(() => {
        if (game == null) {
            axios.get("https://scrabble-web-server.herokuapp.com/new")
                .then(res => {
                    setGame(res.data);
                }).catch((e) => console.log(e));
        }
    }, []);

    socket.onmessage = (message) => {
        console.log(JSON.parse(message.data));
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
                {animateInput?<motion.div animate={{opacity: !animateInput ? 0 : 1}} style={{marginBottom: 40}}> Waiting for Opponent to join
                </motion.div>:null}
                Game code:
                <div style={{color: "#f3b27a", marginTop: 20}}>
                    {game !== null ? game.id : ""}
                </div>
                <motion.div animate={{opacity: animateInput ? 0 : 1}} style={{
                    display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 50
                }}>
                    <motion.input style={{width: 300, height: 40, fontSize: 20, fontWeight: 700}}
                                  placeholder={"Your name..."}
                                  onChange={(e) => setInput(e.target.value)}></motion.input>
                    <motion.button style={{height: 50, width: 100, marginLeft: 20,}} onClick={() => sumbitName()}>DONE
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
                        {animateInput?<PacmanLoader color={"#f3b27a"} loading={loading} css size={100}/>:null}
                    </motion.div>
                </div>

            </Box>

        </div>
    </div>);
}

export default NewGame;

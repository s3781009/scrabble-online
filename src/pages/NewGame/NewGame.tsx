import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import axios from "axios";
import {motion} from 'framer-motion';
import {MdCloudDone} from "react-icons/all";
import {useNavigate} from 'react-router';
import './NewGame.css';

const NewGame = () => {
    const [input, setInput] = useState("");
    const [animateInput, setAnimateInput] = useState(false);
    const [game, setGame] = useState(null);
    const socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");
    const navigate = useNavigate();


    useEffect(() => {
        if (game == null) {
            axios.get("https://scrabble-web-server.herokuapp.com/new")
                .then(res => {
                    setGame(res.data);
                }).catch((e) => console.log(e));
        }
    }, []);

    const sumbitName = () => {
        console.log("button pressed");
        let playerToJoin = {state: {initiator: true, gameCode: game.id, name: input}};
        console.log(playerToJoin);
        navigate('/play', playerToJoin);
    };


    socket.onclose = () => {
        console.log("closed socket");
    }

    return (
        <div className="App">

            <Header/>

            <div className="body">
                Game code

                <div style={{color: "#f3b27a", marginTop: 20}}>
                    {game !== null ? game.id : ""}
                </div>

                <motion.div animate={{opacity: animateInput ? 0 : 1}}>

                    <motion.input
                        className="name-input"
                        placeholder={"Display Name"}
                        onChange={(e) => setInput(e.target.value)}>
                    </motion.input>

                    <motion.button
                        className="name-button"
                        whileHover={{scale: 1.3, opacity: 0.5}}
                        onClick={() => sumbitName()}>
                        <MdCloudDone/>
                    </motion.button>

                </motion.div>

            </div>
        </div>);
}

export default NewGame;

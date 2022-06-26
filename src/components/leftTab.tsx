import React, { useState, useEffect } from 'react';
import './leftTab.css';
import { motion } from 'framer-motion';
import { AiFillPlayCircle, AiFillPlusCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdMeetingRoom } from 'react-icons/md';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/hooks';


let socket = new WebSocket("ws://localhost:8080/join");

const LeftTab = () => {

    const [showButtons, setShowButtons] = useState(true);
    const [codeLoading, setCodeLoading] = useState(true);
    const [showNewGame, setShowNewGame] = useState(false);
    const [showJoinGame, setShowJoinGame] = useState(false);
    const [name, setName] = useState<string>("");
    const [showPlayGame, setShowPlayGame] = useState(false);
    const [gameCode, setGameCode] = useState<string>("");


    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (showNewGame) {
            axios.get("http://localhost:8080/new")
                .then(res => {
                    setGameCode(res.data.id);
                    setCodeLoading(false);
                }).catch((e) => console.log(e));
        }
    }, [showNewGame]);

    const toNewGame = () => {
        setShowButtons(false);
        setShowNewGame(true);

    }

    const toJoinGame = () => {
        setShowButtons(false);
        setShowJoinGame(true);
    }

    const back = () => {
        setShowJoinGame(false);
        setShowNewGame(false);
        setShowButtons(true);
    }

    socket.onmessage = (message) => {
        console.log("received socket message");
        console.log(message.data);
    };

    const createGame = () => {
        let toSend = {
            Connection: null, id: "", name: "name", hand: null, gameCode: gameCode, action: "join"
        };
        console.log(gameCode);
        socket.onopen = () => {
            socket.send(JSON.stringify(toSend));
        }
        console.log("join game");
    }

    return (
        <>
            <div className="container">

                {showButtons ? <>
                    <Button
                        className="game-buttons"
                        style={{ marginBottom: "20%", backgroundColor: "#7C7C7C" }}
                        onClick={() => toNewGame()}
                    >
                        <div className="row">
                            <AiFillPlusCircle size={60} color={"white"} />
                            <div className="title">
                                NEW GAME
                            </div>
                        </div>
                    </Button>

                    <Button
                        style={{ backgroundColor: "#7C7C7C" }}
                        className="game-buttons"
                        onClick={() => toJoinGame()}
                    >
                        <div className="row">
                            <MdMeetingRoom size={60} color={"white"} />
                            <div className="title">
                                JOIN GAME
                            </div>
                        </div>

                    </Button>
                </> : <>
                    <motion.div whileHover={{ backgroundColor: "#f3b27a", borderRadius: "5px" }}
                        style={{ alignSelf: "start", marginLeft: "5%", color: "white" }}
                        onClick={() => back()}>
                        <AiOutlineArrowLeft size={30} />
                    </motion.div>
                    <div className="code">GAME CODE</div>
                    <div>
                        {codeLoading ? <BarLoader /> : <div className="gamecode">{gameCode}</div>}
                    </div>
                    <input className="name" placeholder="name" onChange={(event) => setName(event.target.value)}></input>
                </>}
                {!showJoinGame && showNewGame ? <div className="bottom-container">
                    <div className="play-container">
                        <Button className="play-button" onClick={() => createGame()}>
                            <AiFillPlayCircle size={40} color={"lack"} />
                            <div className="play-text">
                                PLAY
                            </div>
                        </Button>
                    </div>
                </div> : null}
            </div>
        </>
    );
};

export default LeftTab;

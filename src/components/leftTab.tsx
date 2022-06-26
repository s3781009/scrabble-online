import React, { useState, useEffect } from 'react';
import New from './new';
import './leftTab.css';
import { motion } from 'framer-motion';
import { AiFillPlayCircle, AiFillPlusCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdMeetingRoom } from 'react-icons/md';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import { Button } from '@mui/material';
import Join from './join';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setPlayer, setHand, Tile } from '../redux/PlayerSlice';

let socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");

const LeftTab = () => {

    const [showButtons, setShowButtons] = useState(true);
    const [codeLoading, setCodeLoading] = useState(true);
    const [showNewGame, setShowNewGame] = useState(false);
    const [showJoinGame, setShowJoinGame] = useState(false);
    const [name, setName] = useState<string>("");
    const [showPlayGame, setShowPlayGame] = useState(false);


    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();


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
        try {
            let obj = JSON.parse(message.data);
            let hand: Tile[] = [];
            obj.players[0].hand.forEach((element: Tile) => {
                hand.push({ char: element.char, placed: false })
            });
            dispatch(setHand(obj.players[0].hand));
            console.log(player.hand);
        }
        catch (e) {
            console.log(message.data);
        }



    };


    socket.onopen = () => {
        console.log("socket oepned");
    }
    socket.onclose = () => {
        console.log("closed");
    }
    socket.onerror = () => {
        console.log("error socket");
    }

    const createGame = () => {

        let toSend = {
            id: "", name: player.name, hand: null, gameCode: player.gameCode.toString(), action: "join", score: 0
        };
        socket.send(JSON.stringify(toSend));
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
                </>}
                {showNewGame ? <New
                    createGame={() => createGame()}
                /> : null}
                {showJoinGame ? <Join createGame={() => createGame()} /> : null}
            </div>
        </>
    );
};

export default LeftTab;

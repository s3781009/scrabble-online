import React, {useEffect, useState} from "react";
import "@mui/material";
import {Box, Button} from "@mui/material";
import Header from "../../components/Header";
import Board from "../../components/Board";
import Hand from "../../components/Hand";
import {AiOutlineSwap, MdOutlineCancel, MdOutlineDoneAll} from "react-icons/all";
import {motion} from 'framer-motion';
import {BarLoader} from "react-spinners";
import {useLocation} from "react-router";
import './play.css';
import {Message, Player} from '../../redux/PlayerSlice';
import LeftTab from "../../components/leftTab";
const Play = () => {

    const {state} = useLocation();
    const {initiator, gameCode, name} = state;
    const [player, setPlayer] = useState<Player>(null);
    const [op, setOp] = useState<Player>(null);
    const [isTurn, setTurn] = useState();
    const [hand, setHand] = useState([]);
    const [placedTiles, setPlacedTiles] = useState([]);
    const [selectedTile, setSelectedTile] = useState({char: '', index: -1,});
    const [isLoading, setLoading] = useState<boolean>(true);
    const [playerTurn, setPlayerTurn] = useState<boolean>(true)
    const [animateScore, setAnimateScore] = useState<boolean>(false);
    const [removeFromBoard, setRemoveFromBoard] = useState<boolean>(false);
    const[board, setBoard] = useState(null);

    let socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");

    useEffect(() => {
        if (player === null) {
            socket.onopen = () => {

                let toSend :Message= {
                    Connection: null,
                    id: "",
                    name: name,
                    hand: [],
                    gameCode: gameCode.toString(),
                    action: "join"
                };

                socket.send(JSON.stringify(toSend));
                console.log("joined");
            };
        }
        const interval = setInterval(() => {

            let toSend = {
                Connection: null, id: "", name: name, hand: null, gameCode: gameCode.toString(), action: "ping"
            };
            console.log("ping");
            socket.onopen = () => {
                socket.send(JSON.stringify(toSend));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    socket.onopen = () => {

        let toSend = {
            Connection: null, id: "", name: name, hand: null, gameCode: gameCode.toString(), action: "reconnect"
        };
        socket.send(JSON.stringify(toSend));
        console.log("sent reconnect message")
    };

    socket.onmessage = (message) => {
        console.log("received socket message");

        if (message.data !== "pong" && isLoading) {
            if (player === null) {
                let game = JSON.parse(message.data);
                if (game.id === undefined) {
                    setHand(game);
                    return;
                }
                console.log(game);
                initiator ? setPlayer(game.players[0]) : setPlayer(game.players[1]);
                !initiator ? setOp(game.players[0]) : setOp(game.players[1]);
            }
            setLoading(false);
        } else {
            console.log(message.data);
        }
    };

    useEffect(() => {

        if (player != null) {
            let h = [];
            for (let i = 0; i < player.hand.length; i++) {
                h.push(
                    {char: player.hand[i].char, placed: false, boardIndex: -1}
                )
            }
            setHand(h);
        }
    }, [player]);

    //websocket connection to the new game created
    //get game id on new game
    const placeDone = () => {
        setTurn(false);
        console.log("place done");
        console.log(hand.filter((tile) => tile.placed !== true));
        let h = hand.filter((tile) => tile.placed !== true);
        console.log(h);
        setHand(h);
    }

    useEffect(() => {
        if (hand !== null && player !== null && hand.length < 7) {
            socket.onopen = () => {
                let toSend = {
                    Connection: null,
                    id: "",
                    name: player.name,
                    hand: hand,
                    gameCode: gameCode.toString(),
                    action: "place",
                    board: null
                };
                socket.send(JSON.stringify(toSend));
                setAnimateScore(true);
            }
        }
    }, [hand]);

    socket.onerror = () => {
        console.log("error occured");
        socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");
    }

    return (
        <div className="screen">
            <Header/>
            {isLoading ?
                <BarLoader style={{margin: "50, 50, 50, 50"}} size={100} color={"white"}/> :
                <div className="main">
                    <div className="words-container">
                        <LeftTab/>
                    </div>
                    <Box display="flex" flexDirection="column">
                        <Board
                            placedTiles={placedTiles}
                            selectedTile={selectedTile}
                            setSelectedTile={setSelectedTile}
                            remove={removeFromBoard}
                            setRemove={(isRemoved) => setRemoveFromBoard(isRemoved)}
                            setPlacedTiles={(tile) => setPlacedTiles([...placedTiles, tile])}
                            hand={hand}
                        />
                        <div className="player-actions">

                            <Hand
                                placedTiles={placedTiles}
                                selectedTile={selectedTile}
                                turn={playerTurn}
                                onClick={(i) => setSelectedTile(i)}
                                tiles={hand}
                            />

                            <Button
                                className="remove-button"
                                onClick={() => setRemoveFromBoard(true)}>
                                <MdOutlineCancel size={30}/>
                            </Button>

                            <Button  className="action-button">
                                <AiOutlineSwap size={30}/>
                            </Button>

                            <Button
                                className="action-button"
                                onClick={() => placeDone()}
                            >
                                <MdOutlineDoneAll size={30}/>
                            </Button>
                        </div>
                    </Box>

                    <div className="right-container">
                        <div className="op">
                            <div className="score-name">{op.name}</div>
                            <div className="score-name"> 5</div>
                        </div>

                        <motion.div
                            className="current-player"
                            initial={false}
                            animate={animateScore ? 'rotate' : 'stop'}
                        >
                            <div className="score-name">{player.name}</div>
                            <div className="score-name"> 10</div>
                        </motion.div>
                    </div>

                </div>}
        </div>
    );
};

export default Play;

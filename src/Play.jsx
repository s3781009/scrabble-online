import React, {useEffect, useState} from "react";
import "@mui/material";
import {Box, Button, Typography,} from "@mui/material";
import Header from "./Header";
import Board from "./Board";
import Hand from "./Hand";
import {AiOutlineSwap, MdOutlineCancel, MdOutlineDoneAll} from "react-icons/all";
import {motion, useTime} from 'framer-motion';
import {BarLoader} from "react-spinners";
import {useLocation} from "react-router";

const Play = () => {
    const {state} = useLocation();
    const {initiator, gameCode, name} = state;
    const [player, setPlayer] = useState(null);
    const [op, setOp] = useState(null);
    const [isTurn, setTurn] = useState();

    const [hand, setHand] = useState([]);
    const [placedTiles, setPlacedTiles] = useState([]);
    // const [player, setPlayer] = useState({name:'Player1', hand:hand, score:0});
    const [selectedTile, setSelectedTile] = useState({char: '', index: -1,});
    const [isLoading, setLoading] = useState(true);
    const [playerTurn, setPlayerTurn] = useState(true)
    const [animateScore, setAnimateScore] = useState(false);
    const [tileToRemove, setTileToRemove] = useState("");
    const [gameId, setGameId] = useState(null);
    const [game, setGame] = useState(null);
    const [removeFromBoard, setRemoveFromBoard] = useState(false);
    const [call, setCall] = useState(false);
    let socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");

    useEffect(() => {
            if (player === null) {
                socket.onopen = () => {
                    let toSend = {
                        Connection: null, id: "", name: name, hand: null, gameCode: gameCode.toString(), action: "join"
                    };
                    socket.send(JSON.stringify(toSend));
                    console.log("joined");
                };
            }
        }, []
    );

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
        }
        else{
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

    useEffect(() => {
        const interval = setInterval(() => {
            let toSend = {
                Connection: null, id: "", name: name, hand: null, gameCode: gameCode.toString(), action: "ping"
            };
            console.log("ping");
            socket.open = () => {
                socket.send(JSON.stringify(toSend));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    //websocket connection to the new game created
    //get game id on new game
    const placeDone = () => {
        setTurn(false);
        console.log("place done");
        console.log(hand.filter((tile) => tile.placed !== true));

        let h = hand.filter((tile) => tile.placed !== true);
        console.log(h);
        setHand(h);
        setCall(!call);

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
                    action: "place"
                };
                socket.send(JSON.stringify(toSend));
                setAnimateScore(true);
            }
        }
    }, [hand]);

    // socket.onclose = () => {
    //     console.log("socket closed");
    //     socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");
    // }
    socket.onerror=()=>{
        console.log("error occured");
    }

    return (
        <div style={{backgroundColor: "#41444d", height: 1080}}>
            <Header/>
            {isLoading ?
                <BarLoader style={{margin: "50, 50, 50, 50"}} size={100} color={"white"}/> :
                <div style={{display: "flex", flexDirection: "row", backgroundColor: "#41444d", marginTop: 50}}>
                    <div style={{width: "30%"}}>
                        <Box style={{paddingLeft: "10%"}} paddingRight="10%">
                            <div style={{height: 600}}>
                                {/*<div style={{fontSize: 34, fontWeight: 700, color: "#eee5e9ff"}}>Words placed</div>*/}
                            </div>
                        </Box>
                    </div>
                    {/*The game board and the players hands*/}
                    <Box display="flex" flexDirection="column">
                        <Board
                            placedTiles={placedTiles}
                            selectedTile={selectedTile}
                            setSelectedTile={setSelectedTile}
                            remove={removeFromBoard}
                            setRemove={(isRemoved) => setRemoveFromBoard(isRemoved)}
                            setPlacedTiles={(tile) => setPlacedTiles([...placedTiles, tile])}
                            hand={hand}
                            tileToRemove={tileToRemove}/>
                        <Typography marginBottom="30px" marginTop="30px" color={"#eee5e9ff"}> Your hand :</Typography>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Hand placedTiles={placedTiles} selectedTile={selectedTile} turn={playerTurn}
                                  onClick={(i) => {
                                      setSelectedTile(i);
                                  }} tiles={hand}/>
                            <Button onClick={() => setRemoveFromBoard(true)}
                                    style={{
                                        backgroundColor: "#7C7C7C",
                                        marginLeft: 100,
                                        color: "black",
                                        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
                                    }}>
                                <MdOutlineCancel size={30}/></Button>
                            <Button style={{
                                backgroundColor: "#f3b27a",
                                marginLeft: 30,
                                color: "black",
                                boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
                            }}>
                                <AiOutlineSwap size={30}/></Button>
                            <Button onClick={() => placeDone()}
                                    style={{
                                        backgroundColor: "#f3b27a",
                                        marginLeft: 30,
                                        color: "black",
                                        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
                                    }}>
                                <MdOutlineDoneAll size={30}/></Button>
                        </div>
                    </Box>
                    {/*display players scores */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "space-between",
                        paddingBottom: 100
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: 10,
                            boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
                            backgroundColor: playerTurn ? "#7C7C7C" : "rgb(243, 178, 122)",
                            height: 70,
                            width: 100,
                            borderRadius: 5,
                            marginLeft: 100,
                        }}>
                            <div style={{
                                color: "#eee4da",
                                paddingBottom: 10,
                                justifySelf: "center",
                                font: "source code pro",
                                fontWeight: 600,

                            }}>{op.name}
                            </div>
                            <div style={{
                                fontWeight: 600,
                                paddingBottom: 10,
                                color: "#eee4da", justifySelf: "center"
                            }}> 5
                            </div>

                        </div>
                        <motion.div initial={false} animate={animateScore ? 'rotate' : 'stop'} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: 10,
                            boxShadow: "10px 10px 2px 1px rgba(0, 0, 0, 0.2)",
                            backgroundColor: !playerTurn ? "#7C7C7C" : "#f3b27a",
                            height: 70,
                            width: 100,
                            borderRadius: 5,
                            marginLeft: 100
                        }}>
                            <div style={{
                                color: "#eee4da",
                                justifySelf: "center",
                                font: "source code pro",

                                fontWeight: 600,
                                paddingBottom: 10,
                            }}>{player.name}
                            </div>
                            <div style={{
                                color: "#eee4da",
                                justifySelf: "center",
                                font: "source code pro",
                                fontWeight: 700
                            }}> 10
                            </div>
                        </motion.div>
                    </div>
                </div>}
        </div>
    );
};

export default Play;

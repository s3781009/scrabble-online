import React, {useEffect, useState} from "react";
import "@mui/material";
import {Box, Button, Typography,} from "@mui/material";
import Header from "./Header";
import Board from "./Board";
import Hand from "./Hand";
import {AiOutlineSwap, MdOutlineCancel, MdOutlineDoneAll} from "react-icons/all";
import {motion} from 'framer-motion';
import {BarLoader} from "react-spinners";

const Play = () => {
    const [hand, setHand] = useState(['A', 'B', 'C', 'D', 'E']);
    // const [player, setPlayer] = useState({name:'Player1', hand:hand, score:0});

    const [selectedTile, setSelectedTile] = useState({char: '', index: -1});
    const [isLoading, setLoading] = useState(true);
    const [playerTurn, setPlayerTurn] = useState()
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // useEffect(()=>
    // setPlayer({name: "ryan", hand: []  ,score:0})
    // ,[]);

    return (
        <div style={{backgroundColor: "#41444d", height: 1080}}>
            <Header/>
            {isLoading ?
                <BarLoader style={{margin:"50, 50, 50, 50"}} size={100} color={"white"} /> :
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
                        <Board selectedTile={selectedTile} setSelectedTile={setSelectedTile}/>
                        <Typography marginBottom="30px" marginTop="30px" color={"#eee5e9ff"}> Your hand :</Typography>
                        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                            <Hand selectedTile={selectedTile} onClick={(i) => setSelectedTile(i)} tiles={hand}/>
                            <Button style={{backgroundColor: "#7C7C7C", marginLeft: 100, color: "black"}}>
                                <MdOutlineCancel  size={30}/></Button>
                            <Button  style={{backgroundColor: "#f3b27a", marginLeft: 30, color: "black"}}>
                                <AiOutlineSwap size={30}/></Button>
                            <Button style={{backgroundColor: "#f3b27a", marginLeft: 30, color: "black"}}>
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
                            backgroundColor: "#7C7C7C",
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
                                fontWeight: 600
                            }}>OP
                            </div>
                            <div style={{
                                fontWeight: 600,
                                paddingBottom: 10,
                                color: "#eee4da", justifySelf: "center"
                            }}> 5
                            </div>

                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: 10,
                            backgroundColor: "#7C7C7C",
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
                            }}>SCORE
                            </div>
                            <div style={{
                                color: "#eee4da",
                                justifySelf: "center",
                                font: "source code pro",
                                fontWeight: 700
                            }}> 10
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default Play;

import React, { useEffect, useState } from "react";
import "@mui/material";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import Board from "../../components/Board";
import Hand from "../../components/Hand";
import './play.css';
import { Message, Player } from '../../redux/PlayerSlice';
import LeftTab from "../../components/leftTab";
import { Tile } from "../../redux/PlayerSlice";
import PlayerActions from "../../components/playerActions";
import Scores from "../../components/Scores";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Play = () => {


    const user = useAppSelector(state => state.player)
    const dispatch = useAppDispatch()

    let socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");
    let gameCode = "";

    return (
        <div className="screen">
            <Header />

            <div className="main">

                <div className="words-container">
                    <LeftTab />
                </div>

                <Box display="flex" flexDirection="column">

                    <Board
                    />

                    <div className="player-actions">
                        <Hand
                        />
                        <PlayerActions />
                    </div>

                </Box>

                <Scores />

            </div>
        </div>
    );
};

export default Play;

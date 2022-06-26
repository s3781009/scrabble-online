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

    const [player, setPlayer] = useState<Player>({ board: [], hand: [], isTurn: false, name: "" });
    const [op, setOp] = useState<Player>({ board: [], hand: [], isTurn: false, name: "" });
    const user = useAppSelector(state => state.player)
    const dispatch = useAppDispatch()
    const [placedTiles, setPlacedTiles] = useState<Tile[]>([]);
    const [selectedTile, setSelectedTile] = useState<Tile>({ char: '', index: -1, });
    const [removeFromBoard, setRemoveFromBoard] = useState<boolean>(false);

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
                        placedTiles={placedTiles}
                        selectedTile={selectedTile}
                        setSelectedTile={setSelectedTile}
                        remove={removeFromBoard}
                        setRemove={(isRemoved: boolean) => setRemoveFromBoard(isRemoved)}
                        setPlacedTiles={(tile: Tile) => {
                            setPlacedTiles([...placedTiles, tile]);
                        }}
                    />

                    <div className="player-actions">
                        <Hand
                            placedTiles={placedTiles}
                            selectedTile={selectedTile}
                            onClick={(i: Tile) => setSelectedTile(i)}
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

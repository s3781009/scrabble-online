import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import tile from "./Tile";
import './Board.css';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { connect } from "@giantmachines/redux-websocket";

const Board = () => {

    const [board, setBoard] = useState(Array(15 * 15).fill(""));
    const [indexPlacement, setIndexPlacement] = useState(-1);
    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();


    const canPlace = (index: number) => {
        let placeable = true;
        let empty = true;
        //check if the board is empty ,if it is then the every position is placeable
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== "") {
                empty = false;
            }
        }
        if (empty) {
            return true;
        }
        if (index > 14 && index < 210) {
            if (board[index + 1] === "" && board[index - 1] === "" && board[index + 15] === "" && board[index - 15] === "" && !empty) {
                placeable = false;
            }
        }
        if (index < 15) {
            if (board[index + 1] === "" && board[index - 1] === "" && board[index + 15] === "" && !empty) {
                placeable = false;
            }
        }
        if (index > 209) {
            if (board[index + 1] === "" && board[index - 1] === "" && board[index - 15] === "" && !empty) {
                placeable = false;
            }
        }
        if (index === 224) {
            if (board[index - 1] === "" && board[index - 15] === "" && !empty) {
                placeable = false;
            }
        }
        return placeable;
    };

    return (
        <div>
            <div className="grid-container">
                {board.map((val, index) => (
                    <motion.div
                        className="board-tile"
                        key={index}
                        whileHover={{
                            opacity: val === "" ? 0.30 : 1,
                            backgroundColor: val !== "" || canPlace(index) ? "#eee5e9ff" : "#ff0002"
                        }}
                        onClick={() => {
                            if (player.selectedTile !== null) {
                                setIndexPlacement(index);
                            }
                        }}>
                        <div className="board-tile-char">{val}</div>
                    </motion.div>))}
            </div>
        </div>);
};

export default Board;

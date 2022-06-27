import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import tile from "./Tile";
import './Board.css';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { connect } from "@giantmachines/redux-websocket";
import { setPlacedHand, removeFromHand } from '../redux/PlayerSlice';
import { canPlace } from '../functions/BoardActions';

const Board = () => {

    const [board, setBoard] = useState<string[]>(Array(15 * 15).fill(""));
    const [indexPlacement, setIndexPlacement] = useState(-1);
    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();


    const placeTile = (index: number) => {
        if (player.selectedTile !== null) {
            let copyBoard = board.slice();
            for (let i = 0; i < copyBoard.length; i++) {
                if (i == index) {
                    copyBoard[i] = player.selectedTile.char;

                }
            }

            dispatch(removeFromHand(player.selectedTile.index));
            // dispatch(setPlacedHand(player.selectedTile.index));
            setBoard(copyBoard);
        }
    }




    return (
        <div>
            <div className="grid-container">
                {board.map((val, index) => (
                    <motion.div
                        className="board-tile"
                        key={index}
                        whileHover={{
                            opacity: val === "" ? 0.30 : 1,
                            backgroundColor: val !== "" || canPlace(index, board) ? "#eee5e9ff" : "#ff0002"
                        }}
                        onClick={() => {
                            if (player.selectedTile !== null && canPlace(index, board)) {
                                placeTile(index);
                            }
                        }}>
                        <div className="board-tile-char">{val}</div>
                    </motion.div>))}
            </div>
        </div>);
};

export default Board;

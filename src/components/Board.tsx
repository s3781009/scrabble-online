import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import tile from "./Tile";
import './Board.css';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {connect} from "@giantmachines/redux-websocket";

const Board = (props) => {

    const [board, setBoard] = useState(Array(15 * 15).fill(""));
    const [indexPlacement, setIndexPlacement] = useState(-1);
    const player = useAppSelector(state=>state.player);
    const dispatch = useAppDispatch();
    dispatch(connect())
    useEffect(() => {
        if (canPlace(indexPlacement)) {
            let clonedBoard = board.slice(); //creates the clone of the state
            clonedBoard[indexPlacement] = props.selectedTile.char;
            setBoard(clonedBoard);
            for (let i = 0; i < props.hand.length; i++) {
                if (props.hand[i].char === props.selectedTile.char && i === props.selectedTile.index) {
                    props.hand[i].placed = true;
                    props.hand[i].boardIndex = indexPlacement;
                }
            }
            board.forEach((tile)=>console.log(tile));
            props.setSelectedTile({char: "", index: -1});
        }
    }, [indexPlacement]);

    useEffect(() => {
        if (props.remove) {
            let clonedBoard = board.slice();
            for (let i = 0; i < props.hand.length; i++) {
                for (let j = 0; j < board.length; j++) {
                    if (props.hand[i].boardIndex === j && props.hand[i].placed) {
                        clonedBoard[j] = "";
                        props.hand[i].placed = false;
                    }
                }
            }
            setBoard(clonedBoard);
            props.setRemove(false);
        }
    }, [props.remove])

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
                            opacity: val === ""  ? 0.30 : 1,
                            backgroundColor: val !== "" || canPlace(index) ? "#eee5e9ff" : "#ff0002"
                        }}
                        onClick={() => {
                            if (props.selectedTile.char !== "") {
                                setIndexPlacement(index);
                            }
                        }}>
                        <div className="board-tile-char">{val}</div>
                    </motion.div>))}
            </div>
        </div>);
};

export default Board;
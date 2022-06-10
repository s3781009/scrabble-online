import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

const Board = (props) => {

    const [board, setBoard] = useState(Array(15 * 15).fill(""));
    const [indexPlacement, setIndexPlacement] = useState(-1);


    useEffect(() => {
        let clonedBoard = board.slice(); //creates the clone of the state
        clonedBoard[indexPlacement] = props.selectedTile.char;
        setBoard(clonedBoard);
        props.setSelectedTile({char: "", index: -1});
    }, [indexPlacement]);

    const canPlace = (index) => {
        let placeable = true;
        let empty = true;
        //check if the board is empty ,if it is then the every position is placeable
        for (const tile in board) {
            if (tile != "") {
                empty = false;
            }
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
        if (index ===224) {
            if ( board[index - 1] === "" && board[index - 15] === "" && !empty) {
                placeable = false;
            }
        }


        return placeable;
    };

    return (<div>
        <div className="grid-container">
            {board.map((val, index) => (<motion.div key={index} whileHover={{
                opacity: val === "" && canPlace() ? 0.30 : 1,
                backgroundColor: val !== "" || canPlace(index) ? "#eee5e9ff" : "#ff0002"
            }} style={{
                height: 40,
                width: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#eee5e9ff",
                borderRadius: 5
            }} onClick={() => {
                if (props.selectedTile.char !== "") {
                    setIndexPlacement(index);
                }
            }}>
                <div style={{fontWeight: 400, fontSize: "1.5rem"}}>{val}</div>
            </motion.div>))}
        </div>
    </div>);
};

export default Board;
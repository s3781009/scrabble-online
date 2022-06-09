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

    return (<div>
            <div className="grid-container">
                {board.map((val, index) => (<motion.div whileHover={{opacity: val === "" ? 0.3 : 1}} style={{
                    height: 40,
                    width: 40,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eee5e9ff",
                    borderRadius: 5
                }} onClick={() => setIndexPlacement(index)}>
                    <div style={{fontWeight: 400, fontSize: "1.5rem"}}>{val}</div>
                </motion.div>))}
            </div>
        </div>);
};

export default Board;
import React, { useState } from 'react';
import '../css/Tile.css'
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import dist from '@giantmachines/redux-websocket/dist';
import { setSelectedTile } from '../redux/PlayerSlice';

const Tile = (props) => {
    const [selected, setSelected] = useState(false);

    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();

    return (
        <motion.div
            whileHover={{ scale: props.placed || !player.isTurn ? 1 : 1.3 }}
            animate={{ opacity: player.selectedTile.index == props.index || !player.isTurn ? 0.3 : 1 }}
            className='Tile'
            style={{ backgroundColor: props.color, }}
            onClick={() => {
                dispatch(setSelectedTile({ char: props.char, index: props.index }));
                console.log({ char: props.char, index: props.index });
                console.log(props.char);
                // props.onClick(selected || props.placed || !props.turn ? { char: "", index: -1 } : { char: props.char, index: props.index })
            }}>
            <Typography variant='h5'
                onClick={() => {
                    dispatch(setSelectedTile({ char: props.char, index: props.index }));
                    console.log({ char: props.char, index: props.index });
                    console.log(props.char);
                    // props.onClick(selected || props.placed || !props.turn ? { char: "", index: -1 } : { char: props.char, index: props.index })
                }}
                style={{
                    alignItems: "center",
                    alignContent: "center",
                    backgroundColor: props.color,
                    color: "black"
                }}>{props.char}</Typography>
        </motion.div>
    );
};

export default Tile;

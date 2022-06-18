import React, {useState} from 'react';
import './css/Tile.css'
import {Typography} from "@mui/material";
import {motion} from "framer-motion";

const Tile = (props) => {
    const [selected, setSelected] = useState(false);

    return (
        <motion.div
            whileHover={{scale: props.placed ||! props.turn ? 1 : 1.3}}
            animate={{opacity: props.placed || !props.turn? 0.3: 1}}
            className='Tile'
            style={{backgroundColor: props.color,}}
            onClick={() => {
                console.log(props.placed);
                props.onClick(selected || props.placed ||!props.turn  ? {char:"",index:-1 }:{char: props.char, index: props.index})
            }}>
            <Typography variant='h5' onClick={() => console.log(props.char)} style={{
                alignItems: "center",
                alignContent: "center",
                backgroundColor: props.color,
                color: "black"
            }}>{props.char}</Typography>
        </motion.div>
    );
};

export default Tile;
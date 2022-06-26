import React from 'react';
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
const Scores = () => {

    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();

    return (
        <div className="right-container">
            <div className="op">
                <div className="score-name">{player.name}</div>
                <div className="score-name"> {player.score}</div>
            </div>

            <motion.div
                className="current-player"
                initial={false}
            >
                <div className="score-name">{player.name}</div>
                <div className="score-name"> {player.score}</div>
            </motion.div>
        </div>
    );
};

export default Scores;

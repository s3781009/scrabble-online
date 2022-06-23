import React from 'react';
import {motion} from "framer-motion";

const playerScores = () => {

    return (
        <div className="right-container">
            <div className="op">
                <div className="score-name">{op.name}</div>
                <div className="score-name"> 5</div>
            </div>

            <motion.div
                className="current-player"
                initial={false}
                animate={animateScore ? 'rotate' : 'stop'}
            >
                <div className="score-name">{player.name}</div>
                <div className="score-name"> 10</div>
            </motion.div>
        </div>
    );
};

export default playerScores;

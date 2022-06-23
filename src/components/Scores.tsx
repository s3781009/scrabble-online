import React from 'react';
import {motion} from "framer-motion";

const Scores = () => {

    return (
        <div className="right-container">
            <div className="op">
                <div className="score-name">name</div>
                <div className="score-name"> 0</div>
            </div>

            <motion.div
                className="current-player"
                initial={false}
            >
                <div className="score-name">name</div>
                <div className="score-name"> 10</div>
            </motion.div>
        </div>
    );
};

export default Scores;

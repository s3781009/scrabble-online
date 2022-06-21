import React, {useState} from 'react';
import {motion} from "framer-motion";

const Rule = (props) => {

    return (
        <motion.div whileHover={{scale: 1.2, color: "#F47174"}}
                    animate={{scale: props.title.clicked ? 1.3 : 1, color: props.title.clicked ? "#F47174" : "#eee4da"}}
                    className={"rule-section"}
                    onClick={() => {
                        props.changeTitle();
                    }}>
            {props.title.text}
        </motion.div>
    );
};

export default Rule;

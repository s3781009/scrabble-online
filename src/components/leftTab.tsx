import React, {useState} from 'react';
import './leftTab.css';
import {motion} from 'framer-motion';
import {AiFillPlusCircle,AiOutlineArrowLeft} from 'react-icons/ai';
import {MdMeetingRoom} from 'react-icons/md';
import {BarLoader} from 'react-spinners';

const LeftTab = () => {
    const [showButtons, setShowButtons] = useState(true);
    const [codeLoading, setCodeLoading] = useState(true);
    return (
        <div className="container">
            {showButtons ? <>
                <div className="arrow">
                <AiOutlineArrowLeft/>
                </div>
                <motion.button
                    whileHover={{opacity: 0.7}}
                    className="game-buttons"
                    onClick={() => setShowButtons(false)}
                >
                    <div className="row">
                        <AiFillPlusCircle size={60} color={"white"}/>
                        <div className="title">
                            NEW GAME
                        </div>
                    </div>
                </motion.button>
                <motion.button
                    whileHover={{opacity: 0.7}}
                    className="game-buttons"
                    onClick={() => setShowButtons(false)}
                >
                    <div className="row">
                        <MdMeetingRoom size={60} color={"white"}/>
                        <div className="title">
                            JOIN GAME
                        </div>
                    </div>
                </motion.button>
            </> : <>

                <div className="code">GAME CODE</div>
                <div>
                    {codeLoading ? <BarLoader/> : null}
                </div>
                <input className="name"></input>
            </>}

        </div>
    );
};

export default LeftTab;

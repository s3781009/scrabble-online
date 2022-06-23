import React, {useState} from 'react';
import './leftTab.css';
import {motion} from 'framer-motion';
import {AiFillPlayCircle, AiFillPlusCircle, AiOutlineArrowLeft} from 'react-icons/ai';
import {MdMeetingRoom} from 'react-icons/md';
import {BarLoader} from 'react-spinners';

const LeftTab = () => {

    const [showButtons, setShowButtons] = useState(true);
    const [codeLoading, setCodeLoading] = useState(true);
    const [showNewGame, setShowNewGame] = useState(false);
    const [showJoinGame, setShowJoinGame] = useState(false);
    const [showPlayGame, setShowPlayGame] = useState(false);

    const toNewGame = () => {
        setShowButtons(false);
        setShowNewGame(true);
    }

    const toJoinGame = () => {
        setShowButtons(false);
        setShowJoinGame(true);
    }

    const back = () => {
        setShowJoinGame(false);
        setShowNewGame(false);
        setShowButtons(true);
    }

    return (
        <>
            <div className="container">

                {showButtons ? <>
                    <motion.button
                        whileHover={{opacity: 0.7}}
                        className="game-buttons"
                        onClick={() => toNewGame()}
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
                        onClick={() => toJoinGame()}
                    >
                        <div className="row">
                            <MdMeetingRoom size={60} color={"white"}/>
                            <div className="title">
                                JOIN GAME
                            </div>
                        </div>

                    </motion.button>
                </> : <>
                    <motion.div whileHover={{backgroundColor: "#f3b27a", borderRadius: "5px"}}
                                style={{alignSelf: "start", marginLeft: "5%", color: "white"}}
                                onClick={() => back()}>
                        <AiOutlineArrowLeft size={30}/>
                    </motion.div>
                    <div className="code">GAME CODE</div>
                    <div>
                        {codeLoading ? <BarLoader/> : null}
                    </div>
                    <input className="name" placeholder="name"></input>
                </>}
                {showJoinGame || showNewGame ? <div className="bottom-container">
                    <div className="play-container">
                        <motion.button className="play-button">
                            <AiFillPlayCircle size={40} color={"lack"}/>
                            <div className="play-text">
                                PLAY
                            </div>

                        </motion.button>
                    </div>
                </div> : null}
            </div>
        </>
    );
};

export default LeftTab;

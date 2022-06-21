import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {motion} from 'framer-motion';
import {MdCloudDone} from "react-icons/all";
import {PacmanLoader} from "react-spinners";
import {useNavigate} from 'react-router';
import './joinGame.css';

const JoinGame = () => {

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const sumbitName = () => {
        navigate('/play', {state: {initiator: false, gameCode: code, name: name}});
    };


    return (
        <div className="App">
            <Header/>
            <div className="body">

                <motion.input
                    className="name-input"
                    placeholder={"Your name..."}
                    onChange={(e) => setName(e.target.value)}>
                </motion.input>

                <motion.input
                    className="game-input"
                    placeholder={"Game code..."}
                    onChange={(e) => setCode(e.target.value)}>
                </motion.input>

                <motion.button
                    className="game-button"
                    whileHover={{scale: 1.3, opacity: 0.5}}
                    onClick={() => sumbitName()}>
                    <MdCloudDone/>
                </motion.button>

                {submitted ?
                    <div style={{marginTop: 30, marginRight: 140,}}>
                        <PacmanLoader color={"#f3b27a"} size={60}/>
                    </div>
                    : null}
            </div>

        </div>);
};

export default JoinGame;
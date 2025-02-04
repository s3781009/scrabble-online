import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {motion} from 'framer-motion';
import {MdCloudDone} from "react-icons/all";
import {PacmanLoader} from "react-spinners";
import {useNavigate} from 'react-router';

const JoinGame = () => {

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const sumbitName = () => {
        navigate('/play', {state: {initiator: false ,gameCode:code, name:name}});
    };


    return (<div>
        <Header/>
        <div style={{
            height: 2000,
            backgroundColor: "#32343BFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start"
        }}>
            <motion.input style={{
                marginTop: 100,
                marginBottom: 30,
                width: 400,
                height: 50,
                borderRadius: 10,
                fontSize: 30,
                backgroundColor: "#eee5e9ff",
                fontWeight: 700,
            }} placeholder={"Your name..."} onChange={(e) => setName(e.target.value)}></motion.input>
            <motion.input style={{
                marginBottom: 30,
                width: 400,
                height: 50,
                borderRadius: 10,
                fontSize: 30,
                backgroundColor: "#eee5e9ff",
                fontWeight: 700,
                border: 'none',
            }} placeholder={"Game code..."} onChange={(e) => setCode(e.target.value)}></motion.input>
            <motion.button whileHover={{scale: 1.3, opacity: 0.5}} style={{
                width: 200, height: 60, backgroundColor: "#52dee5ff", borderRadius: 10, border: "none"
            }} onClick={() => sumbitName()}>
                <MdCloudDone/>
            </motion.button>
            {submitted ?
                <div style={{marginTop: 30, marginRight: 140,}}>
                    <PacmanLoader color={"#f3b27a"} size={60}/>
                </div> : null}
        </div>

    </div>);
};

export default JoinGame;
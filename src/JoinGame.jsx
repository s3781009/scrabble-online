import React, {useState} from 'react';
import Header from "./Header";
import {motion} from 'framer-motion';
import {MdCloudDone} from "react-icons/all";

const JoinGame = () => {
    let input = "";
    const [gameCode, setGameCode] = useState("");
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
            }} placeholder={"Your name..."}></motion.input>
            <motion.input style={{
                marginBottom: 30,
                width: 400,
                height: 50,
                borderRadius: 10,
                fontSize: 30,
                backgroundColor: "#eee5e9ff",
                fontWeight: 700,
                border:'none',
            }} placeholder={"Game code..."}></motion.input>
            <motion.button whileHover={{scale: 1.3, opacity: 0.5}} style={{
                width: 200,
                height: 60,
                backgroundColor: "#52dee5ff",
                borderRadius: 10,
                border: "none"
            }}>
               <MdCloudDone/>
            </motion.button>
        </div>
    </div>);
};

export default JoinGame;
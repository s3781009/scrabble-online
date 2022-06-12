import React, {useState} from 'react';
import Header from "./Header";
import {motion} from 'framer-motion';
import {MdCloudDone} from "react-icons/all";

const JoinGame = () => {

    const socket = new WebSocket("wss://scrabble-web-server.herokuapp.com/join");
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    socket.onmessage = (message) => {
        console.log("message received");
        console.log(JSON.parse(message.data));
    };
    socket.onerror = (err) => {
        console.log(err);
    };
    const sumbitName = () => {
        console.log("button pressed");
        socket.onopen = () => {
            let toSend = {
                Connection: null, id: "", name: name, hand: null, gameCode: code, action: "join"
            };
            console.log(toSend);
            socket.send(JSON.stringify(toSend));
            console.log("sent");
        };
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
                width: 200,
                height: 60,
                backgroundColor: "#52dee5ff",
                borderRadius: 10,
                border: "none"
            }} onClick={() => sumbitName()}>
                <MdCloudDone/>
            </motion.button>
        </div>
    </div>);
};

export default JoinGame;
import {Player} from "./PlayerSlice";

const interval = setInterval((player:Player, socket:WebSocket) => {

    let toSend = {
        Connection: null, id: "", name: name, hand: null, gameCode: player.gameCode.toString(), action: "ping"
    };
    console.log("ping");
    socket.onopen = () => {
        socket.send(JSON.stringify(toSend));
    }
}, 1000);

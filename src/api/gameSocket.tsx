
const openConnection=()
if (player === null) {
    socket.onopen = () => {

        let toSend :Message= {
            Connection: null,
            id: "",
            name: name,
            hand: [],
            gameCode: gameCode.toString(),
            action: "join"
        };

        socket.send(JSON.stringify(toSend));
        console.log("joined");
    };
}

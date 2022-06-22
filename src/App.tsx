import {useState} from "react";
import "./css/App.css";
import Header from "./components/Header";
import {motion} from 'framer-motion';
import Rule from "./components/Rule";
import {NavLink} from "react-router-dom";
import React from "react";

function App() {
    const [visible, setVisible] = useState();
    const [titles, setTitles] = useState(
        [{
            text: "The Scrabble Board",
            clicked: false,
            body: "A standard Scrabble board will consist of cells that are located in a large square grid. The board offers 15 cells high and 15 cells wide. The tiles used on the game will fit in each cell on the board."
        },
            {
                text: "Scrabble Tiles",
                clicked: false,
                body: "There are 100 tiles that are used in the game and 98 of them will contain letters and point values. There are 2 blank tiles that can be used as wild tiles to take the place of any letter. When a blank is played, it will remain in the game as the letter it substituted for.\n" +
                    "\n" +
                    "Different letters in the game will have various point values and this will depend on how rare the letter is and how difficult it may be to lay that letter. Blank tiles will have no point va"
            },
            {
                text: "Tile Values",
                clicked: false,
                body: "  Below are the point values for each letter that is used in a Scrabble game." +
                    "0 Points - Blank tile" +
                    "1 Point - A, E, I, L, N, O, R, S, T and U." +
                    "2 Points - D and G." +
                    "3 Points - B, C, M and P." +
                    "4 Points - F, H, V, W and Y." +
                    "5 Points - K." +
                    "8 Points - J and X." +
                    "10 Points - Q and Z."
            },
            {
                text: "Starting the Game",
                clicked: false,
                body: "Without looking at any of the tiles in the bag, players will take one tile. The player that has the letter that is closest to “A” will begin the game. A blank tile will win the start of the game. The tiles are them replaced to the bag and used in the remainder of the game.\n" +
                    "\n" +
                    "Every player will start their turn by drawing seven tiles from the Scrabble bag. There are three options during any turn. The player can place a word, they can exchange tiles for new tiles or they can choose to pass. In most cases, players will try to place a word as the other two options will result in no score.\n" +
                    "\n" +
                    "When a player chooses to exchange tiles, they can choose to exchange one or all of the tiles they currently hold. After tiles are exchanged, the turn is over and players will have to wait until their next turn to place a word on the board.\n" +
                    "\n" +
                    "Players can choose to pass at any time. They will forfeit that turn and hope to be able to play the next time. If any player passes two times in a row, the game will end and the one with the highest score will win."
            },
            {
                text: "Replacing the Tiles",
                clicked: false,
                body: "Once tiles are played on the board, players will draw new tiles to replace those. Players will always have seven tiles during the game. Drawing tiles is always done without looking into the bag so that the letters are always unknown."
            },
            {
                text: "BINGO!!!",
                clicked: false,
                body: " Exciting rewards can come when players use all seven tiles to create a word on the board. When this happens, players will receive a 50 point bonus, in addition to the value of the word. If the game is near the end and players are not holding seven tiles, they do not get the bonus for using all of their tiles. This is only collected for seven letter words placed."
            },
            {
                text: "The end of the Scrabble Game",
                clicked: false,
                body: "Once all tiles are gone from the bag and a single player has placed all of their tiles, the game will end and the player with the highest score wins."
            }]);

    const changeTitle = (index: number) => {
        for (let i = 0; i < titles.length; i++) {
            titles[i].clicked = false;
        }
        let clonedTitles = titles.slice();
        console.log(index);
        clonedTitles[index].clicked = true;
        setVisible(clonedTitles[index].body);
        setTitles(clonedTitles);
    }

    return (<div className="App">
        <Header/>
        {/*<Play></Play>*/}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <div style={{
                marginTop: 50,
                font: 'source code pro',
                fontWeight: 700,
                fontSize: 30,
                color: 'white',
                marginBottom: 50
            }}>
                Rules:
            </div>
            <div style={{width: 1100, height: 1, marginBottom: 20, backgroundColor: "#d3cdc1"}}></div>
            <div style={{
                height: 300,
                width: 1100,
                display: "flex",
                flexDirection: "row",
                marginBottom: 50,
                justifyContent: "space-between"
            }}>
                <div className={"scroll"}>
                    {titles.map((title, i) => <Rule key={i} changeTitle={() => changeTitle(i)} title={title}/>)}


                </div>
                <motion.div initial={{opacity: 0.3}} transition={{delay: 1.5, duration: 1.4}} animate={{opacity: 1}}
                            style={{
                                height: 300,
                                width: 600,
                                color: "#eee5e9ff",
                                alignItems: "start",
                                justifyContent: "start",
                                textAlign: "start"
                            }}>
                    {visible}
                </motion.div>
            </div>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            </div>
            <div style={{marginTop: 100}}>
                <NavLink to={"/join"}>

                    <motion.button whileHover={{scale: 1.3, opacity: 0.5}} style={{
                        backgroundColor: "#386FA4",
                        height: 70,
                        width: 150,
                        border: "none",
                        borderRadius: 5,
                        fontWeight: 600,
                        marginRight: 100
                    }}>Join
                    </motion.button>
                </NavLink>
                <NavLink to={"/newgame"}>
                    <motion.button whileHover={{scale: 1.3, opacity: 0.5}} style={{
                        backgroundColor: "#",
                        height: 70,
                        width: 150,
                        border: "none",
                        borderRadius: 5,
                        fontWeight: 600,
                    }}>New
                    </motion.button>
                </NavLink>
            </div>

        </div>
    </div>);
}

export default App;
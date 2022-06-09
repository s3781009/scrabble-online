import {useState} from "react";
import "./css/App.css";
import {Box, Button, Typography} from "@mui/material";
import Header from "./Header";
import {NavLink} from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);
    const [joinGame, setJoinGame] = useState(false);

    return (<div className="App">
            <Header/>
            <header className= "App-header">
                {/*<Play></Play>*/}
                <div className="App-body">
                    <Box marginRight={5}>
                        <NavLink to={"/newgame"}>
                            <Button className="game-buttons" variant="contained" color="success">New Game</Button>
                        </NavLink>
                    </Box>
                    <Box marginLeft={5}>
                        <NavLink style={{textDecoration: 'none'}} to="/join">
                            <Button className="game-buttons"
                                    variant="contained"
                                    color="success">
                                <Typography>Join Game</Typography>
                            </Button>
                        </NavLink>
                    </Box>
                </div>
            </header>
        </div>);
}

export default App;
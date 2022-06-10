import React from 'react';
import TextField from '@mui/material/TextField'
import {Box, Button, Grid, Typography} from "@mui/material";
import Header from "./Header";
import {NavLink} from "react-router-dom";

const JoinGame = () => {
    return (<div>
            <Header/>
            <header className="App-header">
                <div className={"join-game"}>
                    <Box marginBottom="100px">
                        <Typography fontSize="30px">Enter the code</Typography>
                    </Box>
                    <Grid display="flex" flex="row">
                        <Box marginRight="10px" width="200px">
                            <TextField fullWidth="200px" sx={{input: {color: 'white'}}} variant="filled"
                                       color="primary"></TextField>
                        </Box>
                        <Button style={{textTransform: 'none'}} variant="contained">
                            <NavLink style={{textDecoration: 'none', color: 'white'}}
                                     to="/play"><Typography> Done</Typography></NavLink></Button>
                    </Grid>
                </div>
            </header>
        </div>);
};

export default JoinGame;
import React, {useState} from 'react';
import {Box, Button, Drawer, Typography} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {NavLink} from "react-router-dom";

const Header = () => {

    const [drawer, setDrawer] = useState(false);

    return (<div>
        <div className="App-bar">
            <Box>
                <NavLink style={{textDecoration: 'none'}} to="/">
                    <h className="App-title"> Scrabble</h>
                </NavLink>
            </Box>
            <div className="app-menu" align="right">
                <Button onClick={() => setDrawer(!drawer)} variant="outlined">
                    <SettingsIcon color={"#eee4da"}/>
                </Button>
            </div>
        </div>
        <Drawer anchor='right' open={drawer} onClose={() => setDrawer(false)}>
            <Box bgcolor="#282c34" width="250px" height="100%">
                <Typography fontSize="30px" color="white">Settings</Typography>
            </Box>
        </Drawer>
    </div>);
};

export default Header;
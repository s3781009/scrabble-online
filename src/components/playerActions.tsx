import React from 'react';
import {Button} from "@mui/material";
import {AiOutlineSwap, MdOutlineCancel, MdOutlineDoneAll} from "react-icons/all";

const PlayerActions = () => {
    return (
        <div>
            <Button
                className="remove-button"
            >
                <MdOutlineCancel size={30}/>
            </Button>

            <Button className="action-button">
                <AiOutlineSwap size={30}/>
            </Button>

            <Button
                className="action-button"
            >
                <MdOutlineDoneAll size={30}/>
            </Button>
        </div>
    );
};

export default PlayerActions;

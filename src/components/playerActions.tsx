import React from 'react';
import {Button} from "@mui/material";
import {AiOutlineSwap, MdOutlineCancel, MdOutlineDoneAll} from "react-icons/all";

const MyComponent = () => {
    return (
        <div>
            <Button
                className="remove-button"
                onClick={() => setRemoveFromBoard(true)}>
                <MdOutlineCancel size={30}/>
            </Button>

            <Button  className="action-button">
                <AiOutlineSwap size={30}/>
            </Button>

            <Button
                className="action-button"
                onClick={() => placeDone()}
            >
                <MdOutlineDoneAll size={30}/>
            </Button>
        </div>
    );
};

export default MyComponent;

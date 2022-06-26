import React, { useEffect } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai';
import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setName, setGameCode } from '../redux/PlayerSlice';
import axios from 'axios';

const Join = ({ createGame }) => {

    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.get("https://scrabble-web-server.herokuapp.com/new")
            .then(res => {
                dispatch(setGameCode(res.data.id));
            }).catch((e) => console.log(e));
    }, []);



    return (

        <>
            <input className="name" placeholder="name" onChange={(event) => dispatch(setName(event.target.value))}></input>
            <input className="name" placeholder="game code" onChange={(event) => dispatch(setGameCode(event.target.value))}></input>
            <div className="bottom-container">
                <div className="play-container">
                    <Button className="play-button" onClick={() => createGame()}>
                        <AiFillPlayCircle size={40} color={"lack"} />
                        <div className="play-text">
                            PLAY
                        </div>
                    </Button>
                </div>
            </div>
        </>
    )
}
export default Join;

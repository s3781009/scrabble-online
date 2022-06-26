import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import { AiFillPlayCircle } from 'react-icons/ai';
import { setGameCode, setName } from '../redux/PlayerSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import axios from 'axios';

const New = ({ createGame }) => {

    useEffect(() => {
        axios.get("https://scrabble-web-server.herokuapp.com/new")
            .then(res => {
                dispatch(setGameCode(res.data.id));
            }).catch((e) => console.log(e));
    }, []);

    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();
    return (
        <>
            <div className="code">GAME CODE</div>

            <div>
                <div className="gamecode">{player.gameCode}</div>
            </div>
            <input

                className="name"
                placeholder="name"
                onChange={(event) => dispatch(setName(event.target.value))}>
            </input>

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

export default New;

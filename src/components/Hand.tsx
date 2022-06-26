import React, { useState } from 'react';
import Tile from "./Tile";
import './Hand.css';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

const Hand = () => {

    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();
    return (
        <div className="hand-container">
            {player.hand.map((tile, i) =>
                <Tile index={i}
                    key={i}
                    color={player.selectedTile === i && !player.hand[i].placed ? '#f3b27a' : "#eee4da"}
                    char={tile.char}
                />)}
        </div>
    );
};

export default Hand;

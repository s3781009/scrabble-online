import React, { useState } from 'react';
import Tile from "./Tile";
import './Hand.css';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

const Hand = (props) => {

    const player = useAppSelector(state => state.player);
    const dispatch = useAppDispatch();
    return (
        <div className="hand-container">
            {player.hand.map((tile, i) =>
                <Tile index={i}
                    turn={props.turn}
                    placed={tile.placed}
                    key={i}
                    selectedTile={props.selectedTile}
                    color={props.selectedTile.index === i && !props.tiles[i].placed ? '#f3b27a' : "#eee4da"}
                    onClick={props.onClick}
                    char={tile.char}
                />)}
        </div>
    );
};

export default Hand;

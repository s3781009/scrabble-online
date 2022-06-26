import React, { useState } from 'react';
import Tile from "./Tile";
import './Hand.css';

const Hand = (props) => {

    return (
        <div className="hand-container">
            {props.tiles ? props.tiles.map((tile, i) =>
                <Tile index={i}
                    turn={props.turn}
                    placed={tile.placed}
                    key={i}
                    fromHand={true}
                    selectedTile={props.selectedTile}
                    color={props.selectedTile.index === i && !props.tiles[i].placed ? '#f3b27a' : "#eee4da"}
                    onClick={props.onClick}
                    char={tile.char}
                />) : null}
        </div>
    );
};

export default Hand;

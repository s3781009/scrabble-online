import React, {useState} from 'react';
import Tile from "./Tile";

const Hand = (props) => {
    // hand.tiles.map((tile)=>)


    // useEffect(()=>hand.forEach(tile=>selectedTile),[]);
    const [tiles, setTiles] = useState([]);

    const tileState = () => {
        for (const placedTile in props.placedTiles) {

            for (const tile in props.tiles) {
                if (tile === placedTile) {

                }
            }
        }
        console.log(props.placedTiles);
    };
    return (
        <div style={{display: "flex", flexDirection: "row", width: 300}}>
            {tiles ? props.tiles.map((tile, i) =>
                <Tile index={i}
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
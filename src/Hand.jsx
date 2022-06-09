import React, {useState} from 'react';
import Tile from "./Tile";

const Hand = (props) => {
    // hand.tiles.map((tile)=>)


    // useEffect(()=>hand.forEach(tile=>selectedTile),[]);
    const [tiles, setTiles] = useState([]);
    return (
        <div style={{display:"flex", flexDirection:"row", width:300}}>
            {tiles ? props.tiles.map((tile, i) => <Tile index={i}
                                                        key={i}
                                                        fromHand={true}
                                                        selectedTile={props.selectedTile}
                                                        color={props.selectedTile.index === i ? '#f3b27a' : "#eee4da"}
                                                        onClick={props.onClick}
                                                        char={tile}/>) : null}
        </div>
    );
};

export default Hand;
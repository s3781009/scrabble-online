import Hand from "../components/Hand";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

type Tile = {
    char: string,
    value: number,
    placed: boolean,
    boardIndex?: number
}
type Player = {
    name: string,
    hand: Tile[],
    isTurn: boolean,

}
const initialState: Player = {
    hand:[],
    name: "",
    isTurn: true,
}
export const PlayerSlice = createSlice({
    name:'Player',
    initialState,
    extraReducers: undefined,
    reducers: {
        getPlayer: (state,action:PayloadAction<Player>)=>{
            state = action.payload;
        }
    }

})

export const {getPlayer} = PlayerSlice.actions;

export const selectPlayer = (state:RootState) =>state;

export  default PlayerSlice.reducer;

import Hand from "../components/Hand";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export type Tile = {
    char: string,
    value?: number,
    placed?: boolean,
    index?: number,
    boardIndex?: number
}
export type Message = {
    Connection ?: any,
    id:string,
    name:string,
    hand: Tile[],
    gameCode:string,
    action:string,
}
export type Player = {
    name: string,
    hand: Tile[],
    board: Tile[],
    isTurn: boolean,

}
const initialState: Player = {
    hand:[],
    name: "",
    board:[],
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

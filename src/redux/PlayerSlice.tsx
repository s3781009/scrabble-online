import Hand from "../components/Hand";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Tile = {
    char: string,
    value?: number,
    placed?: boolean,
    index?: number,
    boardIndex?: number
}
export type Message = {
    Connection?: any,
    id: string,
    name: string,
    hand: Tile[],
    gameCode: string,
    action: string,
}
export type Player = {
    name: string,
    hand: Tile[],
    board: Tile[],
    isTurn: boolean,
    score: number,
    gameCode: string,
    selectedTile?: Tile,

}
const initialState: Player = {
    hand: [],
    name: "player1",
    board: [],
    score: 0,
    isTurn: true,
    gameCode: "",
    selectedTile: { char: "", index: -1 },
}
export const PlayerSlice = createSlice({
    name: 'Player',
    initialState,
    extraReducers: undefined,
    reducers: {
        setPlayer: (state, action: PayloadAction<Player>) => {
            state.hand = action.payload.hand;
            state.name = action.payload.name;
            state.board = action.payload.board;
            state.isTurn = action.payload.isTurn;

        },
        setHand: (state, action: PayloadAction<Tile[]>) => {
            state.hand = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setGameCode: (state, action: PayloadAction<string>) => {
            state.gameCode = action.payload;
        },
        setSelectedTile: (state, action: PayloadAction<Tile>) => {
            state.selectedTile = action.payload;
        },
        setPlacedTile: (state, action: PayloadAction<Tile>) => {
            state.selectedTile = action.payload;
        },
    }

})

export const { setPlayer, setHand, setName, setGameCode, setSelectedTile } = PlayerSlice.actions;

export const selectPlayer = (state: RootState) => state;

export default PlayerSlice.reducer;

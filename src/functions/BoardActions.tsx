

import { useAppDispatch, useAppSelector } from "../redux/hooks";



export const canPlace = (index: number, board: string[]) => {
    let placeable = true;
    let empty = true;
    //check if the board is empty ,if it is then the every position is placeable
    for (let i = 0; i < board.length; i++) {
        if (board[i] !== "") {
            empty = false;
        }
    }
    if (empty) {
        return true;
    }
    if (index > 14 && index < 210) {
        if (board[index + 1] === "" && board[index - 1] === "" && board[index + 15] === "" && board[index - 15] === "" && !empty) {
            placeable = false;
        }
    }
    if (index < 15) {
        if (board[index + 1] === "" && board[index - 1] === "" && board[index + 15] === "" && !empty) {
            placeable = false;
        }
    }
    if (index > 209) {
        if (board[index + 1] === "" && board[index - 1] === "" && board[index - 15] === "" && !empty) {
            placeable = false;
        }
    }
    if (index === 224) {
        if (board[index - 1] === "" && board[index - 15] === "" && !empty) {
            placeable = false;
        }
    }
    return placeable;
};

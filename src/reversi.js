import { writable, Writable } from "svelte/store";

type Color = "White" | "Black";
type Square = {
    isFilled: boolean;
    color?: Color;
};
type Board = Square[][];

export const hoge = "aaa";

export function createBoard(rowSize: number, colSize: number): Writable<Board> {
    const board = writable(initialState(rowSize, colSize));
    return board;
}

function initialState(rowSize, colSize) {
	const board: Board = [];
	for (let i = 0; i < rowSize; i++) {
		board[i] = [];
		for (let j = 0; j < colSize; j++) {
			if (i === 3 && j === 3) {
				board[i][j] = { isFilled: true, color: "White" };
			} else if (i === 3 && j === 4) {
				board[i][j] = { isFilled: true, color: "Black" };
			} else if (i === 4 && j === 3) {
				board[i][j] = { isFilled: true, color: "Black" };
			} else if (i === 4 && j === 4) {
				board[i][j] = { isFilled: true, color: "White" };
			} else {
				board[i][j] = { isFilled: false };
			}
		}
    }
    return board;
}
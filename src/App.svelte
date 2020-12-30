<script lang="ts">
	import { writable } from "svelte/store";

	const ROW_SIZE = 8;
	const COLUMN_SIZE = 8;
	type Color = "White" | "Black";
	type Square = {
		isFilled: boolean;
		color?: Color;
	};
	type Board = Square[][];
	type Player = {
		color: "White" | "Black";
	};

	function createPlayer() {
		const player = writable<Player>({ color: "White" });
		return player;
	}

	function createBoard(rowSize: number, colSize: number) {
		const board = writable(initialState(rowSize, colSize));
		return board;
	}

	function initialState(rowSize: number, colSize: number) {
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
		return { board };
	}

	function togglePlayer() {
		playerStore.update((player) => {
			return {
				color: player.color === "White" ? "Black" : "White",
			};
		});
	}

	function getChangeStoneColorPositions(
		color: Color,
		row: number,
		col: number
	): { row: number; col: number }[] {
		let changeStoneColorPositions = [];

		// 上方向の探索
		const topChangeStoneColorPositions = [];
		for (let i = row - 1; i >= 0; i--) {
			if (
				topChangeStoneColorPositions.length !== 0 &&
				board[i][col]?.color === color
			) {
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...topChangeStoneColorPositions,
				];
			}
			if (!board[i][col]?.isFilled || board[i][col]?.color === color) {
				break;
			} else {
				topChangeStoneColorPositions.push({ row: i, col });
			}
		}

		// 右上方向の探索
		const rightTopChangeStoneColorPositions = [];
		let j = col;
		for (let i = row - 1; i >= 0; i--) {
			j++;
			if (
				rightTopChangeStoneColorPositions.length !== 0 &&
				board[i][j]?.color === color
			) {
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...rightTopChangeStoneColorPositions,
				];
			}
			if (!board[i][j]?.isFilled || board[i][j]?.color === color) {
				break;
			} else {
				rightTopChangeStoneColorPositions.push({ row: i, col: j });
			}
		}

		// 右方向の探索
		const rightChangeStoneColorPositions = [];
		for (let i = col + 1; i <= COLUMN_SIZE; i++) {
			if (
				rightChangeStoneColorPositions.length !== 0 &&
				board[row][i]?.color === color
			) {
				console.log({ rightChangeStoneColorPositions });
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...rightChangeStoneColorPositions,
				];
			}
			if (!board[row][i]?.isFilled || board[row][i]?.color === color) {
				break;
			} else {
				rightChangeStoneColorPositions.push({ row, col: i });
			}
		}

		// 右下方向の探索
		const rightBottomChangeStoneColorPositions = [];
		j = col;
		for (let i = row + 1; i < ROW_SIZE; i++) {
			j++;
			if (
				rightBottomChangeStoneColorPositions.length !== 0 &&
				board[i][j]?.color === color
			) {
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...rightBottomChangeStoneColorPositions,
				];
			}
			if (!board[i][j]?.isFilled || board[i][j]?.color === color) {
				break;
			} else {
				rightBottomChangeStoneColorPositions.push({ row: i, col: j });
			}
		}

		// 下方向の探索
		const bottomChangeStoneColorPositions = [];
		for (let i = row + 1; i < ROW_SIZE; i++) {
			if (
				bottomChangeStoneColorPositions.length !== 0 &&
				board[i][col]?.color === color
			) {
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...bottomChangeStoneColorPositions,
				];
			}
			if (!board[i][col]?.isFilled || board[i][col]?.color === color) {
				break;
			} else {
				bottomChangeStoneColorPositions.push({ row: i, col });
			}
		}

		// 左下方向の探索
		const leftBottomChangeStoneColorPositions = [];
		j = col;
		for (let i = row + 1; i < ROW_SIZE; i++) {
			j--;
			if (
				leftBottomChangeStoneColorPositions.length !== 0 &&
				board[i][j]?.color === color
			) {
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...leftBottomChangeStoneColorPositions,
				];
			}
			if (!board[i][j]?.isFilled || board[i][j]?.color === color) {
				break;
			} else {
				leftBottomChangeStoneColorPositions.push({ row: i, col: j });
			}
		}

		// 左方向の探索
		const leftChangeStoneColorPositions = [];
		for (let i = col - 1; i >= 0; i--) {
			if (
				leftChangeStoneColorPositions.length !== 0 &&
				board[row][i]?.color === color
			) {
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...leftChangeStoneColorPositions,
				];
			}
			if (!board[row][i]?.isFilled || board[row][i]?.color === color) {
				break;
			} else {
				leftChangeStoneColorPositions.push({ row, col: i });
			}
		}

		//  左上方向の探索
		const leftTopChangeStoneColorPositions = [];
		j = col;
		for (let i = row - 1; i >= 0; i--) {
			j--;
			if (
				leftTopChangeStoneColorPositions.length !== 0 &&
				board[i][j]?.color === color
			) {
				changeStoneColorPositions = [
					...changeStoneColorPositions,
					...leftTopChangeStoneColorPositions,
				];
			}
			if (!board[i][j]?.isFilled || board[i][j]?.color === color) {
				break;
			} else {
				leftTopChangeStoneColorPositions.push({ row: i, col: j });
			}
		}
		return changeStoneColorPositions;
	}

	function toggleStoneColor(
		positions: { row: number; col: number }[],
		board: Board
	): Board {
		positions.forEach((position) => {
			board[position.row][position.col].color =
				board[position.row][position.col].color === "White"
					? "Black"
					: "White";
		});
		return board;
	}

	function putStone(color: Color, position: { row: number; col: number }) {
		const { row, col } = position;
		boardStore.update(({ board }) => {
			board[position.row][position.col] = {
				isFilled: true,
				color: color,
			};
			const changeStoneColorPositions = getChangeStoneColorPositions(
				color,
				row,
				col
			);
			toggleStoneColor(changeStoneColorPositions, board);
			return { board };
		});
	}

	function canPutStone(
		board: Board,
		color: Color,
		position: { row: number; col: number }
	) {
		if (board[position.row][position.col].isFilled) {
			return false;
		}
		if (
			getChangeStoneColorPositions(color, position.row, position.col)
				.length === 0
		) {
			return false;
		}
		return true;
	}

	function initializeGame() {
		const boardStore = createBoard(ROW_SIZE, COLUMN_SIZE);
		const playerStore = createPlayer();
		return {
			boardStore,
			playerStore,
			gameResult: null,
		};
	}

	let board: Board;
	let player: Player;
	let errorMessage: string | null = null;
	let { boardStore, playerStore, gameResult } = initializeGame();
	boardStore.subscribe((value) => {
		board = value.board;
	});
	playerStore.subscribe((value) => {
		player = value;
	});

	function handleClick(i: number, j: number) {
		console.log({ board, player, i, j });
		const position = { row: i, col: j };
		if (canPutStone(board, player.color, position)) {
			errorMessage = null;
			putStone(player.color, position);
			togglePlayer();

			const existsEmptySquare = !!board.find(
				(row) => row.find((square) => !square.isFilled) !== undefined
			);
			if (!existsEmptySquare) {
				let whiteStoneCount = 0;
				board.forEach((row) => {
					whiteStoneCount += row.filter(
						(square) => square.color === "White"
					).length;
				});
				const blackStoneCount =
					ROW_SIZE * COLUMN_SIZE - whiteStoneCount;
				gameResult =
					whiteStoneCount > blackStoneCount
						? "Whiteの勝利です"
						: "Blackの勝利です";
			}
		} else {
			errorMessage = "無効な一手です";
		}
	}
</script>

<style>
	.board {
		width: 300px;
		height: 300px;
		display: grid;
		grid-template-rows: repeat(8, 1fr);
		grid-template-columns: repeat(8, 1fr);
	}
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
	}
</style>

<main>
	<div class="board">
		{#each board as row, i}
			{#each row as square, j}
				<div
					class="square"
					class:white={square.color === 'White'}
					class:black={square.color === 'Black'}
					on:click={(e) => handleClick(i, j)}>
					{#if square.color}
						{square.color === 'White' ? '○' : '●'}
					{/if}
				</div>
			{/each}
		{/each}
	</div>
	<div>currentPlayer: {player.color}</div>
	<div>
		{#if errorMessage !== null}{errorMessage}{/if}
	</div>
	<div>
		{#if gameResult !== null}
			<div>{gameResult}</div>
		{/if}
	</div>
</main>

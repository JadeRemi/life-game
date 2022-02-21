import React, { Component, useEffect, useState } from 'react';
import { Grid } from './Grid';

type BoardType = {
	rows: number,
	columns: number,
	grid: any[],
	intervalId: NodeJS.Timeout | null,
	generation: number
}

export const Board: React.FC = () => {

	const [rows, setRows] = useState(30);
	const [columns, setColumns] = useState(30);
	const [grid, setGrid] = useState([]);
	const [intervalId, setIntervalId] = useState(null);
	const [generation, setGeneration] = useState(0);
	
	useEffect(() => {
		reset();
	  }, []);

	

	const makeGrid = () => {
		let grid = new Array(columns);
		for (let i = 0; i < grid.length; i++) {
			grid[i] = new Array(rows);
		}
		return grid;
	}

	const step = () => {
		let next = makeGrid();
		

		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				let state = grid[i][j];
				let neighbors = count(grid, i, j);

				if (state === 0 && neighbors === 3) {
					next[i][j] = 1;
				} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
					next[i][j] = 0;
				} else {
					next[i][j] = state;
				}
			}
		}
		setGrid(next); 
		setGeneration(generation + 1);
	}

	const count = (grid: any, x: number, y: number) => {
		let sum = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let col = (x + i + columns) % columns;
				let row = (y + j + rows) % rows;

				sum += grid[col][row];
			}
		}

		sum -= grid[x][y];
		return sum;
	}

	const seed = () => {
		let newGrid = makeGrid();
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				newGrid[i][j] = Math.round(Math.random());
			}
		}
		setGrid(newGrid);
	}

	const play = () => {
		clearInterval(intervalId);
		setIntervalId(setInterval(step, 100));
	}

	const pause = () => {
		clearInterval(intervalId);
	}

	const reset = () => {
		let newGrid = makeGrid();
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				newGrid[i][j] = 0;
			}
		}
		setGrid(newGrid);
		setGeneration(0);
	}

	const toggleCell = (x: number, y: number) => {
		let newGrid = grid;
		newGrid[x][y] = newGrid[x][y] ? 0 : 1;
		setGrid(newGrid);
	}

	
	return (
		<div style={{ textAlign: 'center' }}>
			<button onClick={step}>Step</button>
			<button onClick={seed}>Randomize</button>
			<button onClick={play}>Play</button>
			<button onClick={pause}>Pause</button>
			<button onClick={reset}>Reset</button>
			<Grid
				grid={grid}
				columns={columns}
				rows={rows}
				onToggleCell={toggleCell}
			/>
			<p>Generation: {generation}</p>
		</div>
	);
	
}


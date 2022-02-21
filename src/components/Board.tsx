import React, { Component, useEffect, useRef, useState } from 'react';
import { Grid } from './Grid';

const INITIAL_SIZE = 30;


type BoardType = {
	rows: number,
	columns: number,
	grid: any[],
	intervalId: NodeJS.Timeout | null | number,
	generation: number
}

function useInterval(callback: any, delay: number) {
	const savedCallback = useRef(null);
	useEffect(() => {
	  savedCallback.current = callback;
	}, [callback]);
	useEffect(() => {
	  function tick() {
		savedCallback.current();
	  }
	  if (delay !== null) {
		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	  }
	}, [delay]);
  }


export const Board: React.FC = () => {

	const initalState = 0;
	const [rows, setRows] = useState(INITIAL_SIZE);
	const [columns, setColumns] = useState(INITIAL_SIZE);
	const [grid, setGrid] = useState([]);
	const [intervalId, setIntervalId] = useState<any>(0);
	const [generation, setGeneration] = useState(0);
	const [paused, setPaused] = useState(null);
	//const gridRef:any = useRef(initalState);
	
	useInterval(() => {
		if (!paused) {step()}
	}, 100);

	//useEffect(() => {
	//	gridRef.current = [...grid];
	//  })

	const makeGrid = () => {
		let newGrid = new Array(columns);
		for (let i = 0; i < newGrid.length; i++) {
			newGrid[i] = new Array(rows);
		}
		return newGrid;
	}

	const applyChange = (oldGrid: any) => {
		let next = makeGrid();
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				let state = oldGrid[i][j];
				let neighbors = count(i, j);

				if (state === 0 && neighbors === 3) {
					next[i][j] = 1;
				} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
					next[i][j] = 0;
				} else {
					next[i][j] = state;
				}
			}
		}
		return next;
	}

	const step = (manual?: boolean) => {
		//console.error(intervalId, generation);
		
		//setGrid((grid)=> next);
		if (!paused || manual) {
			setGrid((oldGrid)=> applyChange(oldGrid));
			setGeneration((generation) => generation + 1);
		}
	}

	const count = (x: number, y: number) => {
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
		//if (intervalId) {clearInterval(intervalId)};
		//
		//let newInterval = setInterval((x, y)=>{
		//	step();
		//}, 500);
		setPaused(false);
		//setIntervalId(newInterval);
	}

	const pause = () => {
		//if (intervalId) {clearInterval(intervalId)};
		setPaused(true);
	}

	const reset = () => {
		let newGrid = makeGrid();
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				newGrid[i][j] = 0;
			}
		}
		setGrid(newGrid);
		//setPlaying(false);
		setPaused(true)
		//if (intervalId) {clearInterval(intervalId)};
		setGeneration(0);
	}

	const toggleCell = (x: number, y: number) => {
		let newGrid = [...grid];
		newGrid[x][y] = newGrid[x][y] ? 0 : 1;
		setGrid(newGrid);
	}

	
	useEffect(() => {
		reset();
	  }, []);
	
	return (
		<div style={{ textAlign: 'center' }}>
			<div className="actionBar" >
				<button className="action" onClick={()=>step(true)}>Один шаг</button>
				<button className="action" onClick={seed}>Случайно</button>
				<button className="action" onClick={play}>Играть</button>
				<button className="action" onClick={pause}>Стоп</button>
				<button className="action" onClick={reset}>Сбросить</button>
			</div>
			<p className="generation">Нынешнее поколение: {generation}</p>
			<Grid
				grid={grid}
				columns={columns}
				rows={rows}
				onToggleCell={toggleCell}
			/>
			
		</div>
	);
	
}


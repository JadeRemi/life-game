
import React, { Component, MouseEventHandler } from 'react';

interface GridType {
	rows: number,
	columns: number,
	grid: any[],
	onToggleCell: (
		i: number,
		j: number
	) => void
}

export const Grid: React.FC<GridType> = ({
	grid,
	columns,
	rows,
	onToggleCell
}) => {
	const updateCell = (i: number, j: number): void => {
		onToggleCell(i, j);
		console.log(i, j, "123")
	}
	return (
		<div
			className="Grid"
			style={{
				width: columns * 14
			}}>
				{grid.map((row: any, j: number) => (
					row.map((col: any, i: number) => (
					<div
						className={`Cell ${grid[i][j] ? 'isActive' : ''}`}
						onClick={()=> updateCell(i, j)}
						key={`${i}_${j}`}
					/>
					))
				))}
		</div>
	);
}


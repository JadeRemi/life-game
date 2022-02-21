
import React, { Component, MouseEventHandler, useEffect, useState } from 'react';

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

	return (
		<div
			className="Grid"
			style={{
				width: columns * 14
			}}>
				{grid.map((row: any, j: number) => (
					row.map((col: any, i: number) => (
					<div
						className={grid[i][j] ? 'Cell isActive' : 'Cell'}
						onClick={(e)=> onToggleCell(i, j)}
						key={`${i}_${j}`}
					/>
					))
				))}
		</div>
	);
}


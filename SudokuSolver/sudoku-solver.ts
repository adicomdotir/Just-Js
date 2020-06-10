PUZZLES = [
	[6, 0, 0, 1, 9, 5, 0, 0, 0],
	[5, 3, 0, 0, 7, 0, 0, 0, 0],
	[0, 9, 8, 0, 0, 0, 0, 6, 0],
	[8, 0, 0, 0, 6, 0, 0, 0, 3],
	[4, 0, 0, 8, 0, 3, 0, 0, 1],
	[7, 0, 0, 0, 2, 0, 0, 0, 6],
	[0, 6, 0, 0, 0, 0, 2, 8, 0],
	[0, 0, 0, 4, 1, 9, 0, 0, 5],
	[0, 0, 0, 0, 8, 0, 0, 7, 9]
];

findFree(): { x: number; y: number; } {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (this.PUZZLES[i][j] === 0) {
				return { x: i, y: j };
			}
		}
	}
	return null;
}

isValid(x, y, n) {
	for (let i = 0; i < 9; i++) {
		if (this.PUZZLES[i][y] === n || this.PUZZLES[x][i] === n) {
			return false;
		}
	}
	const squareX = Math.floor(x / 3) * 3;
	const squareY = Math.floor(y / 3) * 3;
	for (let i = squareX; i < squareX + 3; i++) {
		for (let j = squareY; j < squareY + 3; j++) {
			if (this.PUZZLES[i][j] === n) {
				return false;
			}
		}
	}
	return true;
}

solve() {
	const cell = this.findFree();
	console.log(cell);
	if (cell != null) {
		for (let k = 1; k < 10; k++) {
			if (this.isValid(cell.x, cell.y, k)) {
				this.PUZZLES[cell.x][cell.y] = k;
				if (!this.solve()) {
					return false;
				}
				this.PUZZLES[cell.x][cell.y] = 0;
			}
		}
	} else {
		return false;
	}
	return true;
}

draw() {
	let temp = '';
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			temp += this.PUZZLES[i][j] + ' ';
		}
		temp += '\n';
	}
	console.log(temp);
}
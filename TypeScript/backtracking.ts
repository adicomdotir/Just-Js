class BackTracking {
    abc(word: string, n: number) {
        if (word.length > n) {
            return;
        }
        if (word.length === n) {
            console.log(word);
        }
        this.abc(word + 'a', n);
        this.abc(word + 'b', n);
        this.abc(word + 'c', n);
    }

    fromItoN(i, n) {
        if (i > n) {
            return 0;
        }
        if (i === n) {
            return 1;
        }
        return this.fromItoN(i + 1, n) + this.fromItoN(i + 2, n) + this.fromItoN(i + 3, n);
    }
}

class Sudoku {
    // cell = [
    //     [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //     [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //     [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //     [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //     [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //     [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //     [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //     [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //     [0, 0, 0, 0, 8, 0, 0, 7, 9]
    // ];
    cell = [
        [5, 3, 0],
        [6, 0, 0],
        [0, 9, 8]
    ];
    maxSize = 3;

    backtrack() {
        const [iIndex, jIndex] = this.getEmpty();
        if (iIndex !== -1 && jIndex !== -1) {
            for (let i = 1; i <= this.maxSize; i++) {
                if (this.isValid(i, iIndex, jIndex)) {
                    this.cell[iIndex][jIndex] = i;
                    const result = this.backtrack();
                    if (result) {
                        return true;
                    } else {
                        this.cell[iIndex][jIndex] = 0;
                    }
                }
                if (i === this.maxSize) {
                    return true;
                }
                // else {
                //     return false;
                // }
            }
            this.backtrack();
        }
    }

    getEmpty() {
        for (let i = 0; i < this.maxSize; i++) {
            for (let j = 0; j < this.maxSize; j++) {
                if (this.cell[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }

    isValid(num, iIndex, jIndex) {
        for (let j = 0; j < this.maxSize; j++) {
            if (this.cell[iIndex][j] === num) {
                return false;
            }
        }

        for (let i = 0; i < this.maxSize; i++) {
            if (this.cell[i][jIndex] === num) {
                return false;
            }
        }

        const iOffset = Math.floor(iIndex / 3);
        const jOffset = Math.floor(jIndex / 3);
        for (let i = iOffset; i < iOffset + 3; i++) {
            for (let j = jOffset; j < jOffset + 3; j++) {
                if (this.cell[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }
}


    
    backtrack(n, sum, last, str) {
        if (sum > 1000) {
            return;
        }
        if (n === 10) {
            if (sum === 100) {
                console.log(`%c${str} = ${sum}`, 'font-size: 24px; color: #000000; background-color: #FFFF99');
            }
            return;
        } else {
            const newNum = n + 1;
            this.backtrack(newNum, sum + n, n, `${str} + ${n}`);
            this.backtrack(newNum, sum - n, -n, `${str} - ${n}`);
            if (last < 0) {
                const newSum = (sum - last) + (last * 10 + (n * -1));
                this.backtrack(newNum, newSum, last * 10 + (n * -1), `${str}${n}`);
            } else {
                const newSum = (sum - last) + (last * 10 + n);
                this.backtrack(newNum, newSum, last * 10 + n, `${str}${n}`);
            }
        }
    }

    checkSolution() {
        const board: number[][] = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                board[i][j] = 0;
            }
        }
        if (this.solveNQueen(board, 0) === false) {
            console.log('Solution does not exist');
            return false;
        }
        console.table(board);
        return true;
    }

    solveNQueen(board: number[][], col: number) {
        if (col >= 9) {
            return true;
        }
        for (let i = 0; i < 9; i++) {
            if (this.isValid(board, i, col)) {
                board[i][col] = 1;
                if (this.solveNQueen(board, col + 1)) {
                    return true;
                }
                board[i][col] = 0;
            }
        }
        return false;
    }

    isValid(board: number[][], row, col) {
        for (let i = 0; i < col; i++) {
            if (board[row][i]) {
                return false;
            }
        }
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j]) {
                return false;
            }
        }
        for (let i = row, j = col; j >= 0 && i < 9; i++, j--) {
            if (board[i][j]) {
                return false;
            }
        }
        return true;
    }

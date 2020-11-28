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

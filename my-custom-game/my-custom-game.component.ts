import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-custom-game',
    templateUrl: './my-custom-game.component.html',
    styleUrls: ['./my-custom-game.component.css']
})
export class MyCustomGameComponent implements OnInit {
    cells: number[][] = [[8, 2, 15, 4], [9, 6, 7, 1], [5, 10, 11, 12], [13, 14, 3, 16]];
    size = 4;

    constructor() {
    }

    ngOnInit(): void {
    }

    click(cellRow, cellCol) {
        let x = cellRow;
        let y = cellCol - 1;
        if ((x >= 0 && x < this.size) && (y >= 0 && y < this.size)) {
            if (this.cells[x][y] === 16) {
                const temp = this.cells[x][y];
                this.cells[x][y] = this.cells[cellRow][cellCol];
                this.cells[cellRow][cellCol] = temp;
            }
        }

        x = cellRow + 1;
        y = cellCol;
        if ((x >= 0 && x < this.size) && (y >= 0 && y < this.size)) {
            if (this.cells[x][y] === 16) {
                const temp = this.cells[x][y];
                this.cells[x][y] = this.cells[cellRow][cellCol];
                this.cells[cellRow][cellCol] = temp;
            }
        }

        x = cellRow;
        y = cellCol + 1;
        if ((x >= 0 && x < this.size) && (y >= 0 && y < this.size)) {
            if (this.cells[x][y] === 16) {
                const temp = this.cells[x][y];
                this.cells[x][y] = this.cells[cellRow][cellCol];
                this.cells[cellRow][cellCol] = temp;
            }
        }

        x = cellRow - 1;
        y = cellCol;
        if ((x >= 0 && x < this.size) && (y >= 0 && y < this.size)) {
            if (this.cells[x][y] === 16) {
                const temp = this.cells[x][y];
                this.cells[x][y] = this.cells[cellRow][cellCol];
                this.cells[cellRow][cellCol] = temp;
            }
        }

        if (this.checkWin()) {
            alert("You Win")
        }
    }

    checkWin() {
        if (this.cells[0][0] !== 1) {
            return false;
        }
        if (this.cells[0][1] !== 2) {
            return false;
        }
        if (this.cells[0][2] !== 3) {
            return false;
        }
        if (this.cells[0][3] !== 4) {
            return false;
        }
        if (this.cells[1][0] !== 5) {
            return false;
        }
        if (this.cells[1][1] !== 6) {
            return false;
        }
        if (this.cells[1][2] !== 7) {
            return false;
        }
        if (this.cells[1][3] !== 8) {
            return false;
        }
        if (this.cells[2][0] !== 9) {
            return false;
        }
        if (this.cells[2][1] !== 10) {
            return false;
        }
        if (this.cells[2][2] !== 11) {
            return false;
        }
        if (this.cells[2][3] !== 12) {
            return false;
        }
        if (this.cells[3][0] !== 13) {
            return false;
        }
        if (this.cells[3][1] !== 14) {
            return false;
        }
        if (this.cells[3][2] !== 15) {
            return false;
        }
        return true;
    }

    showLabel(cellRow, cellCol) {
        return this.cells[cellRow][cellCol] === 16 ? ' ' : this.cells[cellRow][cellCol];
    }
}

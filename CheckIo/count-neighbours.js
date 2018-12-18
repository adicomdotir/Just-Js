"use strict";

function countNeighbours(data, row, col) {
    var count = 0;
    var nRow = row -1;
    var nCol = col - 1;
    if (nRow >= 0 && nCol >= 0) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    var nRow = row -1;
    var nCol = col;
    if (nRow >= 0 && nCol >= 0) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    var nRow = row -1;
    var nCol = col + 1;
    if (nRow >= 0 && nCol < data[row].length) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    var nRow = row;
    var nCol = col - 1;
    if (nRow >= 0 && nCol >= 0) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    var nRow = row;
    var nCol = col + 1;
    if (nRow >= 0 && nCol < data[row].length) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    var nRow = row + 1;
    var nCol = col - 1;
    if (nCol >= 0 && nRow < data.length) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    var nRow = row + 1;
    var nCol = col;
    if (nRow < data.length && nCol >= 0) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    var nRow = row + 1;
    var nCol = col + 1;
    if (nRow < data.length && nCol < data[row].length) {
        if (data[nRow][nCol] == 1) {
            count++;
        }
    }
    return count;
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(countNeighbours([[1, 0, 0, 1, 0],
                                  [0, 1, 0, 0, 0],
                                  [0, 0, 1, 0, 1],
                                  [1, 0, 0, 0, 0],
                                  [0, 0, 1, 0, 0]], 1, 2), 3, "1st example");

    assert.equal(countNeighbours([[1, 0, 0, 1, 0],
                                  [0, 1, 0, 0, 0],
                                  [0, 0, 1, 0, 1],
                                  [1, 0, 0, 0, 0],
                                  [0, 0, 1, 0, 0]], 0, 0), 1, "2nd example");

    assert.equal(countNeighbours([[1, 1, 1],
                                  [1, 1, 1],
                                  [1, 1, 1]], 0, 2), 3, "Dense corner");

    assert.equal(countNeighbours([[0, 0, 0],
                                  [0, 1, 0],
                                  [0, 0, 0]], 1, 1), 0, "Single");

    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}

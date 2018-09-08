let player = 1;
const cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let isWinner = false;

function cellClick() {
    if (!isWinner) {
        cellUpdate(event.target.id)
    }
}

function reset() {
    player = 1;
    for (let i = 0; i < cells.length; i++) {
        cells[i] = 0;
    }
    isWinner = false;
    const elements = document.querySelectorAll('td');
    elements.forEach(element => {
        element.innerHTML = '';
    });
    const element = document.getElementById('result');
    element.innerHTML = ``;
}

function cellUpdate(id) {
    const element = document.getElementById(id);
    if (cells[id - 1] == 0) {
        if (player == 1) {
            element.innerHTML = 'X';
        } else {
            element.innerHTML = 'O';
        }
        cells[id - 1] = player;
        winnerCheck();
        player = (player == 1) ? 2 : 1;
    }
}

function winnerCheck() {
    if (cells[0] == player && cells[1] == player && cells[2] == player) {
        isWinner = true;
    } else if (cells[3] == player && cells[4] == player && cells[5] == player) {
        isWinner = true;
    } else if (cells[6] == player && cells[7] == player && cells[8] == player) {
        isWinner = true;
    } else if (cells[0] == player && cells[3] == player && cells[6] == player) {
        isWinner = true;
    } else if (cells[1] == player && cells[4] == player && cells[7] == player) {
        isWinner = true;
    } else if (cells[2] == player && cells[5] == player && cells[8] == player) {
        isWinner = true;
    } else if (cells[0] == player && cells[4] == player && cells[8] == player) {
        isWinner = true;
    } else if (cells[2] == player && cells[4] == player && cells[6] == player) {
        isWinner = true;
    }
    result();
}

function result() {
    const element = document.getElementById('result');
    if (isWinner) {
        element.innerHTML = `Winner is player ${player}`;
    } else {
        if (cells.indexOf(0) == -1) {
            element.innerHTML = `Draw`;
        }
    }
}
$(document).ready(function () {
    const playerId = [];
    const playerGoal = [];
    
    goalCalculate(playerId, playerGoal);

    sort(playerId, playerGoal);

    createTable(playerId, playerGoal);
});

function createTable(playerId, playerGoal) {
    const players = JSON.parse(localStorage.getItem('players'));   
    const teamList = JSON.parse(localStorage.getItem('teamList')); 
    for (let index = 0; index < playerId.length; index++) {
        const player = players.filter(x => x.id == playerId[index])[0];
        const team = teamList.filter(y => y.id == player.team_id)[0].name;
        let row = document.createElement("tr");
        $(row).append("<td>" + (index + 1) + "</td>");
        $(row).append("<td><a href='#' onclick='showPlayer(" + player.id + ")'>" + player.name + ' </a>[' + team + ']' + "</td>");
        $(row).append("<td>" + playerGoal[index] + "</td>");
        $("#tbody").append(row);
    }
}

function goalCalculate(playerId, playerGoal) {
    const scores = JSON.parse(localStorage.getItem('scores'));
    for (let index = 0; index < scores.length; index++) {
        if (playerId.indexOf(scores[index].playerId) === -1) {
            playerId.push(scores[index].playerId);
            playerGoal.push(1);
        } else {
            const id = playerId.indexOf(scores[index].playerId);
            playerGoal[id]++;
        }
    }
}

function sort(playerId, playerGoal) {
    for (let i = 0; i < playerId.length; i++) {
        for (let j = i + 1; j < playerId.length; j++) {
            if (playerGoal[i] < playerGoal[j]) {
                let temp = playerGoal[i];
                playerGoal[i] = playerGoal[j];
                playerGoal[j] = temp;
                temp = playerId[i];
                playerId[i] = playerId[j];
                playerId[j] = temp;
            }      
        }
    }
}

function showPlayer(index) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        user = {};
    }
    const players = JSON.parse(localStorage.getItem('players'));
    user.player = players.filter(x => x.id === index)[0];
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "./player.html";
}
$(document).ready(function () {
    const scores = JSON.parse(localStorage.getItem('score'));
    const players = JSON.parse(localStorage.getItem('players'));   
    const teamList = JSON.parse(localStorage.getItem('teamList'));   

    for (let index = 0; index < scores.length; index++) {
        const score = scores[index];
        let row = document.createElement("tr");
        const player = players.filter(x => x.id == score.playerId)[0];
        $(row).append("<td>" + (index + 1) + "</td>");
        $(row).append("<td>" + player.number + '. ' + player.name + "</td>");
        $(row).append("<td>" + teamList.filter(y => y.id == player.team_id)[0].name + "</td>");
        $("#tbody").append(row);
    }
});
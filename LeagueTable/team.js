$(document).ready(function () {
    const team = JSON.parse(localStorage.getItem('team'));
    $('#teamname').html(team.name);
    for (let index = 0; index < team.players.length; index++) {
        const player = team.players[index];

        let row = document.createElement("tr");
        $(row).append("<td>" + player.number + "</td>");
        $(row).append("<td>" + player.name + "</td>");
        $(row).append("<td>" + player.age + "</td>");
        $(row).append("<td>" + player.overall + "</td>");
        $(row).append("<td>" + (player.position === 1 ? 'GK' : 'Player') + "</td>");
        $("#tbody").append(row);
    }
});
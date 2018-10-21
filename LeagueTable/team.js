$(document).ready(function () {
    const team = JSON.parse(localStorage.getItem('user')).team;
    $('#teamname').html(team.name);
    for (let index = 0; index < team.players.length; index++) {
        const player = team.players[index];

        let row = document.createElement("tr");
        $(row).append("<td>" + player.number + "</td>");
        $(row).append("<td><a href='#' onclick='showPlayer(" + player.id + ")'>" + player.name + "</a></td>");
        $(row).append("<td>" + player.age + "</td>");
        $(row).append("<td>" + player.overall + "</td>");
        $(row).append("<td>" + (player.position === 1 ? 'GK' : 'Player') + "</td>");
        $("#tbody").append(row);
    }
});

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
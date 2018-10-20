$(document).ready(function () {
    const scores = JSON.parse(localStorage.getItem('score'));
    for (let index = 0; index < scores.length; index++) {
        const score = scores[index];

        let row = document.createElement("tr");
        $(row).append("<td>" + (index + 1) + "</td>");
        $(row).append("<td>" + score.playerId + "</td>");
        $("#tbody").append(row);
    }
});

let size = 4;
let teamsInfo = [];

$(document).ready(function () {
    teamsInfo = JSON.parse(localStorage.getItem('teams'));
    createTable();
});

function createTable() {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        $(row).append("<td>" + (i + 1) + "</td>");
        for (let key in teamsInfo[i]) {
            if (key !== "players" && key !== 'id') {
                if (key === "gd") {
                    $(row).append(
                        "<td>" + (teamsInfo[i]["gf"] - teamsInfo[i]["ga"]) + "</td>"
                    );
                } else if (key === "name") {
                    $(row).append(
                        "<td><a href='#' onclick='teamShow(" + i + ")'>" +
                        teamsInfo[i][key] +
                        "[" +
                        teamsInfo[i]["overall"] +
                        "]" +
                        "</a></td>"
                    );
                } else if (key !== "overall") {
                    $(row).append("<td>" + teamsInfo[i][key] + "</td>");
                }
            }
        }
        $("#tbody").append(row);
    }
}
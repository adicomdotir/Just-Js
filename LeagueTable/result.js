
let size = 4;
let matches = [];

$(document).ready(function () {
    matches = JSON.parse(localStorage.getItem('matches'));
    createFixture();
});

function createFixture() {
    let col = 0;
    for (let week = 0; week < (size - 1) * 2; week++) {
        let gap = document.createElement("div");
        $(gap).addClass("row");
        let header = document.createElement("div");
        $(header).append("<h4>" + "Week " + (week + 1) + "</h4>");
        if (col === 0) {
            $("#col-1").append(gap);
            $("#col-1").append(header);
        } else if (col === 1) {
            $("#col-2").append(gap);
            $("#col-2").append(header);
        }
        for (let index = 0; index < matches.length; index++) {
            const match = matches[index];
            if (match.week === (week + 1)) {
                let div1 = document.createElement("div");
                addAttributeColor(match.homeTeamGoal, match.awayTeamGoal, div1);
                $(div1)
                    .append(match.homeTeamId)
                    .addClass("col-md-4");
                let div2 = document.createElement("div");
                $(div2)
                    .append('<a href="#" onclick="showGoals(' + match.id + ')">' + match.homeTeamGoal + "-" + match.awayTeamGoal + '</a>')
                    .addClass("col-md-4");
                let div3 = document.createElement("div");
                addAttributeColor(match.awayTeamGoal, match.homeTeamGoal, div3);
                $(div3)
                    .append(match.awayTeamId)
                    .addClass("col-md-4");
                if (col === 0) {
                    $("#col-1").append(div1);
                    $("#col-1").append(div2);
                    $("#col-1").append(div3);
                } else if (col === 1) {
                    $("#col-2").append(div1);
                    $("#col-2").append(div2);
                    $("#col-2").append(div3);
                }
            }
        }
        col++;
        if (col === 2) {
            col = 0;
        }
    }
}


function addAttributeColor(gObj, gOther, obj) {
    if (gObj > gOther) {
        $(obj).css("background-color", "#2CC990");
    } else if (gObj < gOther) {
        $(obj).css("color", "#FFF");
        $(obj).css("background-color", "#E3000E");
    } else {
        $(obj).css("background-color", "#ffe100");
    }
}

function showGoals(id) {
    const players = JSON.parse(localStorage.getItem('players'));
    let scores = JSON.parse(localStorage.getItem('scores')).filter(x => x.matchId == id);
    scores.forEach(x => {
        console.log(players.filter(pl => pl.id == x.playerId)[0].name);
    });
    
}
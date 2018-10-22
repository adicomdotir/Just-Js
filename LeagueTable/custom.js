let teamsInfo = [];
let size = 4;
let teams = [];
let teamList = [];
let matches = [];
let scores = [];
let players = [];

function startNewGame() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        user = {};
    }
    user.game = 'start';
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "./start.html";
}

$(document).ready(function () {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.game === 'start') {
        init();
        gameCycle();
        user.game = 'end';
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('teams', JSON.stringify(teamsInfo));
    } else {
        teamsInfo = JSON.parse(localStorage.getItem('teams'));
        matches = JSON.parse(localStorage.getItem('matches'));
        scores = JSON.parse(localStorage.getItem('scores'));
        players = JSON.parse(localStorage.getItem('players'));
        teamList = JSON.parse(localStorage.getItem('teamList'));
        createFixture();
        createTable();
    }
});

const POSITIONS = {
    GK: 1,
    PLAYER: 2
};

function Team(id, name, overall, players) {
    this.id = id;
    this.name = name;
    this.game = 0;
    this.win = 0;
    this.lose = 0;
    this.draw = 0;
    this.gf = 0;
    this.ga = 0;
    this.gd = 0;
    this.points = 0;
    this.overall = overall;
    this.players = players;
}

function Player(id, name, number, attack, defend, position, team_id, age) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.attack = attack;
    this.defend = defend;
    this.overall = Math.round((attack + defend) / 2);
    this.position = position;
    this.team_id = team_id;
    this.age = age;
}

function Match(id, homeTeamId, awayTeamId, homeTeamGoal, awayTeamGoal, week) {
    this.id = id;
    this.homeTeamId = homeTeamId;
    this.awayTeamId = awayTeamId;
    this.homeTeamGoal = homeTeamGoal;
    this.awayTeamGoal = awayTeamGoal;
    this.week = week;
}

function Score(id, matchId, playerId) {
    this.id = id;
    this.matchId = matchId;
    this.playerId = playerId;
}

function init() {
    // Generate teams
    for (let i = 0; i < size; i++) {
        let teamName = teamNames[Math.floor(Math.random() * teamNames.length)];
        for (let index = 0; index < teamsInfo.length; index++) {
            const element = teamsInfo[index];
            if (teamName === element.name) {
                index = 0;
                teamName = teamNames[Math.floor(Math.random() * teamNames.length)];
            }
        }
        const players = generatePlayers(i);
        const overall = calculateTeamOverall(players);
        const team = new Team(teamsInfo.length, teamName, overall, players);
        teamsInfo.push(team);
        teamList.push({ 'id': teamsInfo.length - 1, 'name': teamName });
        // saveTeamInDB({ name: teamName });
    }
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('teamList', JSON.stringify(teamList));

    // for roundrobin algorithm
    for (let i = 0; i < size; i++) {
        teams[i] = i;
    }
}

function calculateTeamOverall(players) {
    let overall = 0;
    for (let index = 0; index < players.length; index++) {
        overall += players[index].overall;
    }
    return overall;
}

function generatePlayers(team_id) {
    const tempPlayers = [];
    for (let i = 0; i < 10; i++) {
        let fn = firstName[Math.floor(Math.random() * firstName.length)];
        let ln = lastName[Math.floor(Math.random() * lastName.length)];
        let fullName = fn + " " + ln;
        let age = Math.floor(Math.random() * 18) + 17;
        let pl;
        if (i === 0) {
            pl = new Player(
                players.length + 1,
                fullName,
                Math.ceil(Math.random() * 99),
                Math.ceil(Math.random() * 10),
                Math.ceil(Math.random() * 10),
                POSITIONS.GK,
                team_id,
                age
            );
        } else {
            pl = new Player(
                players.length + 1,
                fullName,
                Math.ceil(Math.random() * 99),
                Math.ceil(Math.random() * 10),
                Math.ceil(Math.random() * 10),
                POSITIONS.PLAYER,
                team_id,
                age
            );
        }
        players.push(pl);
        tempPlayers.push(pl);
        // savePlayerInDB(pl);
    }
    return tempPlayers;
}

function savePlayerInDB(player) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                // console.log(xmlhttp.responseText);
            } else if (xmlhttp.status == 400) {
                alert("There was an error 400");
            } else {
                alert("something else other than 200 was returned");
            }
        }
    };
    xmlhttp.open("POST", "http://localhost:8082/player", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(player));
}

function saveTeamInDB(obj) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                const id = JSON.parse(xmlhttp.responseText).id;
                console.log(obj)
            } else if (xmlhttp.status == 400) {
                alert("There was an error 400");
            } else {
                alert("something else other than 200 was returned");
            }
        }
    };
    xmlhttp.open("POST", "http://localhost:8082/team", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(obj));
}

function swap() {
    let temp = teams[size - 1];
    for (let i = size - 1; i > 0; i--) {
        teams[i] = teams[i - 1];
    }
    teams[1] = temp;
}

function sort() {
    // For calculate Goal Different
    for (let i = 0; i < size; i++) {
        teamsInfo[i].gd = teamsInfo[i].gf - teamsInfo[i].ga;
    }
    // This loop for sort points
    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            if (teamsInfo[j].points > teamsInfo[i].points) {
                let temp = teamsInfo[j];
                teamsInfo[j] = teamsInfo[i];
                teamsInfo[i] = temp;
            }
        }
    }
    // This loop for sort GD
    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            if (teamsInfo[j].points === teamsInfo[i].points) {
                // console.log(teamsInfo[j].points + '===' + teamsInfo[i].points);
                if (teamsInfo[j].gd > teamsInfo[i].gd) {
                    // console.log(teamsInfo[j].gd + '>' + teamsInfo[i].gd);
                    let temp = teamsInfo[j];
                    teamsInfo[j] = teamsInfo[i];
                    teamsInfo[i] = temp;
                }
            }
        }
    }
    // This loop for sort GF
    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            if (teamsInfo[j].points === teamsInfo[i].points) {
                // console.log(teamsInfo[j].points + '===' + teamsInfo[i].points);
                if (teamsInfo[j].gd === teamsInfo[i].gd) {
                    // console.log(teamsInfo[j].gd + '===' + teamsInfo[i].gd);
                    if (teamsInfo[j].gf > teamsInfo[i].gf) {
                        // console.log(teamsInfo[j].gf + '>' + teamsInfo[i].gf);
                        let temp = teamsInfo[j];
                        teamsInfo[j] = teamsInfo[i];
                        teamsInfo[i] = temp;
                    }
                }
            }
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

function createTable() {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        $(row).append("<td>" + (i + 1) + "</td>");
        for (let key in teamsInfo[i]) {
            if (key !== "players" && key !== 'id' && key !== 'gd' && key !== 'gf' && key !== 'ga') {
                if (key === "name") {
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

function gameCycle() {
    let col = 0;
    for (let i = 1; i < size * 2 - 1; i++) {
        for (let j = 0; j < size / 2; j++) {
            const match = new Match();
            match.id = matches.length + 1;
            const goals = matchScore(teamsInfo[teams[j]].players, teamsInfo[teams[size - j - 1]].players, match.id);
            let gA = goals.homeGoal;
            let gB = goals.awayGoal;
            updateTeamInfo(j, gA, gB);
            match.week = i;
            match.homeTeamGoal = gA;
            match.awayTeamGoal = gB;
            match.homeTeamId = teamsInfo[teams[j]].name;
            match.awayTeamId = teamsInfo[teams[size - j - 1]].name;
            matches.push(match);
        }
        col++;
        if (col === 3) {
            col = 0;
        }

        swap();
    }
    localStorage.setItem('scores', JSON.stringify(scores));
    localStorage.setItem('matches', JSON.stringify(matches));

    createFixture();

    sort();

    createTable();
}

function createFixture() {
    let col = 0;
    for (let week = 0; week < (size - 1) * 2; week++) {
        let header = document.createElement("div");
        $(header).append("<b>" + "Week " + (week + 1) + "</b>");
        if (col === 0) {
            $("#figure3").append(header);
        } else if (col === 1) {
            $("#figure2").append(header);
        } else if (col === 2) {
            $("#figure").append(header);
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
                    $("#figure3").append(div1);
                    $("#figure3").append(div2);
                    $("#figure3").append(div3);
                } else if (col === 1) {
                    $("#figure2").append(div1);
                    $("#figure2").append(div2);
                    $("#figure2").append(div3);
                } else if (col === 2) {
                    $("#figure").append(div1);
                    $("#figure").append(div2);
                    $("#figure").append(div3);
                }
            }
        }
        col++;
        if (col === 3) {
            col = 0;
        }
    }
}

function updateTeamInfo(index, goalA, goalB) {
    if (goalA === goalB) {
        teamsInfo[teams[index]].game++;
        teamsInfo[teams[index]].draw++;
        teamsInfo[teams[index]].points++;
        teamsInfo[teams[index]].gf += goalA;
        teamsInfo[teams[index]].ga += goalB;
        teamsInfo[teams[size - index - 1]].game++;
        teamsInfo[teams[size - index - 1]].draw++;
        teamsInfo[teams[size - index - 1]].points++;
        teamsInfo[teams[size - index - 1]].gf += goalB;
        teamsInfo[teams[size - index - 1]].ga += goalA;
    } else if (goalA > goalB) {
        teamsInfo[teams[index]].game++;
        teamsInfo[teams[index]].win++;
        teamsInfo[teams[index]].points += 3;
        teamsInfo[teams[index]].gf += goalA;
        teamsInfo[teams[index]].ga += goalB;
        teamsInfo[teams[size - index - 1]].game++;
        teamsInfo[teams[size - index - 1]].lose++;
        teamsInfo[teams[size - index - 1]].gf += goalB;
        teamsInfo[teams[size - index - 1]].ga += goalA;
    } else {
        teamsInfo[teams[index]].game++;
        teamsInfo[teams[index]].lose++;
        teamsInfo[teams[index]].gf += goalA;
        teamsInfo[teams[index]].ga += goalB;
        teamsInfo[teams[size - index - 1]].game++;
        teamsInfo[teams[size - index - 1]].win++;
        teamsInfo[teams[size - index - 1]].points += 3;
        teamsInfo[teams[size - index - 1]].gf += goalB;
        teamsInfo[teams[size - index - 1]].ga += goalA;
    }
}

function teamShow(id) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        user = {};
    }
    user.team = teamsInfo[id];
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "./team.html";
}

function matchScore(playersHome, playersAway, matchId) {
    let homeGoal = 0, awayGoal = 0;
    let tempPlayersHome = selectRandomPlayer(playersHome);
    let tempPlayersAway = selectRandomPlayer(playersAway);

    for (let i = 0; i < 5; i++) {
        gkAway = playersAway[0];
        playerHome = tempPlayersHome[i];
        if (Math.floor(Math.random() * gkAway.overall) < Math.floor(Math.random() * playerHome.overall)) {
            const score = new Score();
            score.matchId = matchId;
            score.id = scores.length + 1;
            score.playerId = playerHome.id;
            scores.push(score);
            homeGoal++;
        }
        gkHome = playersHome[0];
        playerAway = tempPlayersAway[i];
        if (Math.floor(Math.random() * gkHome.overall) < Math.floor(Math.random() * playerAway.overall)) {
            const score = new Score();
            score.matchId = matchId;
            score.id = scores.length + 1;
            score.playerId = playerAway.id;
            scores.push(score);
            awayGoal++;
        }
    }
    return { 'homeGoal': homeGoal, 'awayGoal': awayGoal };
}

function selectRandomPlayer(players) {
    let temp = [];
    let random = Math.floor(Math.random() * 9) + 1;
    temp.push(random);
    while (temp.length < 5) {
        let random = Math.floor(Math.random() * 9) + 1;
        if (temp.indexOf(random) === -1) {
            temp.push(random);
        }
    }
    let selectedPlayers = [];
    for (let index = 0; index < temp.length; index++) {
        selectedPlayers.push(players[temp[index]]);
    }
    return selectedPlayers;
}

function showGoals(id) {
    let temp = [];
    for (let index = 0; index < scores.length; index++) {
        const element = scores[index];
        if (element.matchId == id) {
            temp.push(element);
        }
    }

    let user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
        user = {};
    }
    user.score = temp;
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "./match.html";
}
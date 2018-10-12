let teamsInfo = [];
let size = 4;
let teams = [];

function startNewGame() {
	window.location.href = "./start.html";
}

$(document).ready(function () {
	init();
	gameCycle();
});

const POSITIONS = {
	'GK': 1,
	'PLAYER': 2
};

function Player(name, number, overall, position, team_id) {
	this.name = name;
	this.number = number;
	this.overall = overall;
	this.position = position;
	this.team_id = team_id;
}

function init() {
	// Generate teams
	for (let index = 0; index < size; index++) {
		let teamName = teamNames[Math.floor(Math.random() * teamNames.length)];
		for (let index = 0; index < teamsInfo.length; index++) {
			const element = teamsInfo[index];
			if (teamName === element.name) {
				index = 0;
				teamName = teamNames[Math.floor(Math.random() * teamNames.length)];
			}
		}
		const players = generatePlayers(index);
		const overall = calculateTeamOverall(players);
		const team = new Team(teamName, overall, players);
		teamsInfo.push(team);
	}
	size = teamsInfo.length;

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
	return overall
}

function generatePlayers(team_id) {
	const players = [];
	for (let i = 0; i < 9; i++) {
		let fn = firstName[Math.floor(Math.random() * firstName.length)];
		let ln = lastName[Math.floor(Math.random() * lastName.length)];
		let fullName = fn + ' ' + ln;
		let pl = new Player(fullName, i + 2, Math.ceil(Math.random() * 10), POSITIONS.PLAYER, team_id);
		players.push(pl);
		// savePlayerInDB(pl);
	}
	let fn = firstName[Math.floor(Math.random() * firstName.length)];
	let ln = lastName[Math.floor(Math.random() * lastName.length)];
	let fullName = fn + ' ' + ln;
	let pl = new Player(fullName, 1, Math.ceil(Math.random() * 10), POSITIONS.GK, team_id);
	players.push(pl);
	// savePlayerInDB(pl);
	return players;
}

function savePlayerInDB(player) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
			if (xmlhttp.status == 200) {
				// console.log(xmlhttp.responseText);
			} else if (xmlhttp.status == 400) {
				alert('There was an error 400');
			} else {
				alert('something else other than 200 was returned');
			}
		}
	};
	xmlhttp.open("POST", "http://localhost:8082/players", true);
	xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xmlhttp.send(JSON.stringify(player));
	
}

function Team(name, overall, players) {
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

function createTeble() {
	for (let i = 0; i < size; i++) {
		let row = document.createElement("tr");
		$(row).append('<td>' + (i + 1) + '</td>');
		for (let key in teamsInfo[i]) {
			if (key !== 'players') {
				if (key === 'gd') {
					$(row).append('<td>' + (teamsInfo[i]['gf'] - teamsInfo[i]['ga']) + '</td>');
				} else if (key === 'name') {
					$(row).append('<td>' + (teamsInfo[i][key]) + '[' + teamsInfo[i]['overall'] + ']' + '</td>');
				} else if (key !== 'overall') {
					$(row).append('<td>' + (teamsInfo[i][key]) + '</td>');
				}
			}
		}
		$('#tbody').append(row);
	}
}

function gameCycle() {
	let col = 0;
	for (let i = 1; i < size * 2 - 1; i++) {
		let str = '';
		let header = document.createElement("div");
		// let header = $("div");
		$(header).append('<b>' + "Week " + i + '</b>');
		if (col === 0) {
			$('#figure3').append(header);
		} else if (col === 1) {
			$('#figure2').append(header);
		} else if (col === 2) {
			$('#figure').append(header);
		}
		for (let j = 0; j < size / 2; j++) {
			let diff = teamsInfo[teams[j]].overall - teamsInfo[teams[size - j - 1]].overall;
			let mulA = 0,
				mulB = 0;
			if (diff > 0) {
				mulA = diff / 2;
				mulB = diff / 4;
			} else if (diff < 0) {
				mulA = diff / 4;
				mulB = diff / 2;
			}
			mulA = Math.floor(Math.abs(mulA));
			mulB = Math.floor(Math.abs(mulB));
			let gA = Math.floor(Math.random() * (mulA + 1));
			let gB = Math.floor(Math.random() * (mulB + 1));

			updateTeamInfo(j, gA, gB);

			let div1 = document.createElement("div");
			addAttributeColor(gA, gB, div1);
			$(div1).append(teamsInfo[teams[j]].name).addClass('col-md-4');
			let div2 = document.createElement("div");
			$(div2).append(gA + '-' + gB).addClass('col-md-4');
			let div3 = document.createElement("div");
			addAttributeColor(gB, gA, div3);
			$(div3).append(teamsInfo[teams[size - j - 1]].name).addClass('col-md-4');
			if (col === 0) {
				$('#figure3').append(div1);
				$('#figure3').append(div2);
				$('#figure3').append(div3);
			} else if (col === 1) {
				$('#figure2').append(div1);
				$('#figure2').append(div2);
				$('#figure2').append(div3);
			} else if (col === 2) {
				$('#figure').append(div1);
				$('#figure').append(div2);
				$('#figure').append(div3);
			}
		}
		col++;
		if (col === 3) {
			col = 0;
		}
		swap();
	}

	sort();

	createTeble();
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
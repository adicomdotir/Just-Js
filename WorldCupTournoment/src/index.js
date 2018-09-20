import Team from './team';
import DataBase from './database';

let round = 1;
const groupCount = 8;
const groupTeamCount = 4;
const teams = [];
const treeTeams16 = [];
const treeTeams8 = [];
const treeTeams4 = [];
const treeTeams2 = [];
const treeTeams2Playoff = [];
var globalGroupId = 0;
var year = 2000;
var thirth = "";

window.init = function() {
	let obj;
	// for (var i = 0; i < groupCount; i++) {
	// 	for (var j = 0; j < groupTeamCount; j++) {
	// 		var overal = Math.round(Math.random() * 20) + 50;
	// 		var team = new Team('Team' + ((i * 4) + j), overal, i);
	// 		teams.push(team);
	// 	}
	// }

	let team01 = new Team('Russia', Math.round(1736 / 24), 0, 'assets/rus.png');
	let team02 = new Team('SaudiArabia', Math.round(1490 / 24), 0, 'assets/ksa.png');
	let team03 = new Team('Egypt', Math.round(1678 / 24), 0, 'assets/egy.png');
	let team04 = new Team('Uruguay', Math.round(1871 / 24), 0, 'assets/uru.png');
	teams.push(team01, team02, team03, team04);

	team01 = new Team('Morocco', Math.round(1651 / 24), 1, 'assets/mar.png');
	team02 = new Team('Iran', Math.round(1645 / 24), 1, 'assets/irn.png');
	team03 = new Team('Portugal', Math.round(1779 / 24), 1, 'assets/por.png');
	team04 = new Team('Spain', Math.round(1935 / 24), 1, 'assets/esp.png');
	teams.push(team01, team02, team03, team04);

	team01 = new Team('France', Math.round(1779 / 24), 2, 'assets/fra.png');
	team02 = new Team('Australia', Math.round(1658 / 24), 2, 'assets/aus.png');
	team03 = new Team('Peru', Math.round(1666 / 24), 2, 'assets/per.png');
	team04 = new Team('Denmark', Math.round(1793 / 24), 2, 'assets/den.png');
	teams.push(team01, team02, team03, team04);

	team01 = new Team('Argentina', Math.round(1981 / 24), 3, 'assets/arg.png');
	team02 = new Team('Iceland', Math.round(1407 / 24), 3, 'assets/isl.png');
	team03 = new Team('Croatia', Math.round(1875 / 24), 3, 'assets/cro.png');
	team04 = new Team('Nigeria', Math.round(1665 / 24), 3, 'assets/nga.png');
	teams.push(team01, team02, team03, team04);


	team01 = new Team('Costa Rica', Math.round(1695 / 24), 4, 'assets/crc.png');
	team02 = new Team('Serbia', Math.round(1784 / 24), 4, 'assets/srb.png');
	team03 = new Team('Brazil', Math.round(1991 / 24), 4, 'assets/bra.png');
	team04 = new Team('Switzerland', Math.round(1674 / 24), 4, 'assets/sui.png');
	teams.push(team01, team02, team03, team04);

	team01 = new Team('Germany', Math.round(1906 / 24), 5, 'assets/ger.png');
	team02 = new Team('Mexico', Math.round(1775 / 24), 5, 'assets/mex.png');
	team03 = new Team('Sweden', Math.round(1795 / 24), 5, 'assets/swe.png');
	team04 = new Team('South Korea', Math.round(1678 / 24), 5, 'assets/kor.png');
	teams.push(team01, team02, team03, team04);

	team01 = new Team('Belgium', Math.round(1734 / 24), 6, 'assets/bel.png');
	team02 = new Team('Panama', Math.round(1333 / 24), 6, 'assets/pan.png');
	team03 = new Team('Tunisia', Math.round(1602 / 24), 6, 'assets/tun.png');
	team04 = new Team('England', Math.round(1979 / 24), 6, 'assets/eng.png');
	teams.push(team01, team02, team03, team04);

	team01 = new Team('Colombia', Math.round(1583 / 24), 7, 'assets/col.png');
	team02 = new Team('Japan', Math.round(1454 / 24), 7, 'assets/jpn.png');
	team03 = new Team('Poland', Math.round(1708 / 24), 7, 'assets/pol.png');
	team04 = new Team('Senegal', Math.round(1577 / 24), 7, 'assets/sen.png');
	teams.push(team01, team02, team03, team04);

	var elem = document.getElementById('begin');
	elem.parentElement.removeChild(elem);
	createTableHtml();
	var elem = document.getElementById('hidden');
	elem.removeAttribute('hidden');
	elem = document.getElementById('hidden02');
	elem.removeAttribute('hidden');
}

function createTableHtml() {
	var container = document.getElementById('container');
	var div = document.createElement('div');
	div.setAttribute('class', 'col-md-3');
	var select = document.getElementsByTagName('select')[0];
	var divTable = document.createElement('div');
	divTable.setAttribute('class', 'col-md-12');
	var table = document.getElementsByTagName('table')[0];
	for (var i = 0; i < groupCount; i++) {
		var option = document.createElement('option');
		option.setAttribute('value', i);
		option.appendChild(document.createTextNode('Group ' + (i + 1)));
		select.appendChild(option);
	}
	var tbody = document.getElementsByTagName('tbody')[0];
	insertGroupToTable(tbody, 0);
	container.appendChild(div);
	container.appendChild(divTable);
}

function insertGroupToTable(tbody, index) {
	for (var j = 0; j < groupTeamCount; j++) {
		insertTeamToTable(tbody, index, j);
	}
}

function insertTeamToTable(tbody, groupId, index) {
	var teamId = groupId * 4 + index;
	var tr = document.createElement('tr');
	// tr.setAttribute("style", "color: #56AC39");
	var td = document.createElement('td');
	td.appendChild(document.createTextNode('' + (index + 1)));
	tr.appendChild(td);


	var td = document.createElement('td');
	var img = document.createElement("img");
	img.src = teams[teamId].logo;
	img.width = '30';
	td.appendChild(img);
	tr.appendChild(td);

	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].name + '[' + teams[teamId].overall + ']'));
	tr.appendChild(td);

	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['game']));
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['win']));
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['draw']));
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['lose']));
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['gf']));
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['ga']));
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['gd']));
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(teams[teamId].table['points']));
	tr.appendChild(td);
	tbody.appendChild(tr);
}

window.selectGroup = function() {
	selectGroupFire(event.target.value);
	globalGroupId = event.target.value;
}

function selectGroupFire(index) {
	var tbody = document.getElementsByTagName('tbody');
	var rows = document.getElementsByTagName('tr');
	for (var i = 0; i < groupTeamCount; i++) {
		var tr = rows[1];
		tbody[0].removeChild(tr);
	}
	insertGroupToTable(tbody[0], index);
	fixture(index);
}

window.result = function() {
	for (var groupId = 0; groupId < groupCount; groupId++) {
		var teamsId = [];
		var teamId = groupId * 4;
		for (var i = 0; i < 4; i++, teamId++) {
			teamsId[i] = teamId;
		}
		var col = 0;
		for (var i = 1; i < groupTeamCount; i++) {
			for (var j = 0; j < groupTeamCount / 2; j++) {
				var diff = teams[teamsId[j]].overall - teams[teamsId[groupTeamCount - j - 1]].overall;
				var mulA = 0,
					mulB = 0;
				if (Math.abs(diff) > 10) {
					diff /= 2;
				}
				if (diff > 0) {
					mulA = diff / 2;
					mulB = diff / 4;
				} else if (diff < 0) {
					mulA = diff / 4;
					mulB = diff / 2;
				}
				mulA = Math.floor(Math.abs(mulA));
				mulB = Math.floor(Math.abs(mulB));
				if (mulA == 0) {
					mulA = 1;
				}
				if (mulB == 0) {
					mulB = 1;
				}
				var gA = Math.floor(Math.random() * (mulA));
				var gB = Math.floor(Math.random() * (mulB));
				if (gA === gB) {
					teams[teamsId[j]].table.game++;
					teams[teamsId[j]].table.draw++;
					teams[teamsId[j]].table.points++;
					teams[teamsId[j]].table.gf += gA;
					teams[teamsId[j]].table.ga += gB;
					teams[teamsId[groupTeamCount - j - 1]].table.game++;
					teams[teamsId[groupTeamCount - j - 1]].table.draw++;
					teams[teamsId[groupTeamCount - j - 1]].table.points++;
					teams[teamsId[groupTeamCount - j - 1]].table.gf += gB;
					teams[teamsId[groupTeamCount - j - 1]].table.ga += gA;
				} else if (gA > gB) {
					teams[teamsId[j]].table.game++;
					teams[teamsId[j]].table.win++;
					teams[teamsId[j]].table.points += 3;
					teams[teamsId[j]].table.gf += gA;
					teams[teamsId[j]].table.ga += gB;
					teams[teamsId[j]].table.gd = teams[teamsId[j]].table.gf - teams[teamsId[j]].table.ga;
					teams[teamsId[groupTeamCount - j - 1]].table.game++;
					teams[teamsId[groupTeamCount - j - 1]].table.lose++;
					teams[teamsId[groupTeamCount - j - 1]].table.gf += gB;
					teams[teamsId[groupTeamCount - j - 1]].table.ga += gA;
					teams[teamsId[groupTeamCount - j - 1]].table.gd = teams[teamsId[groupTeamCount - j - 1]].table.gf - teams[teamsId[groupTeamCount - j - 1]].table.ga;
				} else {
					teams[teamsId[j]].table.game++;
					teams[teamsId[j]].table.lose++;
					teams[teamsId[j]].table.gf += gA;
					teams[teamsId[j]].table.ga += gB;
					teams[teamsId[j]].table.gd = teams[teamsId[j]].table.gf - teams[teamsId[j]].table.ga;
					teams[teamsId[groupTeamCount - j - 1]].table.game++;
					teams[teamsId[groupTeamCount - j - 1]].table.win++;
					teams[teamsId[groupTeamCount - j - 1]].table.points += 3;
					teams[teamsId[groupTeamCount - j - 1]].table.gf += gB;
					teams[teamsId[groupTeamCount - j - 1]].table.ga += gA;
					teams[teamsId[groupTeamCount - j - 1]].table.gd = teams[teamsId[groupTeamCount - j - 1]].table.gf - teams[teamsId[groupTeamCount - j - 1]].table.ga;
				}
				let obj = {};
				obj.A = teams[teamsId[j]].name;
				obj.GA = gA;
				obj.GB = gB;
				obj.B = teams[teamsId[groupTeamCount - j - 1]].name;
				localStorage.setItem(groupId * 12 + (i * 2) + j, JSON.stringify(obj));
			}
			////////////////
			// Swap Block //
			var temp = teamsId[3];
			for (var k = groupTeamCount - 1; k > 0; k--) {
				teamsId[k] = teamsId[k - 1];
			}
			teamsId[1] = temp;
			// End Block //
			///////////////
		}
	}
	var elem = document.getElementById('divBtn');
	elem.setAttribute('hidden', 'true');
	sort();
	selectGroupFire(globalGroupId);
	treeView();
}

function addAttributeColor(gf, ga, element) {
	if (gf > ga) {
		element.setAttribute('style', 'color: #2ecc71;');
	} else if (gf < ga) {
		element.setAttribute('style', 'color: #e74c3c;');
	} else {
		element.setAttribute('style', 'color: #f1c40f;');
	}
}

function fixture(groupId) {
	var col = 0;
	var list = document.getElementById('figure01');
	while (list.hasChildNodes()) {
		list.removeChild(list.childNodes[0]);
	}
	list = document.getElementById('figure02');
	while (list.hasChildNodes()) {
		list.removeChild(list.childNodes[0]);
	}
	list = document.getElementById('figure03');
	while (list.hasChildNodes()) {
		list.removeChild(list.childNodes[0]);
	}
	for (var i = 1; i < groupTeamCount; i++) {
		var str = '';
		var header = document.createElement("div");
		var bold = document.createElement("b");
		bold.appendChild(document.createTextNode("MATCHDAY " + i));
		header.appendChild(bold);
		if (col === 0) {
			document.getElementById('figure03').appendChild(header);
		} else if (col === 1) {
			document.getElementById('figure02').appendChild(header);
		} else if (col === 2) {
			document.getElementById('figure01').appendChild(header);
		}

		for (let j = 0; j < groupTeamCount / 2; j++) {
			var id = groupId * 12 + (i * 2) + j;
			var obj = JSON.parse(localStorage.getItem('' + id));
			// console.log(id);
			var div1 = document.createElement("div");
			div1.setAttribute('class', 'col-md-4');
			addAttributeColor(obj.GA, obj.GB, div1);
			div1.appendChild(document.createTextNode(obj.A));
			var div2 = document.createElement("div");
			div2.setAttribute('class', 'col-md-4');
			div2.appendChild(document.createTextNode(obj.GA + '-' + obj.GB));
			var div3 = document.createElement("div");
			div3.setAttribute('class', 'col-md-4');
			addAttributeColor(obj.GB, obj.GA, div3);
			div3.appendChild(document.createTextNode(obj.B));
			if (col === 0) {
				document.getElementById('figure03').appendChild(div1);
				document.getElementById('figure03').appendChild(div2);
				document.getElementById('figure03').appendChild(div3);
			} else if (col === 1) {
				document.getElementById('figure02').appendChild(div1);
				document.getElementById('figure02').appendChild(div2);
				document.getElementById('figure02').appendChild(div3);
			} else if (col === 2) {
				document.getElementById('figure01').appendChild(div1);
				document.getElementById('figure01').appendChild(div2);
				document.getElementById('figure01').appendChild(div3);
			}
		}

		col++;
		if (col === 3) {
			col = 0;
		}
	}
}

function sort() {
	for (var gId = 0; gId < groupCount; gId++) {
		var teamsId = [];
		var teamId = gId * 4;
		for (var i = 0; i < 4; i++, teamId++) {
			teamsId[i] = teamId;
		}
		// This loop for sort points
		for (var i = 0; i < groupTeamCount; i++) {
			for (var j = i + 1; j < groupTeamCount; j++) {
				if (teams[teamsId[j]].table.points > teams[teamsId[i]].table.points) {
					var temp = teams[teamsId[j]];
					teams[teamsId[j]] = teams[teamsId[i]];
					teams[teamsId[i]] = temp;
				}
			}
		}
		// This loop for sort GD
		for (var i = 0; i < groupTeamCount; i++) {
			for (var j = i + 1; j < groupTeamCount; j++) {
				if (teams[teamsId[j]].table.points === teams[teamsId[i]].table.points) {
					if (teams[teamsId[j]].table.gd > teams[teamsId[i]].table.gd) {
						var temp = teams[teamsId[j]];
						teams[teamsId[j]] = teams[teamsId[i]];
						teams[teamsId[i]] = temp;
					}
				}
			}
		}
		// This loop for sort GF
		for (var i = 0; i < groupTeamCount; i++) {
			for (var j = i + 1; j < groupTeamCount; j++) {
				if (teams[teamsId[j]].table.points === teams[teamsId[i]].table.points) {
					if (teams[teamsId[j]].table.gd === teams[teamsId[i]].table.gd) {
						if (teams[teamsId[j]].table.gf > teams[teamsId[i]].table.gf) {
							var temp = teams[teamsId[j]];
							teams[teamsId[j]] = teams[teamsId[i]];
							teams[teamsId[i]] = temp;
						}
					}
				}
			}
		}
	}
}

function mergeSort(array, left, right) {
	if (left < right) {
		let m = Math.floor(left + (right - left) / 2);

		mergeSort(arr, left, m);
		mergeSort(arr, m + 1, right);

		merge(arr, left, m, right);
	}
}

function merge(arr, left, m, right) {
	let i, j, k;
	let n1 = m - left + 1;
	let n2 = right - m;

	/* create temp arrays */
	let L = [];
	let R = [];

	/* Copy data to temp arrays L[] and R[] */
	for (i = 0; i < n1; i++)
		L[i] = teams[teamsId[left + i]].table.points;
	for (j = 0; j < n2; j++)
		R[j] = teams[teamsId[m + 1 + j]].table.points;

	/* Merge the temp arrays back into arr[l..r]*/
	i = 0; // Initial index of first subarray
	j = 0; // Initial index of second subarray
	k = left; // Initial index of merged subarray
	while (i < n1 && j < n2) {
		if (L[i] <= R[j]) {
			arr[k] = L[i];
			i++;
		} else {
			arr[k] = R[j];
			j++;
		}
		k++;
	}

	/* Copy the remaining elements of L[], if there
	   are any */
	while (i < n1) {
		arr[k] = L[i];
		i++;
		k++;
	}

	/* Copy the remaining elements of R[], if there
	   are any */
	while (j < n2) {
		arr[k] = R[j];
		j++;
		k++;
	}
}

function treeView() {
	for (var gId = 0; gId < groupCount; gId++) {
		var teamId = gId * 4;
		treeTeams16.unshift(teams[teamId]);
		treeTeams16.push(teams[teamId + 1]);
	}
	for (let i = 0; i < treeTeams16.length - 1; i += 2) {
		var elem = document.getElementById('tree-16');
		var diff = treeTeams16[i].overall - treeTeams16[i + 1].overall;
		var mulA = 0,
			mulB = 0;
		if (Math.abs(diff) > 10) {
			diff /= 2;
		}
		if (diff > 0) {
			mulA = diff / 2;
			mulB = diff / 4;
		} else if (diff < 0) {
			mulA = diff / 4;
			mulB = diff / 2;
		}
		mulA = Math.floor(Math.abs(mulA));
		mulB = Math.floor(Math.abs(mulB));
		if (mulA == 0) {
			mulA = 1;
		}
		if (mulB == 0) {
			mulB = 1;
		}
		var gA = Math.floor(Math.random() * (mulA));
		var gB = Math.floor(Math.random() * (mulB));
		while (gA == gB) {
			gA += Math.floor(Math.random() * 2);
			gB += Math.floor(Math.random() * 2);
		}
		if (i == 0) {
			var div01 = document.createElement('li');
			div01.setAttribute('class', 'spacer');
			div01.appendChild(document.createTextNode('\u00A0'));
			elem.appendChild(div01);
		}
		var div01 = document.createElement('li');
		var att = gB < gA ? "game game-top winner" : "game game-top";
		div01.setAttribute('class', att);
		addAttributeColor(gA, gB, div01);
		div01.appendChild(document.createTextNode(treeTeams16[i].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gA));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'game game-spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		div01 = document.createElement('li');
		var att = gB < gA ? "game game-bottom" : "game game-bottom winner";
		div01.setAttribute('class', att);
		addAttributeColor(gB, gA, div01);
		div01.appendChild(document.createTextNode(treeTeams16[i + 1].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gB));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		if (gA > gB) {
			treeTeams8.push(treeTeams16[i]);
		} else {
			treeTeams8.push(treeTeams16[i + 1]);
		}
	}

	for (let i = 0; i < treeTeams8.length - 1; i += 2) {
		var elem = document.getElementById('tree-8');
		var diff = treeTeams8[i].overall - treeTeams8[i + 1].overall;
		var mulA = 0,
			mulB = 0;
		if (Math.abs(diff) > 10) {
			diff /= 2;
		}
		if (diff > 0) {
			mulA = diff / 2;
			mulB = diff / 4;
		} else if (diff < 0) {
			mulA = diff / 4;
			mulB = diff / 2;
		}
		mulA = Math.floor(Math.abs(mulA));
		mulB = Math.floor(Math.abs(mulB));
		if (mulA == 0) {
			mulA = 1;
		}
		if (mulB == 0) {
			mulB = 1;
		}
		var gA = Math.floor(Math.random() * (mulA));
		var gB = Math.floor(Math.random() * (mulB));
		while (gA == gB) {
			gA += Math.floor(Math.random() * 2);
			gB += Math.floor(Math.random() * 2);
		}
		if (i == 0) {
			var div01 = document.createElement('li');
			div01.setAttribute('class', 'spacer');
			div01.appendChild(document.createTextNode('\u00A0'));
			elem.appendChild(div01);
		}
		var div01 = document.createElement('li');
		var att = gB < gA ? "game game-top winner" : "game game-top";
		div01.setAttribute('class', att);
		addAttributeColor(gA, gB, div01);
		div01.appendChild(document.createTextNode(treeTeams8[i].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gA));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'game game-spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		div01 = document.createElement('li');
		var att = gB < gA ? "game game-bottom" : "game game-bottom winner";
		div01.setAttribute('class', att);
		addAttributeColor(gB, gA, div01);
		div01.appendChild(document.createTextNode(treeTeams8[i + 1].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gB));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		if (gA > gB) {
			treeTeams4.push(treeTeams8[i]);
		} else {
			treeTeams4.push(treeTeams8[i + 1]);
		}
	}
	for (let i = 0; i < treeTeams4.length - 1; i += 2) {
		var elem = document.getElementById('tree-4');
		var diff = treeTeams4[i].overall - treeTeams4[i + 1].overall;
		var mulA = 0,
			mulB = 0;
		if (Math.abs(diff) > 10) {
			diff /= 2;
		}
		if (diff > 0) {
			mulA = diff / 2;
			mulB = diff / 4;
		} else if (diff < 0) {
			mulA = diff / 4;
			mulB = diff / 2;
		}
		mulA = Math.floor(Math.abs(mulA));
		mulB = Math.floor(Math.abs(mulB));
		if (mulA == 0) {
			mulA = 1;
		}
		if (mulB == 0) {
			mulB = 1;
		}
		var gA = Math.floor(Math.random() * (mulA));
		var gB = Math.floor(Math.random() * (mulB));
		while (gA == gB) {
			gA += Math.floor(Math.random() * 2);
			gB += Math.floor(Math.random() * 2);
		}
		if (i == 0) {
			var div01 = document.createElement('li');
			div01.setAttribute('class', 'spacer');
			div01.appendChild(document.createTextNode('\u00A0'));
			elem.appendChild(div01);
		}
		var div01 = document.createElement('li');
		var att = gB < gA ? "game game-top winner" : "game game-top";
		div01.setAttribute('class', att);
		addAttributeColor(gA, gB, div01);
		div01.appendChild(document.createTextNode(treeTeams4[i].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gA));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'game game-spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		div01 = document.createElement('li');
		var att = gB < gA ? "game game-bottom" : "game game-bottom winner";
		div01.setAttribute('class', att);
		addAttributeColor(gB, gA, div01);
		div01.appendChild(document.createTextNode(treeTeams4[i + 1].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gB));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		if (gA > gB) {
			treeTeams2.push(treeTeams4[i]);
			treeTeams2Playoff.push(treeTeams4[i + 1]);
		} else {
			treeTeams2.push(treeTeams4[i + 1]);
			treeTeams2Playoff.push(treeTeams4[i]);
		}
	}
	for (let i = 0; i < treeTeams2Playoff.length - 1; i += 2) {
		var elem = document.getElementById('tree-2-playoff');
		var diff = treeTeams2Playoff[i].overall - treeTeams2Playoff[i + 1].overall;
		var mulA = 0,
			mulB = 0;
		if (Math.abs(diff) > 10) {
			diff /= 2;
		}
		if (diff > 0) {
			mulA = diff / 2;
			mulB = diff / 4;
		} else if (diff < 0) {
			mulA = diff / 4;
			mulB = diff / 2;
		}
		mulA = Math.floor(Math.abs(mulA));
		mulB = Math.floor(Math.abs(mulB));
		if (mulA == 0) {
			mulA = 1;
		}
		if (mulB == 0) {
			mulB = 1;
		}
		var gA = Math.floor(Math.random() * (mulA));
		var gB = Math.floor(Math.random() * (mulB));
		while (gA == gB) {
			gA += Math.floor(Math.random() * 2);
			gB += Math.floor(Math.random() * 2);
		}
		// var div01 = document.createElement('div');
		// div01.setAttribute('class', 'col-md-4');
		// addAttributeColor(gA, gB, div01);
		// div01.appendChild(document.createTextNode(treeTeams2Playoff[i].name));
		// elem.appendChild(div01);
		// div01 = document.createElement('div');
		// div01.setAttribute('class', 'col-md-4');
		// div01.appendChild(document.createTextNode(gA + '-' + gB));
		// elem.appendChild(div01);
		// div01 = document.createElement('div');
		// div01.setAttribute('class', 'col-md-4');
		// addAttributeColor(gB, gA, div01);
		// div01.appendChild(document.createTextNode(treeTeams2Playoff[i + 1].name));
		// elem.appendChild(div01);
		if (gA > gB) {
			thirth = treeTeams2Playoff[i].name;
		} else {
			thirth = treeTeams2Playoff[i + 1].name;
		}
	}
	for (let i = 0; i < treeTeams2.length - 1; i += 2) {
		var elem = document.getElementById('tree-2');
		var diff = treeTeams2[i].overall - treeTeams2[i + 1].overall;
		var mulA = 0,
			mulB = 0;
		if (Math.abs(diff) > 10) {
			diff /= 2;
		}
		if (diff > 0) {
			mulA = diff / 2;
			mulB = diff / 4;
		} else if (diff < 0) {
			mulA = diff / 4;
			mulB = diff / 2;
		}
		mulA = Math.floor(Math.abs(mulA));
		mulB = Math.floor(Math.abs(mulB));
		if (mulA == 0) {
			mulA = 1;
		}
		if (mulB == 0) {
			mulB = 1;
		}
		var gA = Math.floor(Math.random() * (mulA));
		var gB = Math.floor(Math.random() * (mulB));
		while (gA == gB) {
			gA += Math.floor(Math.random() * 2);
			gB += Math.floor(Math.random() * 2);
		}
		if (i == 0) {
			var div01 = document.createElement('li');
			div01.setAttribute('class', 'spacer');
			div01.appendChild(document.createTextNode('\u00A0'));
			elem.appendChild(div01);
		}
		var div01 = document.createElement('li');
		var att = gB < gA ? "game game-top winner" : "game game-top";
		div01.setAttribute('class', att);
		addAttributeColor(gA, gB, div01);
		div01.appendChild(document.createTextNode(treeTeams2[i].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gA));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'game game-spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		div01 = document.createElement('li');
		var att = gB < gA ? "game game-bottom" : "game game-bottom winner";
		div01.setAttribute('class', att);
		addAttributeColor(gB, gA, div01);
		div01.appendChild(document.createTextNode(treeTeams2[i + 1].name));
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(gB));
		div01.appendChild(span);
		elem.appendChild(div01);
		div01 = document.createElement('li');
		div01.setAttribute('class', 'spacer');
		div01.appendChild(document.createTextNode('\u00A0'));
		elem.appendChild(div01);
		if (gA > gB) {
			let db = new DataBase(treeTeams2[i].name, treeTeams2[i + 1].name);
			window.alert(treeTeams2[i].name);
		} else {
			let db = new DataBase(treeTeams2[i + 1].name, treeTeams2[i].name);
			window.alert(treeTeams2[i + 1].name);
		}
	}
}

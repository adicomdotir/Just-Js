import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    private lastChampion: Array<string> = [];
    private NAMES: { name: string, score: number }[] = [
        {name: 'Bayern München', score: 39},
        {name: 'Manchester City', score: 38},
        {name: 'Real Madrid', score: 37},
        {name: 'Inter Milan', score: 36},
        {name: 'Barcelona', score: 35},
        {name: 'Paris Saint-Germain', score: 34},
        {name: 'Manchester United', score: 33},
        {name: 'Chelsea FC', score: 32},
        {name: 'Atlético Madrid', score: 31},
        {name: 'Ajax Amsterdam', score: 30},
        {name: 'Juventus', score: 29},
        {name: 'Liverpool FC', score: 28},
        {name: 'FC Porto', score: 27},
        {name: 'Atalanta', score: 26},
        {name: 'RasenBallsport Leipzig', score: 25},
        {name: 'Sevilla', score: 24},
        {name: 'River Plate', score: 23},
        {name: 'Borussia Dortmund', score: 22},
        {name: 'SSC Napoli', score: 21},
        {name: 'Eintracht Frankfurt', score: 20},
        {name: 'Wolfsburg', score: 19},
        {name: 'Slavia Prague', score: 18},
        {name: 'AC Milan', score: 17},
        {name: 'Arsenal', score: 16},
        {name: 'Villarreal', score: 15},
        {name: 'Tottenham Hotspur', score: 14},
        {name: 'Leicester City', score: 13},
        {name: 'Flamengo', score: 12},
        {name: 'Lazio', score: 11},
        {name: 'Lyon', score: 10},
        {name: 'Sporting', score: 9},
        {name: 'Benfica', score: 8},
        {name: 'Shakhtar Donetsk', score: 7},
        {name: 'Roma', score: 6},
        {name: 'Lille', score: 5},
        {name: 'Rangers', score: 4},
        {name: 'Boca Juniors', score: 3},
        {name: 'West Ham United', score: 2},
        {name: 'FK Red Star Belgrade', score: 1},
        {name: 'Al Ahly', score: 0}
    ];
    private LEAGUE_SIZE = 8;
    private teamIndex = [];
    private relegation = [];
    private allPlayer: Player[] = [];
    private tables: { id, g, w, d, l, gf, ga, pts }[] = [];

    constructor() {
    }

    ngOnInit() {
        const names: { name: string, score: number }[] = this.NAMES;
        const leagueSize = this.LEAGUE_SIZE;
        // Generate player
        for (let i = 0; i < this.NAMES.length; i++) {
            for (let j = 0; j < 11; j++) {
                const pid = this.allPlayer.length + 1001;
                const df = Math.floor(Math.random() * 20);
                const pm = Math.floor(Math.random() * 20);
                const att = Math.floor(Math.random() * 20);
                this.allPlayer.push(new Player(pid, i, df, pm, att));
            }
        }

        for (let i = 0; i < leagueSize; i++) {
            let idx = Math.floor(Math.random() * names.length);
            while (this.teamIndex.filter(x => x === idx).length > 0) {
                idx = Math.floor(Math.random() * names.length);
            }
            this.teamIndex.push(idx);
        }
        this.justiceLeague(leagueSize, this.teamIndex, names);
    }

    private changeTeam() {
        const x = this.relegation[0];
        const y = this.relegation[1];
        let idx = Math.floor(Math.random() * this.NAMES.length);
        let idy = Math.floor(Math.random() * this.NAMES.length);
        while (this.teamIndex.filter(item => item === idx || item === idy).length > 0 || idx === idy || idx === x || idy === y || idx === y || idy === x) {
            idx = Math.floor(Math.random() * this.NAMES.length);
            idy = Math.floor(Math.random() * this.NAMES.length);
        }
        const deleteId = [];
        this.teamIndex.forEach((v, i) => {
            if (v === x) {
                deleteId.push(i);
            }
            if (v === y) {
                deleteId.push(i);
            }
        });
        this.teamIndex.splice(deleteId[0], 1);
        this.teamIndex.splice(deleteId[1] - 1, 1);
        this.teamIndex.push(idx);
        this.teamIndex.push(idy);
        console.log(`Promotion 1 => ${this.NAMES[idx].name} & Promotion 2 => ${this.NAMES[idy].name}`);
        console.log(`Relegation 1 => ${this.NAMES[x].name} & Relegation 2 => ${this.NAMES[y].name}`);
        this.relegation = [];
    }

    nextYear() {
        this.changeTeam();
        this.increaseAge();
        this.trainingEffect();
        this.justiceLeague(this.LEAGUE_SIZE, this.teamIndex, this.NAMES);
    }

    private increaseAge() {
        this.allPlayer.forEach(x => {
            x.age += 1;
            if (x.age >= 40) {
                const pid = this.allPlayer.length + 1001;
                const df = Math.floor(Math.random() * 20);
                const pm = Math.floor(Math.random() * 20);
                const att = Math.floor(Math.random() * 20);
                const teamId = x.teamId;
                this.allPlayer.push(new Player(pid, teamId, df, pm, att));
                x.teamId = -1;
            }
        });
    }

    private trainingEffect() {
        this.allPlayer.forEach(x => {
            if (x.age < 30) {
                x.attack += 1;
                x.playMaking += 1;
                x.defence += 1;
            } else {
                x.attack = x.attack > 0 ? x.attack - 1 : 0;
                x.playMaking = x.playMaking > 0 ? x.playMaking - 1 : 0;
                x.defence = x.defence > 0 ? x.defence - 1 : 0;
            }
        });
    }

    private justiceLeague(leagueSize, teamIndex, names: { name: string, score: number }[]) {
        for (let i = 0; i < this.teamIndex.length; i++) {
            const idx = this.teamIndex[i];
            console.log(`${names[idx].name} is score ${names[idx].score}`);
        }

        const fixtures: { h, hg, ag, a }[] = this.generateFixture(leagueSize);
        for (let i = 0; i < fixtures.length; i++) {
            if (i % (leagueSize / 2) === 0) {
                console.log(`\nWeek ${Math.floor(i / (leagueSize / 2)) + 1}`);
            }
            const homeId = teamIndex[fixtures[i].h];
            const awayId = teamIndex[fixtures[i].a];
            const homePlayer = this.allPlayer.filter(x => x.teamId === homeId);
            const awayPlayer = this.allPlayer.filter(x => x.teamId === awayId);

            let dfHome = homePlayer.reduce((pv, cv, ci) => pv + cv.defence, 0) / homePlayer.length;
            let pmHome = homePlayer.reduce((pv, cv, ci) => pv + cv.playMaking, 0) / homePlayer.length;
            let attHome = homePlayer.reduce((pv, cv, ci) => pv + cv.attack, 0) / homePlayer.length;
            let dfAway = awayPlayer.reduce((pv, cv, ci) => pv + cv.defence, 0) / awayPlayer.length;
            let pmAway = awayPlayer.reduce((pv, cv, ci) => pv + cv.playMaking, 0) / awayPlayer.length;
            let attAway = awayPlayer.reduce((pv, cv, ci) => pv + cv.attack, 0) / awayPlayer.length;

            dfHome = Math.round(dfHome);
            pmHome = Math.round(pmHome);
            attHome = Math.round(attHome);
            dfAway = Math.round(dfAway);
            pmAway = Math.round(pmAway);
            attAway = Math.round(attAway);

            pmHome = Math.round(pmHome * 100 / (pmHome + pmAway));
            pmAway = 100 - pmHome;
            attHome = Math.round(attHome * 100 / (attHome + dfAway));
            dfAway = 100 - attHome;
            attAway = Math.round(attAway * 100 / (attAway + dfHome));
            dfHome = 100 - attAway;


            let homeGoalChance = 1;
            let awayGoalChance = 0;
            for (let j = 0; j < 10; j++) {
                const rnd = Math.ceil(Math.random() * 150);
                if (rnd <= pmHome) {
                    homeGoalChance += 1;
                } else if (rnd > pmHome && rnd <= 100) {
                    awayGoalChance += 1;
                }
            }
            fixtures[i].hg = 0;
            fixtures[i].ag = 0;
            for (let j = 0; j < homeGoalChance; j++) {
                const rnd = Math.ceil(Math.random() * 100);
                if (rnd <= attHome) {
                    fixtures[i].hg += 1;
                }
            }
            for (let j = 0; j < awayGoalChance; j++) {
                const rnd = Math.ceil(Math.random() * 100);
                if (rnd <= attAway) {
                    fixtures[i].ag += 1;
                }
            }
            console.log(`${names[teamIndex[fixtures[i].h]].name} `
                + `[${homeGoalChance}]${fixtures[i].hg}-${fixtures[i].ag}[${awayGoalChance}]`
                + ` ${names[teamIndex[fixtures[i].a]].name}`
                + `\t\t[${dfHome}/${attAway}][${pmHome}/${pmAway}][${attHome}/${dfAway}]`);
        }
        this.tables = [];
        for (let i = 0; i < leagueSize; i++) {
            this.tables.push({id: i, g: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0});
        }
        for (let i = 0; i < fixtures.length; i++) {
            if (fixtures[i].hg > fixtures[i].ag) {
                this.tables.filter(x => x.id === fixtures[i].h)[0].pts += 3;
                this.tables.filter(x => x.id === fixtures[i].h)[0].g += 1;
                this.tables.filter(x => x.id === fixtures[i].h)[0].w += 1;
                this.tables.filter(x => x.id === fixtures[i].h)[0].gf += fixtures[i].hg;
                this.tables.filter(x => x.id === fixtures[i].h)[0].ga += fixtures[i].ag;
                this.tables.filter(x => x.id === fixtures[i].a)[0].g += 1;
                this.tables.filter(x => x.id === fixtures[i].a)[0].l += 1;
                this.tables.filter(x => x.id === fixtures[i].a)[0].gf += fixtures[i].ag;
                this.tables.filter(x => x.id === fixtures[i].a)[0].ga += fixtures[i].hg;
            } else if (fixtures[i].hg < fixtures[i].ag) {
                this.tables.filter(x => x.id === fixtures[i].a)[0].pts += 3;
                this.tables.filter(x => x.id === fixtures[i].a)[0].g += 1;
                this.tables.filter(x => x.id === fixtures[i].a)[0].w += 1;
                this.tables.filter(x => x.id === fixtures[i].a)[0].gf += fixtures[i].ag;
                this.tables.filter(x => x.id === fixtures[i].a)[0].ga += fixtures[i].hg;
                this.tables.filter(x => x.id === fixtures[i].h)[0].g += 1;
                this.tables.filter(x => x.id === fixtures[i].h)[0].l += 1;
                this.tables.filter(x => x.id === fixtures[i].h)[0].gf += fixtures[i].hg;
                this.tables.filter(x => x.id === fixtures[i].h)[0].ga += fixtures[i].ag;
            } else if (fixtures[i].hg === fixtures[i].ag) {
                this.tables.filter(x => x.id === fixtures[i].h)[0].pts++;
                this.tables.filter(x => x.id === fixtures[i].a)[0].pts++;
                this.tables.filter(x => x.id === fixtures[i].h)[0].g += 1;
                this.tables.filter(x => x.id === fixtures[i].h)[0].d += 1;
                this.tables.filter(x => x.id === fixtures[i].h)[0].gf += fixtures[i].hg;
                this.tables.filter(x => x.id === fixtures[i].h)[0].ga += fixtures[i].ag;
                this.tables.filter(x => x.id === fixtures[i].a)[0].g += 1;
                this.tables.filter(x => x.id === fixtures[i].a)[0].d += 1;
                this.tables.filter(x => x.id === fixtures[i].a)[0].gf += fixtures[i].ag;
                this.tables.filter(x => x.id === fixtures[i].a)[0].ga += fixtures[i].hg;
            }
        }
        console.log(' ');
        console.log('Name'.toString().padStart(22, ' ') + `\t\tR\t\tG\t\tW\t\tD\t\tL\t\tF\t\tA\t\tD\t\tP`);
        this.tables.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
        for (const table of this.tables) {
            names[teamIndex[table.id]].score += table.pts;
            console.log(`${names[teamIndex[table.id]].name.toString().padStart(22, ' ')}\t\t${teamIndex[table.id]}\t\t${table.g}\t\t${table.w}\t\t${table.d}\t\t${table.l}\t\t${table.gf}\t\t${table.ga}\t\t${table.gf - table.ga}\t\t${table.pts}`);
        }
        this.lastChampion.push(names[teamIndex[(this.tables)[0].id]].name);
        console.log(this.lastChampion);

        this.relegation.push(teamIndex[(this.tables)[this.tables.length - 1].id]);
        this.relegation.push(teamIndex[(this.tables)[this.tables.length - 2].id]);
    }

    private generateFixture(count) {
        const tmp = [];
        let homeAway = true;
        const fixtures: { h, hg, ag, a }[] = [];
        for (let i = 0; i < count; i++) {
            tmp.push(i);
        }
        for (let i = 0; i < count * 2 - 2; i++) {
            for (let j = 0; j < count / 2; j++) {
                if (homeAway) {
                    fixtures.push({h: tmp[j], hg: -1, ag: -1, a: tmp[count - 1 - j]});
                    homeAway = !homeAway;
                } else {
                    fixtures.push({h: tmp[count - 1 - j], hg: -1, ag: -1, a: tmp[j]});
                    homeAway = !homeAway;
                }
            }
            const x = tmp.splice(1, tmp.length - 2);
            tmp.push(...x);
        }
        return fixtures;
    }
}

class Player {
    id: number;
    teamId: number;
    defence: number;
    playMaking: number;
    attack: number;
    age: number;

    constructor(id: number, teamId: number, defence: number, playMaking: number, attack: number) {
        this.id = id;
        this.teamId = teamId;
        this.defence = defence;
        this.playMaking = playMaking;
        this.attack = attack;
        this.age = Math.floor(Math.random() * 18) + 18;
    }
}


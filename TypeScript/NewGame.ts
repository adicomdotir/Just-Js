class MainClass {
    private season = 1;
    private teams: Team[] = [];
    private players: Player[] = [];
    private retiredPlayers: Player[] = [];
    private fixtures: Fixture[] = [];
    private tables: Table[] = [];
    private level = 3;

    constructor() {
    }

    start() {
        this.generateTeam();
        for (let i = 1; i <= 5; i++) {
            this.generateFixture();
            this.process();
            this.spendPrize();
            this.promotionAndRelegation();
            this.season += 1;
            this.seasonEnd();
            this.transferMarket();
            this.addYouthPlayer();
        }
        this.season -= 1;
        logSystem(this.season, this.fixtures, this.tables, this.level);
        logTeams(this.teams, this.players);
        console.log(this.players);
        console.log(this.retiredPlayers);
    }

    private process() {
        this.fixtures.filter(x => x.season === this.season)
            .forEach(x => {
                this.generateMatchFact(x.homeTeamId, x.awayTeamId, x);
            });
    }

    private generateTeam() {
        for (let lvl = 1; lvl <= this.level; lvl++) {
            for (let i = 0; i < 8; i++) {
                const team = new Team(this.teams.length + 10, nameGenerator(), budgetGenerator(), lvl);
                this.teams.push(team);
                this.generatePlayer(team.id);
            }
        }
    }

    private generatePlayer(teamId: number) {
        for (let i = 0; i < 11; i++) {
            const player = new Player(
                this.players.length + 1000,
                teamId,
                fullNameGenerator(),
                ageGenerator(),
                skillGenerator(),
                skillGenerator(),
                skillGenerator()
            );
            this.players.push(player);
            const idx = this.teams.findIndex(x => x.id === teamId);
            this.teams[idx].budget -= player.wage;
        }
    }

    private generateFixture() {
        for (let lvl = 1; lvl <= this.level; lvl++) {
            const teamsId: number[] = [];
            const teamsName: string[] = [];
            this.teams.filter(x => x.division === lvl).forEach(x => {
                teamsId.push(x.id);
                teamsName.push(x.name);
            });
            // Home & Away
            for (let i = 0; i < 8 - 1; i++) {
                for (let j = 0; j < 4; j += 1) {
                    const homeTeamId = teamsId[j];
                    const awayTeamId = teamsId[teamsId.length - 1 - j];
                    const homeTeamName = teamsName[j];
                    const awayTeamName = teamsName[teamsName.length - 1 - j];
                    const homeFixture = new Fixture(this.fixtures.length + 1, this.season, 7 - i, lvl,
                        homeTeamName, awayTeamName, homeTeamId, awayTeamId);
                    this.fixtures.unshift(homeFixture);
                    const awayFixture = new Fixture(this.fixtures.length + 1, this.season, 8 + i, lvl,
                        awayTeamName, homeTeamName, awayTeamId, homeTeamId);
                    this.fixtures.push(awayFixture);
                }
                const id = teamsId.splice(1, 1)[0];
                const name = teamsName.splice(1, 1)[0];
                teamsId.push(id);
                teamsName.push(name);
            }
        }
    }

    private generateMatchFact(homeTeamId: number, awayTeamId: number, fixture: Fixture) {
        const matchFact = this.runMatch(homeTeamId, awayTeamId);
        const homeGoal = matchFact.homeGoal;
        const awayGoal = matchFact.awayGoal;
        this.updateFixture(fixture, matchFact);
        this.createTable(homeTeamId, fixture.division);
        this.createTable(awayTeamId, fixture.division);
        if (homeGoal > awayGoal) {
            this.updateTable(MatchStatus.WIN, homeTeamId, homeGoal, awayGoal);
            this.updateTable(MatchStatus.LOSE, awayTeamId, awayGoal, homeGoal);
        } else if (homeGoal < awayGoal) {
            this.updateTable(MatchStatus.LOSE, homeTeamId, homeGoal, awayGoal);
            this.updateTable(MatchStatus.WIN, awayTeamId, awayGoal, homeGoal);
        } else {
            this.updateTable(MatchStatus.DRAW, homeTeamId, homeGoal, awayGoal);
            this.updateTable(MatchStatus.DRAW, awayTeamId, awayGoal, homeGoal);
        }
    }

    private runMatch(homeTeamId: number, awayTeamId: number): MatchFact {
        const homeTeamPlayers = this.players.filter(x => x.teamId === homeTeamId);
        let homeAttack = homeTeamPlayers.reduce((pv, cv, ci) => pv + cv.attack, 0) / homeTeamPlayers.length;
        let homeDefence = homeTeamPlayers.reduce((pv, cv, ci) => pv + cv.defence, 0) / homeTeamPlayers.length;
        let homeMidfield = homeTeamPlayers.reduce((pv, cv, ci) => pv + cv.midfield, 0) / homeTeamPlayers.length;
        const awayTeamPlayers = this.players.filter(x => x.teamId === awayTeamId);
        let awayAttack = awayTeamPlayers.reduce((pv, cv, ci) => pv + cv.attack, 0) / awayTeamPlayers.length;
        let awayDefence = awayTeamPlayers.reduce((pv, cv, ci) => pv + cv.defence, 0) / awayTeamPlayers.length;
        let awayMidfield = awayTeamPlayers.reduce((pv, cv, ci) => pv + cv.midfield, 0) / awayTeamPlayers.length;

        homeMidfield = Math.round(homeMidfield / (homeMidfield + awayMidfield) * 100);
        awayMidfield = 100 - homeMidfield;
        homeAttack = Math.round(homeAttack / (homeAttack + awayDefence) * 100);
        awayDefence = 100 - homeAttack;
        awayAttack = Math.round(awayAttack / (awayAttack + homeDefence) * 100);
        homeDefence = 100 - awayAttack;

        let matchFact = new MatchFact();
        matchFact.homeChance = 1;
        for (let i = 0; i < Math.floor(homeMidfield / 10); i++) {
            let chance = Math.floor(Math.random() * (homeMidfield + awayMidfield));
            if (chance <= homeMidfield) {
                matchFact.homeChance += 1;
            }
        }
        for (let i = 0; i < Math.floor(awayMidfield / 10); i++) {
            let chance = Math.floor(Math.random() * (homeMidfield + awayMidfield));
            if (chance <= awayMidfield) {
                matchFact.awayChance += 1;
            }
        }
        for (let i = 0; i < matchFact.homeChance; i++) {
            let goal = Math.floor(Math.random() * (homeAttack + awayDefence));
            if (goal <= homeAttack) {
                matchFact.homeGoal += 1;
            }
        }
        for (let i = 0; i < matchFact.awayChance; i++) {
            let goal = Math.floor(Math.random() * (awayAttack + homeDefence));
            if (goal <= awayAttack) {
                matchFact.awayGoal += 1;
            }
        }
        return matchFact;
    }

    private updateFixture(fixture: Fixture, matchFact: MatchFact) {
        fixture.matchFact = matchFact;
    }

    private updateTable(matchStatus: MatchStatus, teamId: number, goalForward: number, goalAgainst: number) {
        const idx = this.tables.findIndex(x => x.teamId === teamId && x.season === this.season);
        const table = this.tables[idx];
        if (matchStatus === MatchStatus.WIN) {
            table.game += 1;
            table.pts += 3;
            table.won += 1;
            table.gf += goalForward;
            table.ga += goalAgainst;
        } else if (matchStatus === MatchStatus.LOSE) {
            table.game += 1;
            table.lost += 1;
            table.gf += goalForward;
            table.ga += goalAgainst;
        } else if (matchStatus === MatchStatus.DRAW) {
            table.game += 1;
            table.pts += 1;
            table.draw += 1;
            table.gf += goalForward;
            table.ga += goalAgainst;
        }
    }

    private createTable(teamId: number, division: number) {
        const idx = this.tables.findIndex(x => x.teamId === teamId && x.season === this.season);
        if (idx === -1) {
            const teamIdx = this.teams.findIndex(x => x.id === teamId);
            this.tables.push(new Table(this.teams[teamIdx].name, this.teams[teamIdx].id, this.season, division));
        }
    }

    private promotionAndRelegation() {
        let p1Id = -1;
        let p2Id = -1;
        let p1TeamIdx = -1;
        let p2TeamIdx = -1;
        let r1Id = -1;
        let r2Id = -1;
        let r1TeamIdx = -1;
        let r2TeamIdx = -1;
        for (let i = 1; i <= this.level; i++) {
            const tmpTables = this.tables.filter(x => x.season === this.season && x.division === i);
            sortTable(tmpTables);
            p1Id = tmpTables[0].teamId;
            p2Id = tmpTables[1].teamId;
            p1TeamIdx = this.teams.findIndex(x => x.id === p1Id);
            p2TeamIdx = this.teams.findIndex(x => x.id === p2Id);
            if (r1TeamIdx !== -1 && r2TeamIdx !== -1) {
                this.teams[r1TeamIdx].division = i;
                this.teams[r2TeamIdx].division = i;
                this.teams[p1TeamIdx].division = i - 1;
                this.teams[p2TeamIdx].division = i - 1;
            }
            r1Id = tmpTables[6].teamId;
            r2Id = tmpTables[7].teamId;
            r1TeamIdx = this.teams.findIndex(x => x.id === r1Id);
            r2TeamIdx = this.teams.findIndex(x => x.id === r2Id);
        }
        // const tmpDivOneTables = this.tables.filter(x => x.season === this.season && x.division === 1);
        // sortTable(tmpDivOneTables);
        // const tmpDivTwoTables = this.tables.filter(x => x.season === this.season && x.division === 2);
        // sortTable(tmpDivTwoTables);
        // for (let i = 0; i < 2; i++) {
        //     const pTeamId = tmpDivTwoTables[i].teamId;
        //     const rTeamId = tmpDivOneTables[tmpDivOneTables.length - 1 - i].teamId;
        //     const pTeamIdx = this.teams.findIndex(x => x.id === pTeamId);
        //     const rTeamIdx = this.teams.findIndex(x => x.id === rTeamId);
        //     this.teams[pTeamIdx].division = 1;
        //     this.teams[rTeamIdx].division = 2;
        // }
    }

    private transferMarket() {
        const playerPool = [];
        this.teams.forEach(team => {
            let count = 1;
            if (team.budget < 0) {
                count += 1;
            }
            for (let i = 0; i < count; i++) {
                const players = this.players.filter(pl => pl.teamId === team.id);
                players.sort((a, b) => b.wage - a.wage);
                if (team.budget > 0) {
                    const rnd = Math.floor(Math.random() * players.length);
                    let idx = playerPool.findIndex(x => x === players[rnd].id);
                    if (idx === -1) {
                        playerPool.push(players[rnd].id);
                    }
                } else {
                    if (players.length > 0) {
                        playerPool.push(players[0].id);
                    }
                }
            }
        });
        this.teams.forEach(team => {
            let count = 1;
            if (team.budget > 200000) {
                count += 1;
            }
            for (let i = 0; i < count && playerPool.length > 0; i++) {
                const selectedIdx = Math.floor(Math.random() * playerPool.length);
                const isMyPlayer = this.players.filter(x => x.teamId === team.id).findIndex(x => x.id === playerPool[selectedIdx]) !== -1;
                if (!isMyPlayer && team.budget > 50000) {
                    const player = this.players.filter(x => x.id === playerPool[selectedIdx])[0];
                    const playerHistory = {
                        id: player.playerHistory.length + 1,
                        season: this.season,
                        oldTeamId: player.teamId,
                        newTeamId: team.id
                    } as PlayerHistory;
                    player.playerHistory.push(playerHistory);
                    team.budget -= player.wage;
                    player.teamId = team.id;
                    playerPool.splice(selectedIdx, 1);
                    console.log(player.id, playerHistory);
                }
            }
        });
    }

    private seasonEnd() {
        this.players.forEach(player => {
            player.age += 1;
            player.wage = wageCalculator(player);
            if (player.age > 30) {
                const diff = player.age - 30;
                player.midfield -= diff;
                player.attack -= diff;
                player.defence -= diff;
            } else {
                player.midfield += 1;
                player.attack += 1;
                player.defence += 1;
            }
        });
        const retiredPlayersIdx = [];
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            if (player.age > 36) {
                const rndRetired = Math.floor(Math.random() * 2);
                if (rndRetired === 1) {
                    retiredPlayersIdx.push(i);
                }
            }
        }
        for (let i = 0; i < retiredPlayersIdx.length; i++) {
            const tmpPlayer = this.players.splice(retiredPlayersIdx[i] - i, 1);
            this.retiredPlayers.push(...tmpPlayer);
        }
        this.teams.forEach(team => {
            this.players.filter(player => player.teamId === team.id)
                .forEach(player => {
                    team.budget -= player.wage;
                });
        });
    }

    private spendPrize() {
        let prize = 80000 * this.level;
        for (let i = 1; i <= this.level; i++) {
            const tmpTables = this.tables.filter(x => x.season === this.season && x.division === i);
            sortTable(tmpTables);
            tmpTables.forEach(x => {
                const idx = this.teams.findIndex(tm => tm.id === x.teamId);
                this.teams[idx].budget += prize;
                prize -= 10000;
            });
        }
    }

    private addYouthPlayer() {
        this.teams.forEach(x => {
            const tmpPlayers = this.players.filter(player => player.teamId === x.id);
            if (tmpPlayers.length < 5) {
                const newPlayer = new Player(this.players.length + this.retiredPlayers.length + 1001, x.id, fullNameGenerator(), 18, 20, 20, 20);
                this.players.push(newPlayer);
            }
        })
    }
}

enum MatchStatus {
    WIN,
    LOSE,
    DRAW
}

class Player {
    id: number;
    teamId: number;
    fullName: string;
    age: number;
    attack: number;
    defence: number;
    midfield: number;
    wage: number;
    playerHistory: PlayerHistory[];

    constructor(
        id: number, teamId: number, fullName: string, age: number, attack: number, defence: number, midfield: number) {
        this.id = id;
        this.teamId = teamId;
        this.fullName = fullName;
        this.age = age;
        this.attack = attack;
        this.defence = defence;
        this.midfield = midfield;
        this.playerHistory = [];
        this.wage = wageCalculator(this);
    }
}

class Team {
    id: number;
    name: string;
    budget: number;
    division: number;

    constructor(id: number, name: string, budget: number, division: number) {
        this.id = id;
        this.name = name;
        this.budget = budget;
        this.division = division;
    }
}

class Fixture {
    id: number;
    season: number;
    week: number;
    division: number;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamId: number;
    awayTeamId: number;
    matchFact: MatchFact;

    constructor(
        id: number, season: number, week: number, division: number,
        homeTeamName: string, awayTeamName: string,
        homeTeamId: number, awayTeamId: number) {
        this.id = id;
        this.season = season;
        this.week = week;
        this.division = division;
        this.homeTeamName = homeTeamName;
        this.awayTeamName = awayTeamName;
        this.homeTeamId = homeTeamId;
        this.awayTeamId = awayTeamId;
    }
}

class Table {
    teamName: string;
    teamId: number;
    season: number;
    division: number;
    rank: number;
    game: number;
    won: number;
    draw: number;
    lost: number;
    gf: number;
    ga: number;
    pts: number;

    constructor(teamName: string, teamId: number, season: number, division: number) {
        this.teamName = teamName;
        this.teamId = teamId;
        this.season = season;
        this.division = division;
        this.rank = 0;
        this.game = 0;
        this.won = 0;
        this.draw = 0;
        this.lost = 0;
        this.gf = 0;
        this.ga = 0;
        this.pts = 0;
    }
}

class PlayerHistory {
    id: number;
    season: number;
    oldTeamId: number;
    newTeamId: number;
}

class MatchFact {
    homeGoal = 0;
    awayGoal = 0;
    homeChance = 0;
    awayChance = 0;
}

function nameGenerator(): string {
    const vowelsLower = 'aeiou';
    const upperCaseLetter = 'BCDFGHJKLMNPQRSTVWXYZ';
    const lowerCaseLetter = 'bcdfghjklmnpqrstvwxyz';
    let name = '';
    const nameSize = 5 + Math.floor(Math.random() * 5);
    for (let i = 0; i < nameSize; i++) {
        if (i % 2 === 0) {
            const rnd = Math.floor(Math.random() * vowelsLower.length);
            name += vowelsLower[rnd];
        } else {
            const rnd = Math.floor(Math.random() * lowerCaseLetter.length);
            name += lowerCaseLetter[rnd];
        }
    }
    return upperCaseLetter[Math.floor(Math.random() * upperCaseLetter.length)] + name;
}

function fullNameGenerator(): string {
    const rndFirstName = Math.floor(Math.random() * FIRST_NAME.length);
    const rndLastName = Math.floor(Math.random() * LAST_NAME.length);
    return FIRST_NAME[rndFirstName] + ' ' + LAST_NAME[rndLastName];
}

function ageGenerator(): number {
    return Math.floor(Math.random() * 18) + 18;
}

function skillGenerator(): number {
    return Math.floor(Math.random() * 80) + 20;
}

function budgetGenerator(): number {
    return (Math.floor(Math.random() * 200) + 100) * 1000;
}

function wageCalculator(player: Player): number {
    const ageCoe = player.age / 18;
    let price = player.defence + player.attack + player.midfield;
    price = Math.pow(price, 2);
    price *= 18;
    price /= Math.pow(player.age, ageCoe);
    price = Math.floor(price);
    return price;
}

function sortTable(table: Table[]) {
    table.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
}

function logFixtures(fixtures: Fixture[], season: number, division: number) {
    const tmpFixtures = fixtures.filter(x => x.season === season && x.division === division);
    for (let i = 0; i < tmpFixtures.length; i++) {
        const fixture = tmpFixtures[i];
        if (i % 4 === 0) {
            console.log(`Season ${season}, Division ${division}, Week ${fixture.week}`);
        }
        const homeSection = `${fixture.homeTeamName}[${fixture.matchFact.homeChance}] ${fixture.matchFact.homeGoal}`;
        const awaySection = `${fixture.matchFact.awayGoal} [${fixture.matchFact.awayChance}]${fixture.awayTeamName}`;
        console.log(`${homeSection} - ${awaySection}`);
    }
}

function logTables(tables: Table[], season: number, division: number) {
    const tmpTable = tables.filter(x => x.season === season && x.division === division);
    sortTable(tmpTable);
    let rankCounter = 1;
    tmpTable.forEach(x => {
        x.rank = rankCounter;
        rankCounter += 1;
    });
    console.table(tmpTable);
}

function logSystem(season: number, fixtures: Fixture[], tables: Table[], level: number) {
    for (let i = 1; i <= season; i++) {
        for (let lvl = 1; lvl <= level; lvl++) {
            logFixtures(fixtures, i, lvl);
            logTables(tables, i, lvl);
        }
    }
}

function logTeams(teams: Team[], players: Player[]) {
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const teamPlayers = players.filter(x => x.teamId === team.id);
        let overallMidfield = teamPlayers.reduce((pv, cv) => pv + cv.midfield, 0) / teamPlayers.length;
        let overallAttack = teamPlayers.reduce((pv, cv) => pv + cv.attack, 0) / teamPlayers.length;
        let overallDefence = teamPlayers.reduce((pv, cv) => pv + cv.defence, 0) / teamPlayers.length;
        console.log(team.name, Math.round(overallMidfield), Math.round(overallAttack), Math.round(overallDefence), team.budget, teamPlayers.length);
    }
}

const FIRST_NAME = ['Jacob', 'Michael', 'Ethan', 'Joshua', 'Daniel', 'Alexander', 'Anthony', 'William', 'Christopher', 'Matthew', 'Jayden', 'Andrew', 'Joseph', 'David', 'Noah', 'Aiden', 'James', 'Ryan', 'Logan', 'John', 'Nathan', 'Elijah', 'Christian', 'Gabriel', 'Benjamin', 'Jonathan', 'Tyler', 'Samuel', 'Nicholas', 'Gavin', 'Dylan', 'Jackson', 'Brandon', 'Caleb', 'Mason', 'Angel', 'Isaac', 'Evan', 'Jack', 'Kevin', 'Jose', 'Isaiah', 'Luke', 'Landon', 'Justin', 'Lucas', 'Zachary', 'Jordan', 'Robert', 'Aaron', 'Brayden', 'Thomas', 'Cameron', 'Hunter', 'Austin', 'Adrian', 'Connor', 'Owen', 'Aidan', 'Jason', 'Julian', 'Wyatt', 'Charles', 'Luis', 'Carter', 'Juan', 'Chase', 'Diego', 'Jeremiah', 'Brody', 'Xavier', 'Adam', 'Carlos', 'Sebastian', 'Liam', 'Hayden', 'Nathaniel', 'Henry', 'Jesus', 'Ian', 'Tristan', 'Bryan', 'Sean', 'Cole', 'Alex', 'Eric', 'Brian', 'Jaden', 'Carson', 'Blake', 'Ayden', 'Cooper', 'Dominic', 'Brady', 'Caden', 'Josiah', 'Kyle', 'Colton', 'Kaden', 'Eli', 'Miguel', 'Antonio', 'Parker', 'Steven', 'Alejandro', 'Riley', 'Richard', 'Timothy', 'Devin', 'Jesse', 'Victor', 'Jake', 'Joel', 'Colin', 'Kaleb', 'Bryce', 'Levi', 'Oliver', 'Oscar', 'Vincent', 'Ashton', 'Cody', 'Micah', 'Preston', 'Marcus', 'Max', 'Patrick', 'Seth', 'Jeremy', 'Peyton', 'Nolan', 'Ivan', 'Damian', 'Maxwell', 'Alan', 'Kenneth', 'Jonah', 'Jorge', 'Mark', 'Giovanni', 'Eduardo', 'Grant', 'Collin', 'Gage', 'Omar', 'Emmanuel', 'Trevor', 'Edward', 'Ricardo', 'Cristian', 'Nicolas', 'Kayden', 'George', 'Jaxon', 'Paul', 'Braden', 'Elias', 'Andres', 'Derek', 'Garrett', 'Tanner', 'Malachi', 'Conner', 'Fernando', 'Cesar', 'Javier', 'Miles', 'Jaiden', 'Alexis', 'Leonardo', 'Santiago', 'Francisco', 'Cayden', 'Shane', 'Edwin', 'Hudson', 'Travis', 'Bryson', 'Erick', 'Jace', 'Hector', 'Josue', 'Peter', 'Jaylen', 'Mario', 'Manuel', 'Abraham', 'Grayson', 'Damien', 'Kaiden', 'Spencer', 'Stephen', 'Edgar', 'Wesley', 'Shawn', 'Trenton', 'Jared', 'Jeffrey', 'Landen', 'Johnathan', 'Bradley', 'Braxton', 'Ryder', 'Camden', 'Roman', 'Asher', 'Brendan', 'Maddox', 'Sergio', 'Israel', 'Andy', 'Lincoln', 'Erik', 'Donovan', 'Raymond', 'Avery', 'Rylan', 'Dalton', 'Harrison', 'Andre', 'Martin', 'Keegan', 'Marco', 'Jude', 'Sawyer', 'Dakota', 'Leo', 'Calvin', 'Kai', 'Drake', 'Troy', 'Zion', 'Clayton', 'Roberto', 'Zane', 'Gregory', 'Tucker', 'Rafael', 'Kingston', 'Dominick', 'Ezekiel', 'Griffin', 'Devon', 'Drew', 'Lukas', 'Johnny', 'Ty', 'Pedro', 'Tyson', 'Caiden', 'Mateo', 'Braylon', 'Cash', 'Aden', 'Chance', 'Taylor', 'Marcos', 'Maximus', 'Ruben', 'Emanuel', 'Simon', 'Corbin', 'Brennan', 'Dillon', 'Skyler', 'Myles', 'Xander', 'Jaxson', 'Dawson', 'Kameron', 'Kyler', 'Axel', 'Colby', 'Jonas', 'Joaquin', 'Payton', 'Brock', 'Frank', 'Enrique', 'Quinn', 'Emilio', 'Malik', 'Grady', 'Angelo', 'Julio', 'Derrick', 'Raul', 'Fabian', 'Corey', 'Gerardo', 'Dante', 'Ezra', 'Armando', 'Allen', 'Theodore', 'Gael', 'Amir', 'Zander', 'Adan', 'Maximilian', 'Randy', 'Easton', 'Dustin', 'Luca', 'Phillip', 'Julius', 'Charlie', 'Ronald', 'Jakob', 'Cade', 'Brett', 'Trent', 'Silas', 'Keith', 'Emiliano', 'Trey', 'Jalen', 'Darius', 'Lane', 'Jerry', 'Jaime', 'Scott', 'Graham', 'Weston', 'Braydon', 'Anderson', 'Rodrigo', 'Pablo', 'Saul', 'Danny', 'Donald', 'Elliot', 'Brayan', 'Dallas', 'Lorenzo', 'Casey', 'Mitchell', 'Alberto', 'Tristen', 'Rowan', 'Jayson', 'Gustavo', 'Aaden', 'Amari', 'Dean', 'Braeden', 'Declan', 'Chris', 'Ismael', 'Dane', 'Louis', 'Arturo', 'Brenden', 'Felix', 'Jimmy', 'Cohen', 'Tony', 'Holden', 'Reid', 'Abel', 'Bennett', 'Zackary', 'Arthur', 'Nehemiah', 'Ricky', 'Esteban', 'Cruz', 'Finn', 'Mauricio', 'Dennis', 'Keaton', 'Albert', 'Marvin', 'Mathew', 'Larry', 'Moises', 'Issac', 'Philip', 'Quentin', 'Curtis', 'Greyson', 'Jameson', 'Everett', 'Jayce', 'Darren', 'Elliott', 'Uriel', 'Alfredo', 'Hugo', 'Alec', 'Jamari', 'Marshall', 'Walter', 'Judah', 'Jay', 'Lance', 'Beau', 'Ali', 'Landyn', 'Yahir', 'Phoenix', 'Nickolas', 'Kobe', 'Bryant', 'Maurice', 'Russell', 'Leland', 'Colten', 'Reed', 'Davis', 'Joe', 'Ernesto', 'Desmond', 'Kade', 'Reece', 'Morgan', 'Ramon', 'Rocco', 'Orlando', 'Ryker', 'Brodie', 'Paxton', 'Jacoby', 'Douglas', 'Kristopher', 'Gary', 'Lawrence', 'Izaiah', 'Solomon', 'Nikolas', 'Mekhi', 'Justice', 'Tate', 'Jaydon', 'Salvador', 'Shaun', 'Alvin', 'Eddie', 'Kane', 'Davion', 'Zachariah', 'Dorian', 'Titus', 'Kellen', 'Camron', 'Isiah', 'Javon', 'Nasir', 'Milo', 'Johan', 'Byron', 'Jasper', 'Jonathon', 'Chad', 'Marc', 'Kelvin', 'Chandler', 'Sam', 'Cory', 'Deandre', 'River', 'Reese', 'Roger', 'Quinton', 'Talon', 'Romeo', 'Franklin', 'Noel', 'Alijah', 'Guillermo', 'Gunner', 'Damon', 'Jadon', 'Emerson', 'Micheal', 'Bruce', 'Terry', 'Kolton', 'Melvin', 'Beckett', 'Porter', 'August', 'Brycen', 'Dayton', 'Jamarion', 'Leonel', 'Karson', 'Zayden', 'Keagan', 'Carl', 'Khalil', 'Cristopher', 'Nelson', 'Braiden', 'Moses', 'Isaias', 'Roy', 'Triston', 'Walker', 'Kale', 'Jermaine', 'Leon', 'Rodney', 'Kristian', 'Mohamed', 'Ronan', 'Pierce', 'Trace', 'Warren', 'Jeffery', 'Maverick', 'Cyrus', 'Quincy', 'Nathanael', 'Skylar', 'Tommy', 'Conor', 'Noe', 'Ezequiel', 'Demetrius', 'Jaylin', 'Kendrick', 'Frederick', 'Terrance', 'Bobby', 'Jamison', 'Jon', 'Rohan', 'Jett', 'Kieran', 'Tobias', 'Ari', 'Colt', 'Gideon', 'Felipe', 'Kenny', 'Wilson', 'Orion', 'Kamari', 'Gunnar', 'Jessie', 'Alonzo', 'Gianni', 'Omari', 'Waylon', 'Malcolm', 'Emmett', 'Abram', 'Julien', 'London', 'Tomas', 'Allan', 'Terrell', 'Matteo', 'Tristin', 'Jairo', 'Reginald', 'Brent', 'Ahmad', 'Yandel', 'Rene', 'Willie', 'Boston', 'Billy', 'Marlon', 'Trevon', 'Aydan', 'Jamal', 'Aldo', 'Ariel', 'Cason', 'Braylen', 'Javion', 'Joey', 'Rogelio', 'Ahmed', 'Dominik', 'Brendon', 'Toby', 'Kody', 'Marquis', 'Ulises', 'Armani', 'Adriel', 'Alfonso', 'Branden', 'Will', 'Craig', 'Ibrahim', 'Osvaldo', 'Wade', 'Harley', 'Steve', 'Davin', 'Deshawn', 'Kason', 'Damion', 'Jaylon', 'Jefferson', 'Aron', 'Brooks', 'Darian', 'Gerald', 'Rolando', 'Terrence', 'Enzo', 'Kian', 'Ryland', 'Barrett', 'Jaeden', 'Ben', 'Bradyn', 'Giovani', 'Blaine', 'Madden', 'Jerome', 'Muhammad', 'Ronnie', 'Layne', 'Kolby', 'Leonard', 'Vicente', 'Cale', 'Alessandro', 'Zachery', 'Gavyn', 'Aydin', 'Xzavier', 'Malakai', 'Raphael', 'Cannon', 'Rudy', 'Asa', 'Darrell', 'Giancarlo', 'Elisha', 'Junior', 'Zackery', 'Alvaro', 'Lewis', 'Valentin', 'Deacon', 'Jase', 'Harry', 'Kendall', 'Rashad', 'Finnegan', 'Mohammed', 'Ramiro', 'Cedric', 'Brennen', 'Santino', 'Stanley', 'Tyrone', 'Chace', 'Francis', 'Johnathon', 'Teagan', 'Zechariah', 'Alonso', 'Kaeden', 'Kamden', 'Gilberto', 'Ray', 'Karter', 'Luciano', 'Nico', 'Kole', 'Aryan', 'Draven', 'Jamie', 'Misael', 'Lee', 'Alexzander', 'Camren', 'Giovanny', 'Amare', 'Rhett', 'Rhys', 'Rodolfo', 'Nash', 'Markus', 'Deven', 'Mohammad', 'Moshe', 'Quintin', 'Dwayne', 'Memphis', 'Atticus', 'Davian', 'Eugene', 'Jax', 'Antoine', 'Wayne', 'Randall', 'Semaj', 'Uriah', 'Clark', 'Aidyn', 'Jorden', 'Maxim', 'Aditya', 'Lawson', 'Messiah', 'Korbin', 'Sullivan', 'Freddy', 'Demarcus', 'Neil', 'Brice', 'King', 'Davon', 'Elvis', 'Ace', 'Dexter', 'Heath', 'Duncan', 'Jamar', 'Sincere', 'Irvin', 'Remington', 'Kadin', 'Soren', 'Tyree', 'Damarion', 'Talan', 'Adrien', 'Gilbert', 'Keenan', 'Darnell', 'Adolfo', 'Tristian', 'Derick', 'Isai', 'Rylee', 'Gauge', 'Harold', 'Kareem', 'Deangelo', 'Agustin', 'Coleman', 'Zavier', 'Lamar', 'Emery', 'Jaydin', 'Devan', 'Jordyn', 'Mathias', 'Prince', 'Sage', 'Seamus', 'Jasiah', 'Efrain', 'Darryl', 'Arjun', 'Mike', 'Roland', 'Conrad', 'Kamron', 'Hamza', 'Santos', 'Frankie', 'Dominique', 'Marley', 'Vance', 'Dax', 'Jamir', 'Kylan', 'Todd', 'Maximo', 'Jabari', 'Matthias', 'Haiden', 'Luka', 'Marcelo', 'Keon', 'Layton', 'Tyrell', 'Kash', 'Raiden', 'Cullen', 'Donte', 'Jovani', 'Cordell', 'Kasen', 'Rory', 'Alfred', 'Darwin', 'Ernest', 'Bailey', 'Gaige', 'Hassan', 'Jamarcus', 'Killian', 'Augustus', 'Trevin', 'Zain', 'Ellis', 'Rex', 'Yusuf', 'Bruno', 'Jaidyn', 'Justus', 'Ronin', 'Humberto', 'Jaquan', 'Josh', 'Kasey', 'Winston', 'Dashawn', 'Lucian', 'Matias', 'Sidney', 'Ignacio', 'Nigel', 'Van', 'Elian', 'Finley', 'Jaron', 'Addison', 'Aedan', 'Braedon', 'Jadyn', 'Konner', 'Zayne', 'Franco', 'Niko', 'Savion', 'Cristofer', 'Deon', 'Krish', 'Anton', 'Brogan', 'Cael', 'Coby', 'Kymani', 'Marcel', 'Yair', 'Dale', 'Bo', 'Jordon', 'Samir', 'Darien', 'Zaire', 'Ross', 'Vaughn', 'Devyn', 'Kenyon', 'Clay', 'Dario', 'Ishaan', 'Jair', 'Kael', 'Adonis', 'Jovanny', 'Clinton', 'Rey', 'Chaim', 'German', 'Harper', 'Nathen', 'Rigoberto', 'Sonny', 'Glenn', 'Octavio', 'Blaze', 'Keshawn', 'Ralph', 'Ean', 'Nikhil', 'Rayan', 'Sterling', 'Branson', 'Jadiel', 'Dillan', 'Jeramiah', 'Koen', 'Konnor', 'Antwan', 'Houston', 'Tyrese', 'Dereon', 'Leonidas', 'Zack', 'Fisher', 'Jaydan', 'Quinten', 'Nick', 'Urijah', 'Darion', 'Jovan', 'Salvatore', 'Beckham', 'Jarrett', 'Antony', 'Eden', 'Makai', 'Zaiden', 'Broderick', 'Camryn', 'Malaki', 'Nikolai', 'Howard', 'Immanuel', 'Demarion', 'Valentino', 'Jovanni', 'Ayaan', 'Ethen', 'Leandro', 'Royce', 'Yael', 'Yosef', 'Jean', 'Marquise', 'Alden', 'Leroy', 'Gaven', 'Jovany', 'Tyshawn', 'Aarav', 'Kadyn', 'Milton', 'Zaid', 'Kelton', 'Tripp', 'Kamren', 'Slade', 'Hezekiah', 'Jakobe', 'Nathanial', 'Rishi', 'Shamar', 'Geovanni', 'Pranav', 'Roderick', 'Bentley', 'Clarence', 'Lyric', 'Bernard', 'Carmelo', 'Denzel', 'Maximillian', 'Reynaldo', 'Cassius', 'Gordon', 'Reuben', 'Samson', 'Yadiel', 'Jayvon', 'Reilly', 'Sheldon', 'Abdullah', 'Jagger', 'Thaddeus', 'Case', 'Kyson', 'Lamont', 'Chaz', 'Makhi', 'Jan', 'Marques', 'Oswaldo', 'Donavan', 'Keyon', 'Kyan', 'Simeon', 'Trystan', 'Andreas', 'Dangelo', 'Landin', 'Reagan', 'Turner', 'Arnav', 'Brenton', 'Callum', 'Jayvion', 'Bridger', 'Sammy', 'Deegan', 'Jaylan', 'Lennon', 'Odin', 'Abdiel', 'Jerimiah', 'Eliezer', 'Bronson', 'Cornelius', 'Pierre', 'Cortez', 'Baron', 'Carlo', 'Carsen', 'Fletcher', 'Izayah', 'Kolten', 'Damari', 'Hugh', 'Jensen', 'Yurem'];
const LAST_NAME = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher', 'Henderson', 'Coleman', 'Simmons', 'Patterson', 'Jordan', 'Reynolds', 'Hamilton', 'Graham', 'Kim', 'Gonzales', 'Alexander', 'Ramos', 'Wallace', 'Griffin', 'West', 'Cole', 'Hayes', 'Chavez', 'Gibson', 'Bryant', 'Ellis', 'Stevens', 'Murray', 'Ford', 'Marshall', 'Owens', 'Mcdonald', 'Harrison', 'Ruiz', 'Kennedy', 'Wells', 'Alvarez', 'Woods', 'Mendoza', 'Castillo', 'Olson', 'Webb', 'Washington', 'Tucker', 'Freeman', 'Burns', 'Henry', 'Vasquez', 'Snyder', 'Simpson', 'Crawford', 'Jimenez', 'Porter', 'Mason', 'Shaw', 'Gordon', 'Wagner', 'Hunter', 'Romero', 'Hicks', 'Dixon', 'Hunt', 'Palmer', 'Robertson', 'Black', 'Holmes', 'Stone', 'Meyer', 'Boyd', 'Mills', 'Warren', 'Fox', 'Rose', 'Rice', 'Moreno', 'Schmidt', 'Patel', 'Ferguson', 'Nichols', 'Herrera', 'Medina', 'Ryan', 'Fernandez', 'Weaver', 'Daniels', 'Stephens', 'Gardner', 'Payne', 'Kelley', 'Dunn', 'Pierce', 'Arnold', 'Tran', 'Spencer', 'Peters', 'Hawkins', 'Grant', 'Hansen', 'Castro', 'Hoffman', 'Hart', 'Elliott', 'Cunningham', 'Knight', 'Bradley', 'Carroll', 'Hudson', 'Duncan', 'Armstrong', 'Berry', 'Andrews', 'Johnston', 'Ray', 'Lane', 'Riley', 'Carpenter', 'Perkins', 'Aguilar', 'Silva', 'Richards', 'Willis', 'Matthews', 'Chapman', 'Lawrence', 'Garza', 'Vargas', 'Watkins', 'Wheeler', 'Larson', 'Carlson', 'Harper', 'George', 'Greene', 'Burke', 'Guzman', 'Morrison', 'Munoz', 'Jacobs', 'Obrien', 'Lawson', 'Franklin', 'Lynch', 'Bishop', 'Carr', 'Salazar', 'Austin', 'Mendez', 'Gilbert', 'Jensen', 'Williamson', 'Montgomery', 'Harvey', 'Oliver', 'Howell', 'Dean', 'Hanson', 'Weber', 'Garrett', 'Sims', 'Burton', 'Fuller', 'Soto', 'Mccoy', 'Welch', 'Chen', 'Schultz', 'Walters', 'Reid', 'Fields', 'Walsh', 'Little', 'Fowler', 'Bowman', 'Davidson', 'May', 'Day', 'Schneider', 'Newman', 'Brewer', 'Lucas', 'Holland', 'Wong', 'Banks', 'Santos', 'Curtis', 'Pearson', 'Delgado', 'Valdez', 'Pena', 'Rios', 'Douglas', 'Sandoval', 'Barrett', 'Hopkins', 'Keller', 'Guerrero', 'Stanley', 'Bates', 'Alvarado', 'Beck', 'Ortega', 'Wade', 'Estrada', 'Contreras', 'Barnett', 'Caldwell', 'Santiago', 'Lambert', 'Powers', 'Chambers', 'Nunez', 'Craig', 'Leonard', 'Lowe', 'Rhodes', 'Byrd', 'Gregory', 'Shelton', 'Frazier', 'Becker', 'Maldonado', 'Fleming', 'Vega', 'Sutton', 'Cohen', 'Jennings', 'Parks', 'Mcdaniel', 'Watts', 'Barker', 'Norris', 'Vaughn', 'Vazquez', 'Holt', 'Schwartz', 'Steele', 'Benson', 'Neal', 'Dominguez', 'Horton', 'Terry', 'Wolfe', 'Hale', 'Lyons', 'Graves', 'Haynes', 'Miles', 'Park', 'Warner', 'Padilla', 'Bush', 'Thornton', 'Mccarthy', 'Mann', 'Zimmerman', 'Erickson', 'Fletcher', 'Mckinney', 'Page', 'Dawson', 'Joseph', 'Marquez', 'Reeves', 'Klein', 'Espinoza', 'Baldwin', 'Moran', 'Love', 'Robbins', 'Higgins', 'Ball', 'Cortez', 'Le', 'Griffith', 'Bowen', 'Sharp', 'Cummings', 'Ramsey', 'Hardy', 'Swanson', 'Barber', 'Acosta', 'Luna', 'Chandler', 'Blair', 'Daniel', 'Cross', 'Simon', 'Dennis', 'Oconnor', 'Quinn', 'Gross', 'Navarro', 'Moss', 'Fitzgerald', 'Doyle', 'Mclaughlin', 'Rojas', 'Rodgers', 'Stevenson', 'Singh', 'Yang', 'Figueroa', 'Harmon', 'Newton', 'Paul', 'Manning', 'Garner', 'Mcgee', 'Reese', 'Francis', 'Burgess', 'Adkins', 'Goodman', 'Curry', 'Brady', 'Christensen', 'Potter', 'Walton', 'Goodwin', 'Mullins', 'Molina', 'Webster', 'Fischer', 'Campos', 'Avila', 'Sherman', 'Todd', 'Chang', 'Blake', 'Malone', 'Wolf', 'Hodges', 'Juarez', 'Gill', 'Farmer', 'Hines', 'Gallagher', 'Duran', 'Hubbard', 'Cannon', 'Miranda', 'Wang', 'Saunders', 'Tate', 'Mack', 'Hammond', 'Carrillo', 'Townsend', 'Wise', 'Ingram', 'Barton', 'Mejia', 'Ayala', 'Schroeder', 'Hampton', 'Rowe', 'Parsons', 'Frank', 'Waters', 'Strickland', 'Osborne', 'Maxwell', 'Chan', 'Deleon', 'Norman', 'Harrington', 'Casey', 'Patton', 'Logan', 'Bowers', 'Mueller', 'Glover', 'Floyd', 'Hartman', 'Buchanan', 'Cobb', 'French', 'Kramer', 'Mccormick', 'Clarke', 'Tyler', 'Gibbs', 'Moody', 'Conner', 'Sparks', 'Mcguire', 'Leon', 'Bauer', 'Norton', 'Pope', 'Flynn', 'Hogan', 'Robles', 'Salinas', 'Yates', 'Lindsey', 'Lloyd', 'Marsh', 'Mcbride', 'Owen', 'Solis', 'Pham', 'Lang', 'Pratt', 'Lara', 'Brock', 'Ballard', 'Trujillo', 'Shaffer', 'Drake', 'Roman', 'Aguirre', 'Morton', 'Stokes', 'Lamb', 'Pacheco', 'Patrick', 'Cochran', 'Shepherd', 'Cain', 'Burnett', 'Hess', 'Li', 'Cervantes', 'Olsen', 'Briggs', 'Ochoa', 'Cabrera', 'Velasquez', 'Montoya', 'Roth', 'Meyers', 'Cardenas', 'Fuentes', 'Weiss', 'Hoover', 'Wilkins', 'Nicholson', 'Underwood', 'Short', 'Carson', 'Morrow', 'Colon', 'Holloway', 'Summers', 'Bryan', 'Petersen', 'Mckenzie', 'Serrano', 'Wilcox', 'Carey', 'Clayton', 'Poole', 'Calderon', 'Gallegos', 'Greer', 'Rivas', 'Guerra', 'Decker', 'Collier', 'Wall', 'Whitaker', 'Bass', 'Flowers', 'Davenport', 'Conley', 'Houston', 'Huff', 'Copeland', 'Hood', 'Monroe', 'Massey', 'Roberson', 'Combs', 'Franco', 'Larsen', 'Pittman', 'Randall', 'Skinner', 'Wilkinson', 'Kirby', 'Cameron', 'Bridges', 'Anthony', 'Richard', 'Kirk', 'Bruce', 'Singleton', 'Mathis', 'Bradford', 'Boone', 'Abbott', 'Charles', 'Allison', 'Sweeney', 'Atkinson', 'Horn', 'Jefferson', 'Rosales', 'York', 'Christian', 'Phelps', 'Farrell', 'Castaneda', 'Nash', 'Dickerson', 'Bond', 'Wyatt', 'Foley', 'Chase', 'Gates', 'Vincent', 'Mathews', 'Hodge', 'Garrison', 'Trevino', 'Villarreal', 'Heath', 'Dalton', 'Valencia', 'Callahan', 'Hensley', 'Atkins', 'Huffman', 'Roy', 'Boyer', 'Shields', 'Lin', 'Hancock', 'Grimes', 'Glenn', 'Cline', 'Delacruz', 'Camacho', 'Dillon', 'Parrish', 'Oneill', 'Melton', 'Booth', 'Kane', 'Berg', 'Harrell', 'Pitts', 'Savage', 'Wiggins', 'Brennan', 'Salas', 'Marks', 'Russo', 'Sawyer', 'Baxter', 'Golden', 'Hutchinson', 'Liu', 'Walter', 'Mcdowell', 'Wiley', 'Rich', 'Humphrey', 'Johns', 'Koch', 'Suarez', 'Hobbs', 'Beard', 'Gilmore', 'Ibarra', 'Keith', 'Macias', 'Khan', 'Andrade', 'Ware', 'Stephenson', 'Henson', 'Wilkerson', 'Dyer', 'Mcclure', 'Blackwell', 'Mercado', 'Tanner', 'Eaton', 'Clay', 'Barron', 'Beasley', 'Oneal', 'Preston', 'Small', 'Wu', 'Zamora', 'Macdonald', 'Vance', 'Snow', 'Mcclain', 'Stafford', 'Orozco', 'Barry', 'English', 'Shannon', 'Kline', 'Jacobson', 'Woodard', 'Huang', 'Kemp', 'Mosley', 'Prince', 'Merritt', 'Hurst', 'Villanueva', 'Roach', 'Nolan', 'Lam', 'Yoder', 'Mccullough', 'Lester', 'Santana', 'Valenzuela', 'Winters', 'Barrera', 'Leach', 'Orr', 'Berger', 'Mckee', 'Strong', 'Conway', 'Stein', 'Whitehead', 'Bullock', 'Escobar', 'Knox', 'Meadows', 'Solomon', 'Velez', 'Odonnell', 'Kerr', 'Stout', 'Blankenship', 'Browning', 'Kent', 'Lozano', 'Bartlett', 'Pruitt', 'Buck', 'Barr', 'Gaines', 'Durham', 'Gentry', 'Mcintyre', 'Sloan', 'Melendez', 'Rocha', 'Herman', 'Sexton', 'Moon', 'Hendricks', 'Rangel', 'Stark', 'Lowery', 'Hardin', 'Hull', 'Sellers', 'Ellison', 'Calhoun', 'Gillespie', 'Mora', 'Knapp', 'Mccall', 'Morse', 'Dorsey', 'Weeks', 'Nielsen', 'Livingston', 'Leblanc', 'Mclean', 'Bradshaw', 'Glass', 'Middleton', 'Buckley', 'Schaefer', 'Frost', 'Howe', 'House', 'Mcintosh', 'Ho', 'Pennington', 'Reilly', 'Hebert', 'Mcfarland', 'Hickman', 'Noble', 'Spears', 'Conrad', 'Arias', 'Galvan', 'Velazquez', 'Huynh', 'Frederick', 'Randolph', 'Cantu', 'Fitzpatrick', 'Mahoney', 'Peck', 'Villa', 'Michael', 'Donovan', 'Mcconnell', 'Walls', 'Boyle', 'Mayer', 'Zuniga', 'Giles', 'Pineda', 'Pace', 'Hurley', 'Mays', 'Mcmillan', 'Crosby', 'Ayers', 'Case', 'Bentley', 'Shepard', 'Everett', 'Pugh', 'David', 'Mcmahon', 'Dunlap', 'Bender', 'Hahn', 'Harding', 'Acevedo', 'Raymond', 'Blackburn', 'Duffy', 'Landry', 'Dougherty', 'Bautista', 'Shah', 'Potts', 'Arroyo', 'Valentine', 'Meza', 'Gould', 'Vaughan', 'Fry', 'Rush', 'Avery', 'Herring', 'Dodson', 'Clements', 'Sampson', 'Tapia', 'Bean', 'Lynn', 'Crane', 'Farley', 'Cisneros', 'Benton', 'Ashley', 'Mckay', 'Finley', 'Best', 'Blevins', 'Friedman', 'Moses', 'Sosa', 'Blanchard', 'Huber', 'Frye', 'Krueger', 'Bernard', 'Rosario', 'Rubio', 'Mullen', 'Benjamin', 'Haley', 'Chung', 'Moyer', 'Choi', 'Horne', 'Yu', 'Woodward', 'Ali', 'Nixon', 'Hayden', 'Rivers', 'Estes', 'Mccarty', 'Richmond', 'Stuart', 'Maynard', 'Brandt', 'Oconnell', 'Hanna', 'Sanford', 'Sheppard', 'Church', 'Burch', 'Levy', 'Rasmussen', 'Coffey', 'Ponce', 'Faulkner', 'Donaldson', 'Schmitt', 'Novak', 'Costa', 'Montes', 'Booker', 'Cordova', 'Waller', 'Arellano', 'Maddox', 'Mata', 'Bonilla', 'Stanton', 'Compton', 'Kaufman', 'Dudley', 'Mcpherson', 'Beltran', 'Dickson', 'Mccann', 'Villegas', 'Proctor', 'Hester', 'Cantrell', 'Daugherty', 'Cherry', 'Bray', 'Davila', 'Rowland', 'Levine', 'Madden', 'Spence', 'Good', 'Irwin', 'Werner', 'Krause', 'Petty', 'Whitney', 'Baird', 'Hooper', 'Pollard', 'Zavala', 'Jarvis', 'Holden', 'Haas', 'Hendrix', 'Mcgrath', 'Bird', 'Lucero', 'Terrell', 'Riggs', 'Joyce', 'Mercer', 'Rollins', 'Galloway', 'Duke', 'Odom', 'Andersen', 'Downs', 'Hatfield', 'Benitez', 'Archer', 'Huerta', 'Travis', 'Mcneil', 'Hinton', 'Zhang', 'Hays', 'Mayo', 'Fritz', 'Branch', 'Mooney', 'Ewing', 'Ritter', 'Esparza', 'Frey', 'Braun', 'Gay', 'Riddle', 'Haney', 'Kaiser', 'Holder', 'Chaney', 'Mcknight', 'Gamble', 'Vang', 'Cooley', 'Carney', 'Cowan', 'Forbes', 'Ferrell', 'Davies', 'Barajas', 'Shea', 'Osborn', 'Bright', 'Cuevas', 'Bolton', 'Murillo', 'Lutz', 'Duarte', 'Kidd', 'Key', 'Cooke'];

new MainClass().start();

/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap.min.css">
    <title>Index.html</title>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-1">
        </div>
        <div class="col-10">
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            League Table
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <table class="table table-sm">
                                <thead>
                                <tr>
                                    <th scope="col">Season</th>
                                    <th scope="col">Division</th>
                                    <th scope="col">Rank</th>
                                    <th scope="col">TeamName</th>
                                    <th scope="col">TeamId</th>
                                    <th scope="col">Game</th>
                                    <th scope="col">Won</th>
                                    <th scope="col">Draw</th>
                                    <th scope="col">Lost</th>
                                    <th scope="col">GF</th>
                                    <th scope="col">GA</th>
                                    <th scope="col">GD</th>
                                    <th scope="col">Pts</th>
                                </tr>
                                </thead>
                                <tbody id="tableRow">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Fixtures
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="fixture"></div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Players
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <table class="table table-sm">
                                <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">teamId</th>
                                    <th scope="col">fullName</th>
                                    <th scope="col">age</th>
                                    <th scope="col">attack</th>
                                    <th scope="col">defence</th>
                                    <th scope="col">midfield</th>
                                    <th scope="col">wage</th>
                                </tr>
                                </thead>
                                <tbody id="players">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFour">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Teams
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <table class="table table-sm">
                                <thead>
                                <tr>
                                    <th scope="col">TeamId</th>
                                    <th scope="col">TeamName</th>
                                    <th scope="col">Midfield</th>
                                    <th scope="col">Attack</th>
                                    <th scope="col">Defence</th>
                                    <th scope="col">Budget</th>
                                    <th scope="col">Player Count</th>
                                </tr>
                                </thead>
                                <tbody id="teams">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-1">
        </div>
    </div>
</div>
<script src="bootstrap.bundle.min.js"></script>
<script src="main.js"></script>
</body>
</html>
*/

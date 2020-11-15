class Engine {
    teams: Array<Team> = [];
    players: Array<Player> = [];
    sellList: Array<Player> = [];
    year: number;

    constructor() {
        this.year = 2000;
        for (let i = 0; i < 8; i++) {
            const tmpTm = new Team(i.toString(2), 'TEAM' + i);
            for (let j = 0; j < 11; j++) {
                const age = Math.floor(Math.random() * 17) + 18;
                const id = this.players.length + 1;
                const tmpPl = new Player(id.toString(2), `Player${id}`, tmpTm.id, this.year - age);
                this.players.push(tmpPl);
            }
            this.teams.push(tmpTm);
        }
        console.table(this.teams);
        console.table(this.players);
    }

    aging() {
        this.year += 1;
        this.addHistory();
        this.addPrize();
        this.transfer();
    }

    addPrize() {
        this.teams.forEach(x => {
            this.players.filter(y => y.teamId === x.id).forEach(z => {
                x.price -= Math.floor(z.price / 20);
            });
            x.price += 50000;
        });
    }

    addHistory() {
        this.players.forEach(x => {
            x.histories.push(new PlayerHistory(this.year, x.teamId));
        });
    }

    private transfer() {
        const log = [];
        for (let i = 0; i < 5; i++) {
            const tmpId = (this.players.length + 1);
            const newPlayer = new Player(tmpId.toString(2), 'Player' + tmpId, '', this.year - 18);
            this.players.push(newPlayer);
        }
        for (let i = 0; i < this.teams.length; i++) {
            const tmpPlayers = this.players.filter(x => x.teamId === this.teams[i].id);
            const cntSellPlayerRnd = Math.floor(Math.random() * 3) + 1;
            for (let j = 0; j < cntSellPlayerRnd; j++) {
                const index = Math.floor(Math.random() * tmpPlayers.length);
                if (this.sellList.findIndex(x => x.id === tmpPlayers[index].id) === -1) {
                    this.sellList.push(tmpPlayers[index]);
                    tmpPlayers[index].calculatePrice(this.year);
                }
            }
        }
        this.sellList.push(...this.players.filter(x => x.teamId === ''));
        console.log('Transfer Market Size = ' + this.sellList.length);
        let tryCounter = 0;
        while (this.sellList.length > 0) {
            const tmIndex = Math.floor(Math.random() * this.teams.length);
            const plIndex = Math.floor(Math.random() * this.sellList.length);
            const newTeam = this.teams[tmIndex];
            const oldTeam = this.teams.filter(x => x.id === this.sellList[plIndex].teamId)[0];
            if (newTeam.id !== this.sellList[plIndex].teamId && newTeam.price >= newTeam.transferManager * 50000) {
                log.push(`${this.sellList[plIndex].fullName} MOVE From ${oldTeam?.name} To ${newTeam.name}`);
                newTeam.price -= this.sellList[plIndex].price;
                if (oldTeam != null) {
                    oldTeam.price += this.sellList[plIndex].price;
                }
                this.sellList[plIndex].teamId = newTeam.id;
                this.sellList[plIndex].histories[this.sellList[plIndex].histories.length - 1].teamId = newTeam.id;
                this.sellList.splice(plIndex, 1);
                tryCounter = 0;
            }
            tryCounter += 1;
            if (tryCounter > 10) {
                this.sellList = [];
            }
        }
        console.table(log);
        console.table(this.teams);
        console.table(this.players);

    }


}

class Team {
    id: string;
    name: string;
    price: number;
    transferManager: number;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.price = 0;
        this.transferManager = Math.floor(Math.random() * 5);
    }
}

class Player {
    id: string;
    fullName: string;
    birth: number;
    attributesName: string[] = [
        'dribbling',
        'finishing',
        'heading',
        'passing',
        'tackling',
        'aggression',
        'bravery',
        'creativity',
        'jumping',
        'pace',
        'stamina',
    ];
    attributes: number[] = [];
    overall: number;
    teamId: string;
    price: number;
    histories: Array<PlayerHistory> = [];

    constructor(id: string, name: string, teamId: string, birth: number) {
        this.id = id;
        this.fullName = name;
        this.birth = birth;
        this.teamId = teamId;
        this.overall = 0;
        this.attributesName.forEach(x => {
            const value = Math.random() * 90;
            this.overall += value;
            this.attributes.push(value);
        });
        this.overall = Math.round(this.overall / this.attributesName.length);
        this.calculatePrice(2000);
        this.histories.push(new PlayerHistory(2000, teamId));
    }

    calculatePrice(year) {
        this.price = Math.round((this.overall * 1000) * (29 / Math.abs(this.birth - year)));
    }
}

class PlayerHistory {
    year: number;
    teamId: string;

    constructor(year: number, teamId: string) {
        this.year = year;
        this.teamId = teamId;
    }
}

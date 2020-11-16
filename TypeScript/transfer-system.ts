export class Engine {
    private teams: Array<Team> = [];
    private players: Array<Player> = [];
    private retiredPlayers: Array<Player> = [];
    private sellList: Array<Player> = [];
    public year: number;

    constructor() {
        this.year = 2000;
        for (let i = 0; i < 8; i++) {
            const tmpTm = new Team(IdGenerator.getId(), TeamNames[i]);
            for (let j = 0; j < 11; j++) {
                const age = Math.floor(Math.random() * 17) + 18;
                const tmpPl = new Player(IdGenerator.getId(), NameGenerator.getFullName(), tmpTm.id, this.year - age, this.year);
                this.players.push(tmpPl);
            }
            this.teams.push(tmpTm);
        }
    }

    public aging() {
        this.year += 1;
        this.removeRetiredPlayer();
        this.addHistory();
        this.addPrize();
        this.transfer();
    }

    private removeRetiredPlayer() {
        const removeIndex = [];
        this.players.forEach((x, index) => {
            if (this.year - x.birth > 37) {
                this.retiredPlayers.push(x);
                removeIndex.push(index);
            }
        });
        console.log(removeIndex.length, this.players.length);
        let indexOffset = 0;
        removeIndex.forEach(x => {
            this.players.splice(x - indexOffset, 1);
            indexOffset += 1;
        });
        console.log(removeIndex.length, this.players.length);
        console.table(this.retiredPlayers);
    }

    private addPrize() {
        this.teams.forEach(x => {
            this.players.filter(y => y.teamId === x.id).forEach(z => {
                x.price -= Math.floor(z.price / 20);
            });
            x.price += 50000;
        });
    }

    private addHistory() {
        this.players.forEach(x => {
            x.histories.push(new PlayerHistory(this.year, x.teamId));
        });
    }

    private transfer() {
        const log = [];
        // Add young player per team
        for (let i = 0; i < this.teams.length; i++) {
            const tmpId = (this.players.length + 1);
            const newPlayer = new Player(IdGenerator.getId(), NameGenerator.getFullName(), '', this.year - 18, this.year);
            this.players.push(newPlayer);
        }
        for (let i = 0; i < this.teams.length; i++) {
            const tmpPlayers = this.players.filter(x => x.teamId === this.teams[i].id);
            if (tmpPlayers.length > 0) {
                const cntSellPlayerRnd = Math.floor(Math.random() * 3) + 1;
                for (let j = 0; j < cntSellPlayerRnd; j++) {
                    const index = Math.floor(Math.random() * tmpPlayers.length);
                    if (this.sellList.findIndex(x => x.id === tmpPlayers[index].id) === -1) {
                        this.sellList.push(tmpPlayers[index]);
                        tmpPlayers[index].calculatePrice(this.year);
                    }
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
                const oldTeamName = oldTeam != null ? oldTeam.name : 'Free';
                log.push(`${this.sellList[plIndex].fullName} MOVE From ${oldTeamName} To ${newTeam.name}`);
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

export class Team {
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

export class Player {
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

    constructor(id: string, name: string, teamId: string, birth: number, year: number) {
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
        this.calculatePrice(year);
        this.histories.push(new PlayerHistory(year, teamId));
    }

    calculatePrice(year) {
        this.price = Math.round((this.overall * 1000) * (29 / Math.abs(this.birth - year)));
    }
}

export class PlayerHistory {
    year: number;
    teamId: string;

    constructor(year: number, teamId: string) {
        this.year = year;
        this.teamId = teamId;
    }
}

class NameGenerator {
    static FIRSTNAME = [
        'Abbas',
        'Akbar',
        'Ali',
        'AliReza',
        'Amin',
        'AmirReza',
        'Anooshirvan',
        'Arash',
        'Arman',
        'Arsalan',
        'Bagher',
        'Bahram',
        'Behnam',
        'Behrad',
        'Behrouz',
        'Benyamin',
        'Bijan',
        'Ebrahim',
        'Erfan',
        'Esfandiyar',
        'Esmaeel',
        'Faramarz',
        'Fariborz',
        'Farid',
        'Farrokh',
        'Farzad',
        'Fazel',
        'Ferdous',
        'Firooz',
        'Habib',
        'Hadi',
        'Hamed',
        'Hesam',
        'Heydar',
        'Homayoun',
        'Hooman',
        'Houshang',
        'Jahangir',
        'Kambiz',
        'Kamran',
        'Kannan',
        'Kazem',
        'Keyhan',
        'Keykavous',
        'Khashayar',
        'Kioumars',
        'Mahdi',
        'Mahyar',
        'Majid',
        'Mamad',
        'Mani',
        'Manouchehr',
        'Mehdi',
        'Mehran',
        'Moein',
        'MohammadReza',
        'Mojtaba',
        'Morteza',
        'Mostafa',
        'Nima',
        'Nouzar',
        'Parsa',
        'Payam',
        'Pejman',
        'Peyman',
        'Pouya',
        'Rasoul',
        'Rostam',
        'Sadeq',
        'Saeed',
        'Saman',
        'Sasan',
        'Sepand',
        'Shadmehr',
        'Siavash',
        'Taghi',
        'Vahid'
    ];

    static LASTNAME = [
        'Abbasi',
        'Afshani',
        'Afshar',
        'Ahangar',
        'Ahmadi',
        'Almasi',
        'Amini',
        'Askari',
        'Atlasi',
        'Bahadori',
        'Barbarz',
        'Behdad',
        'Bina',
        'Blourian',
        'Danesh',
        'Dara',
        'Dehghan',
        'Entezami',
        'Eskandari',
        'Faghih',
        'Foroutan',
        'Freydooni',
        'Ghaffari',
        'Golzar',
        'Haghighi',
        'Haghjoo',
        'Haghshenas',
        'Hajar',
        'Hashemi',
        'Hedayati',
        'Kashkouli',
        'Kaviani',
        'Keramati',
        'Khaledi',
        'Kianian',
        'Layegh',
        'Lorestani',
        'Mahmoodi',
        'Manesh',
        'Mashayekhi',
        'Mehrjoo',
        'Miri',
        'Mirzaii',
        'Moghadam',
        'Momeni',
        'Moshiri',
        'Mostofi',
        'Mozafari',
        'Najafi',
        'Nassirian',
        'Nassour',
        'Nazeri',
        'Nemati',
        'Nouzari',
        'Pahlevan',
        'Pasdar',
        'Poozesh',
        'Qaderi',
        'Qasemi',
        'Radish',
        'Raeisi',
        'Razavian',
        'Riahi',
        'Rouhani',
        'Sadiq',
        'Saharkhiz',
        'Salehi',
        'Sayyadi',
        'Shokoohi',
        'Soleymani',
        'Tabatabaii',
        'Tajik',
        'Tarokh',
        'Tavakoli',
        'Teymoori',
        'Vossoughi',
        'Zareii',
        'Zarqan'
    ];

    static getFullName() {
        return this.getFirstName() + ' ' + this.getLastName();
    }

    static getFirstName() {
        const rnd = Math.floor(Math.random() * this.FIRSTNAME.length);
        return this.FIRSTNAME[rnd];
    }

    static getLastName() {
        const rnd = Math.floor(Math.random() * this.LASTNAME.length);
        return this.LASTNAME[rnd];
    }
}

class IdGenerator {
    private static lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    private static upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private static numbers = '0123456789';

    static getId() {
        const allLetters = this.lowerAlphabet + this.upperAlphabet + this.numbers;
        let id = '';
        for (let i = 0; i < 8; i++) {
            const index = Math.floor(Math.random() * allLetters.length);
            id += allLetters[index];
        }
        return id;
    }
}

const TeamNames = [
    'Esteghlal',
    'Persepolis',
    'Sepahan',
    'Zob Ahan',
    'Foolad',
    'Saipa',
    'Tractor',
    'Saba Qom',
    'Paykan',
    'Malavan',
    'Fajr Sepasi',
    'Rah Ahan',
    'Naft Tehran',
    'Mes Kerman',
    'Aboomoslem',
    'Sanat Naft',
    'Esteghlal Ahvaz',
    'PAS Tehran',
    'Bargh Shiraz',
    'Damash',
    'Shahr Khodro',
    'Esteghlal Khuzestan',
    'Gostaresh Foulad',
    'PAS Hamedan',
    'Shahin Bushehr',
    'Pars Jonoubi Jam',
    'Naft Masjed Soleyman',
    'Steel Azin11',
    'Machine Sazi',
    'Nassaji Mazandaran',
    'Shamoushak Noshahr',
    'Siah Jamegan',
    'Shahrdari Tabriz',
    'Sepidrood',
    'Aluminium Hormozgan',
    'Payam',
    'Gol Gohar Sirjan',
    'Mes Sarcheshmeh',
    'Rahian Kermanshah',
    'Tarbiat Yazd',
    'Gahar Zagros',
    'Mes Rafsanjan',
    'Aluminium Arak'
];

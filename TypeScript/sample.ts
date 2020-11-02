class GameEngine {
    teams: Team[] = [];
    reports = [];

    generateTeam() {
        this.teams = []; // for reset other tournament
        for (let i = 0; i < RANKING.length; i++) {
            const overall = Math.floor(100 - (i * 1.5));
            this.teams.push(new Team(RANKING[i], overall));
        }
        console.log(JSON.stringify(this.teams));
    }

    init() {
        this.teams.sort(() => Math.random() - 0.5);
    }

    gameProcess() {
        RANKING = [];
        while (this.teams.length > 1) {
            const newTeams = [];
            let tmpReport = [];
            this.reports.push(`Cup 1/${this.teams.length / 2}`);
            for (let i = 0; i < this.teams.length / 2; i++) {
                tmpReport = [];
                const teamHome = this.teams[i];
                const teamAway = this.teams[this.teams.length - i - 1];
                const chanceHome = Math.floor(Math.random() * (teamHome.overall / 10)) + 2;
                const chanceAway = Math.floor(Math.random() * (teamAway.overall / 10)) + 2;

                let rndHome = 0;
                let rndAway = 0;
                for (let j = 0; j < chanceHome; j++) {
                    const playerSelect = Math.floor(Math.random() * teamHome.players.length);
                    if (teamHome.players[playerSelect] > teamAway.gk) {
                        rndHome += 1;
                    }
                    tmpReport.push(`------> PLAYER ${teamHome.players[playerSelect]} VS ${teamAway.gk} GK`);
                }
                for (let j = 0; j < chanceAway; j++) {
                    const playerSelect = Math.floor(Math.random() * teamAway.players.length);
                    if (teamAway.players[playerSelect] > teamHome.gk) {
                        rndAway += 1;
                    }
                    tmpReport.push(`------> GK ${teamHome.gk} VS ${teamAway.players[playerSelect]} PLAYER`);
                }

                if (rndHome > rndAway) {
                    newTeams.push(teamHome);
                    RANKING.unshift(teamAway.name);
                } else {
                    newTeams.push(teamAway);
                    RANKING.unshift(teamHome.name);
                }

                this.reports.push(`--> ${teamHome.name}(${teamHome.overall}) ` +
                    `[${chanceHome}]${rndHome}-${rndAway}[${chanceAway}]` +
                    ` (${teamAway.overall})${teamAway.name}`);
                this.reports.push(...tmpReport);
            }
            this.teams = newTeams;
        }
        RANKING.unshift(this.teams[0].name);
    }
}

class Team {
    gk: number;
    players: number[] = [];

    constructor(public name: string, public overall: number) {
        for (let i = 0; i < 10; i++) {
            this.players.push(Math.floor(Math.random() * 50) + 1);
        }
        this.gk = this.players.reduce((pv, cv, ci, arr) => {
            return pv + cv;
        }, 0);
        this.gk = Math.floor(this.gk / 10);
    }
}

let RANKING = [
    'Belgium',
    'France',
    'Brazil',
    'England',
    'Portugal',
    'Spain',
    'Uruguay',
    'Argentina',
    'Croatia',
    'Colombia',
    'Mexico',
    'Italy',
    'Denmark',
    'Germany',
    'Netherlands',
    'Switzerland',
    'Chile',
    'Poland',
    'Sweden',
    'Wales',
    'Senegal',
    'USA',
    'Ukraine',
    'Peru',
    'Austria',
    'Tunisia',
    'Japan',
    'Venezuela',
    'Iran',
    'Serbia',
    'Algeria',
    'Nigeria',
    'Turkey',
    'Russia',
    'Paraguay',
    'Republic of Ireland',
    'Slovakia',
    'Korea Republic',
    'Morocco',
    'Iceland',
    'Northern Ireland',
    'Australia',
    'Norway',
    'Romania',
    'Scotland',
    'Czech Republic',
    'Hungary',
    'Ghana',
    'Jamaica',
    'Costa Rica',
    'Bosnia',
    'Egypt',
    'Cameroon',
    'Greece',
    'Finland',
    'Mali',
    'Qatar',
    'Burkina Faso',
    'Congo DR',
    'Ecuador',
    'Côte Ivoire',
    'Slovenia',
    'Honduras',
    'Montenegro'
];



class Player {
    id: any;
    no: any;
    name: any;
    speed: any;
    kick: any;
    pass: any;
    dribble: any;
    stamina: any;
    accuracy: any;
    age: number;

    constructor() {
        this.build();
    }

    build() {
        this.age = random(20) + 18;
        this.id = generateId();
        this.no = random(99) + 1;
        this.speed = random(50);
        this.kick = random(50);
        this.pass = random(50);
        this.dribble = random(50);
        this.stamina = random(50);
        this.accuracy = random(50);
    }

    getOverall() {
        let sum = 0;
        sum += this.speed;
        sum += this.kick;
        sum += this.pass;
        sum += this.dribble;
        sum += this.stamina;
        sum += this.accuracy;
        return sum / 6;
    }
}

class Team {
    id: any;
    players: Player[] = [];
    name: any;
    overall: number;

    addPlayer(pl: Player) {
        this.players.push(pl);
    }
}


function generateId(): string {
    const lowerLetter = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    while (id.length < 10) {
        const type = random(3);
        if (type === 0) {
            const index = random(lowerLetter.length);
            id += lowerLetter[index];
        } else if (type === 1) {
            const index = random(upperCase.length);
            id += upperCase[index];
        } else if (type === 2) {
            const index = random(9);
            id += index;
        }
    }
    return id;
}

function random(until: number) {
    return Math.floor(Math.random() * until);
}



//-------------------------
greedy(n: string[], k: string[]) {
        let moving = 0;
        let index = this.select(n, k, 0);
        while (index !== -1) {
            moving += 1;
            index = this.select(n, k, index);
        }
        console.log(moving);
    }

    select(n: string[], k: string[], fromIndex) {
        let bestIndex = k.indexOf(n[0], fromIndex);
        for (const name of n) {
            const lastIndex = k.indexOf(name, fromIndex);
            if (bestIndex !== -1 && (lastIndex > bestIndex || lastIndex === -1)) {
                bestIndex = lastIndex;
            }
        }
        return bestIndex;
    }

func(n, k, arr) {
const minArray = [];
let index = 0;
for (let i = 1; i <= k; i++) {
    const subArray = [];
    for (let j = 0; j < i && index < n; j++) {
	subArray.push(arr[index++]);
    }
    minArray.push(Math.max(...subArray));
}
const subArr = minArray.splice(minArray.length - 1, 1);
for (let i = index; i < n; i++) {
    subArr.push(arr[i]);
}
minArray.push(Math.max(...subArr));
console.log(Math.min(...minArray));
}

bitMask(set: number[]) {
        const size = Math.pow(2, set.length);
        const res = [];
        for (let i = 0; i < size; i++) {
            const subSet = [];
            const bin = i.toString(2).split('').reverse().join('');
            for (let k = 0; k < set.length; k++) {
                if (bin[k] === '1') {
                    subSet.push(set[k]);
                }
            }
            res.push(subSet);
        }
        return res;
    }

    // A={1,2,3}
    // {} - {1,2,3} = 6
    // {1} - {2,3} = 4
    // {2} - {1,3} = 2
    // {3} - {1,2} = 0
    // {1,2} - {3} = 0
    // {1,3} - {2} = 2
    // {2,3} - {1} = 4
    // {1,2,3} - {} = 6
    private getDiff(set: number[], subsets: any[]) {
        let diff = -1;
        for (const subset of subsets) {
            let temp = 0;
            for (const elementSet of set) {
                let isExist = false;
                for (const st of subset) {
                    if (elementSet === st) {
                        temp += st;
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    temp -= elementSet;
                }
            }
            temp = Math.abs(temp);
            if (temp < diff || diff === -1) {
                diff = temp;
            }
        }
        return diff;
    }
class Collection {
    array = [];

    constructor(array: number[]) {
        this.array = array;
    }

    compareCollection(a: number[], b: number[]): boolean {
        if (this.convertToCode(a) === this.convertToCode(b)) {
            return true;
        }
        return false;
    }

    convertToCode(b: number[]): number {
        const newArray = [];
        let code = 0;
        for (const t of b) {
            let exist = false;
            for (let i = 0; i < this.array.length; i++) {
                if (this.array[i] === t) {
                    newArray.push(i);
                    exist = true;
                    break;
                }
            }
            if (exist === false) {
                return -1;
            }
        }
        for (const i of newArray) {
            code += Math.pow(2, i);
        }
        return code;
    }
}


function main(): void {
    const myArray = new MyArray(10, 20, 35, 100);

    myArray.forEach((value, index, array) => {
        console.log(`Index=${index}, Value=${value}, Array=${this.arrayToString(array)}`);
    });

    let tempArray = myArray.filter((item) => item % 2 === 0);
    console.log(tempArray);
    
    tempArray = myArray.map((item) => item * 3);
    console.log(tempArray);
}


subSets(set: number[], mSubSet: number[], k) {
        if (k === set.length) {
            console.log(mSubSet);
            return;
        }
        this.subSets(set, mSubSet.slice(0), k + 1);
        mSubSet.push(set[k]);
        this.subSets(set, mSubSet.slice(0), k + 1);
    }

    bitMaskSubsets(set: number[]) {
        const n = set.length;
        const size = Math.pow(2, n) - 1;
        for (let i = 0; i <= size; i++) {
            let result = '';
            for (let j = 0; j <= n - 1; j++) {
                const bin = i.toString(2).split('').reverse().join('');
                if (bin[j] === '1') {
                    result += set[j] + ', ';
                }
            }
            console.log(result);
        }
    }



   function myTest(n: number, index, result) {
        if (index > n) {
            console.log(result);
            return;
        }
        for (let i = 1; i <= n; i++) {
            this.myTest(n, index + 1, result + i + ' ');
        }
    }


// تصاعد حسابی
function arithmeticProgression(n, k, a: Array<number>) {
	let counter = 0;
	let newNums = [];
	for (let x = -100000; x <= 100000; x++) {
		let newCounter = 0;
		const temp = [];
		for (let i = 0; i < a.length; i++) {
			const newA = Math.abs(x + i * k - a[i]);
			newCounter += newA;
			temp.push(x + i * k);
		}
		if (counter === 0 || counter > newCounter) {
			counter = newCounter;
			newNums = [];
			newNums = temp;
		}
	}
	console.log(counter, newNums);
}

function goliland(n, q, happiness: Array<number>, dayTemperature: Array<number>) {
	for (let i = 0; i < q; i++) {
	    let sad = 0;
	    for (let j = 0; j < n; j++) {
		if (happiness[j] < dayTemperature[i]) {
		    sad += 1;
		}
	    }
	    console.log(sad);
	}
}

function traiangle(n: number) {
	const arr = [];
	for (let a = 1; a <= n; a++) {
	    for (let b = a; b <= n; b++) {
		const c = n - a - b;
		if (a + b > c && b <= c) {
		    arr.push({a, b, c});
		}
	    }
	}
	console.log(arr.length, arr);
}



function arrayToString(array: any[]): string {
    return `[${array.join(', ')}]`;
}

class MyArray {
    private arr: any[] = [];

    constructor(...args: any[]) {
        this.arr.push(...args);
    }

    setArray(arr: any[]): void {
        this.arr = [];
        this.arr.push(...arr);
    }

    getArray(): any[] {
        return this.arr;
    }

    forEach(callback: (value: any, index: number, array: any[]) => void): void {
        for (let i = 0; i < this.arr.length; i++) {
            callback(this.arr[i], i, this.arr);
        }
    }

    filter(callback: (item: any) => boolean): any[] {
        const newArr: any[] = [];
        for (const item of this.arr) {
            if (callback(item)) {
                newArr.push(item);
            }
        }
        return newArr;
    }

    map(callback: (item: any) => any): any[] {
        const newArr: any[] = [];
        for (const item of this.arr) {
            newArr.push(callback(item));
        }
        return newArr;
    }
}

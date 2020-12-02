history(commands: string[]) {
        let result = '';
        const stack = new Stack();
        for (let i = 0; i < commands.length; i++) {
            const split = commands[i].split(' ');
            switch (split[0]) {
                case 'insert': {
                    stack.push(result);
                    result = this.insertCommand(split, result);
                    break;
                }
                case 'delete': {
                    stack.push(result);
                    result = this.deleteCommad(split, result);
                    break;
                }
                case 'undo': {
                    result = stack.pop();
                    break;
                }
            }
        }
        console.log(result);
    }

insertCommand(split, result) {
        const index = parseInt(split[1], 10) - 1;
        const first = result.substr(0, index);
        const last = result.substr(index, result.length);
        return first + split[2] + last;
    }

    deleteCommad(split, result) {
        const index = parseInt(split[1], 10) - 1;
        const first = result.substr(0, index);
        const last = result.substr(index + 1, result.length);
        return first + last;
    }

export class MainComponent implements OnInit {

    players: Array<Player> = [];
    teamA = new Team();
    teamB = new Team();
    teamC = new Team();

    constructor() {
    }

    ngOnInit(): void {
        for (let i = 0; i < 1000; i++) {
            this.players.push(new Player());
        }
        this.players.sort((a, b) => b - a).forEach(x => {
            const playerPrice = (x.overall * 1000) * (29 / x.age);
            if (this.teamA.budget >= playerPrice) {
                x.teamId = this.teamA.id;
                this.teamA.budget -= x.overall * 1000;
            } else if (this.teamB.budget >= playerPrice) {
                x.teamId = this.teamB.id;
                this.teamB.budget -= x.overall * 1000;
            } else if (this.teamC.budget >= playerPrice) {
                x.teamId = this.teamC.id;
                this.teamC.budget -= x.overall * 1000;
            }
        });
        console.log(this.players.filter(x => x.teamId === this.teamA.id), this.teamA);
        console.log(this.players.filter(x => x.teamId === this.teamB.id), this.teamB);
        console.log(this.players.filter(x => x.teamId === this.teamC.id), this.teamC);
    }

    click() {
        const retiredId = [];
        this.players.forEach(x => {
            if (x.age < 29) {
                x.overall += 1;
            } else if (x.age > 30 && x.age <= 35) {
                x.overall -= 1;
            } else if (x.age > 35) {
                x.overall -= 2;
            }
            x.age += 1;
            if (x.overall <= 0) {
                retiredId.push(x.id);
                this.players.push(new Player());
            }
        });
        for (let i = 0; i < retiredId.length; i++) {
            const playerIndex = this.players.findIndex(x => x.id === retiredId[i]);
            this.players.splice(playerIndex, 1);
        }
        this.teamA.budget += 5000;
        this.teamB.budget += 5000;
        this.teamC.budget += 5000;

        this.transfer();

        console.log(this.players.filter(x => x.teamId === this.teamA.id), this.teamA);
        console.log(this.players.filter(x => x.teamId === this.teamB.id), this.teamB);
        console.log(this.players.filter(x => x.teamId === this.teamC.id), this.teamC);
    }

    transfer() {
        this.players.sort(() => .5 - Math.random());
        this.players.forEach(x => {
            const playerPrice = (x.overall * 1000) * (29 / x.age);
            if (x.teamId == null) {
                if (this.teamA.budget >= playerPrice) {
                    x.teamId = this.teamA.id;
                    this.teamA.budget -= x.overall * 1000;
                } else if (this.teamB.budget >= playerPrice) {
                    x.teamId = this.teamB.id;
                    this.teamB.budget -= x.overall * 1000;
                } else if (this.teamC.budget >= playerPrice) {
                    x.teamId = this.teamC.id;
                    this.teamC.budget -= x.overall * 1000;
                }
            }
        });
    }
}

class Team {
    id: number;
    name: string;
    budget: number;

    constructor() {
        this.id = generateId();
        this.budget = 100000;
    }
}

class Player {
    id: string;
    name: string;
    overall: number;
    age: number;
    teamId: number;

    constructor() {
        this.id = generateId();
        this.name = Name.getFullName();
        this.overall = Math.floor(Math.random() * 10) + 1;
        this.age = Math.floor(Math.random() * 20) + 18;
    }
}
///////////////////
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
                    if (teamHome.players[playerSelect].power > teamAway.gk) {
                        rndHome += 1;
                    }
                    tmpReport.push(`------> PLAYER NO'${teamHome.players[playerSelect].name} ${teamHome.players[playerSelect].power} VS ${teamAway.gk} GK`);
                }
                for (let j = 0; j < chanceAway; j++) {
                    const playerSelect = Math.floor(Math.random() * teamAway.players.length);
                    if (teamAway.players[playerSelect].power > teamHome.gk) {
                        rndAway += 1;
                    }
                    tmpReport.push(`------> GK ${teamHome.gk} VS ${teamAway.players[playerSelect].power} PLAYER NO'${teamAway.players[playerSelect].name}`);
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
    players: { power: number, name: string }[] = [];

    constructor(public name: string, public overall: number) {
        for (let i = 0; i < 10; i++) {
            const surname = NAMES[(Math.floor(Math.random() * NAMES.length))];
            this.players.push({power: (Math.floor(Math.random() * 50) + 1), name: surname});
        }
        this.gk = this.players.reduce((pv, cv, ci, arr) => {
            return pv + cv.power;
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

const NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez',
    'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson',
    'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker',
    'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams',
    'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans',
    'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen',
    'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell',
    'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett',
    'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross',
    'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes',
    'Fisher', 'Henderson', 'Coleman', 'Simmons', 'Patterson', 'Jordan', 'Reynolds', 'Hamilton', 'Graham',
    'Kim', 'Gonzales', 'Alexander', 'Ramos', 'Wallace', 'Griffin', 'West', 'Cole', 'Hayes', 'Chavez', 'Gibson',
    'Bryant', 'Ellis', 'Stevens', 'Murray', 'Ford', 'Marshall', 'Owens', 'Mcdonald', 'Harrison', 'Ruiz',
    'Kennedy', 'Wells', 'Alvarez', 'Woods', 'Mendoza', 'Castillo', 'Olson', 'Webb', 'Washington', 'Tucker',
    'Freeman', 'Burns', 'Henry', 'Vasquez', 'Snyder', 'Simpson', 'Crawford', 'Jimenez', 'Porter', 'Mason',
    'Shaw', 'Gordon', 'Wagner', 'Hunter', 'Romero', 'Hicks', 'Dixon', 'Hunt', 'Palmer', 'Robertson', 'Black',
    'Holmes', 'Stone', 'Meyer', 'Boyd', 'Mills', 'Warren', 'Fox', 'Rose', 'Rice', 'Moreno', 'Schmidt', 'Patel',
    'Ferguson', 'Nichols', 'Herrera', 'Medina', 'Ryan', 'Fernandez', 'Weaver', 'Daniels', 'Stephens', 'Gardner',
    'Payne', 'Kelley', 'Dunn', 'Pierce', 'Arnold', 'Tran', 'Spencer', 'Peters', 'Hawkins', 'Grant', 'Hansen',
    'Castro', 'Hoffman', 'Hart', 'Elliott', 'Cunningham', 'Knight', 'Bradley', 'Carroll', 'Hudson', 'Duncan',
    'Armstrong', 'Berry', 'Andrews', 'Johnston', 'Ray', 'Lane', 'Riley', 'Carpenter', 'Perkins', 'Aguilar',
    'Silva', 'Richards', 'Willis', 'Matthews', 'Chapman', 'Lawrence', 'Garza', 'Vargas', 'Watkins', 'Wheeler',
    'Larson', 'Carlson', 'Harper', 'George', 'Greene', 'Burke', 'Guzman', 'Morrison', 'Munoz', 'Jacobs', 'Obrien',
    'Lawson', 'Franklin', 'Lynch', 'Bishop', 'Carr', 'Salazar', 'Austin', 'Mendez', 'Gilbert', 'Jensen', 'Williamson',
    'Montgomery', 'Harvey', 'Oliver', 'Howell', 'Dean', 'Hanson', 'Weber', 'Garrett', 'Sims', 'Burton', 'Fuller',
    'Soto', 'Mccoy', 'Welch', 'Chen', 'Schultz', 'Walters', 'Reid', 'Fields', 'Walsh', 'Little', 'Fowler', 'Bowman',
    'Davidson', 'May', 'Day', 'Schneider', 'Newman', 'Brewer', 'Lucas', 'Holland', 'Wong', 'Banks', 'Santos',
    'Curtis', 'Pearson', 'Delgado', 'Valdez', 'Pena', 'Rios', 'Douglas', 'Sandoval', 'Barrett', 'Hopkins', 'Keller',
    'Guerrero', 'Stanley', 'Bates', 'Alvarado', 'Beck', 'Ortega', 'Wade', 'Estrada', 'Contreras', 'Barnett',
    'Caldwell', 'Santiago', 'Lambert', 'Powers', 'Chambers', 'Nunez', 'Craig', 'Leonard', 'Lowe', 'Rhodes',
    'Byrd', 'Gregory', 'Shelton', 'Frazier', 'Becker', 'Maldonado', 'Fleming', 'Vega', 'Sutton', 'Cohen', 'Jennings',
    'Parks', 'Mcdaniel', 'Watts', 'Barker', 'Norris', 'Vaughn', 'Vazquez', 'Holt', 'Schwartz', 'Steele', 'Benson',
    'Neal', 'Dominguez', 'Horton', 'Terry', 'Wolfe', 'Hale', 'Lyons', 'Graves', 'Haynes', 'Miles', 'Park', 'Warner',
    'Padilla', 'Bush', 'Thornton', 'Mccarthy', 'Mann', 'Zimmerman', 'Erickson', 'Fletcher', 'Mckinney', 'Page',
    'Dawson', 'Joseph', 'Marquez', 'Reeves', 'Klein', 'Espinoza', 'Baldwin', 'Moran', 'Love', 'Robbins', 'Higgins',
    'Ball', 'Cortez', 'Le', 'Griffith', 'Bowen', 'Sharp', 'Cummings', 'Ramsey', 'Hardy', 'Swanson', 'Barber', 'Acosta',
    'Luna', 'Chandler', 'Blair', 'Daniel', 'Cross', 'Simon', 'Dennis', 'Oconnor', 'Quinn', 'Gross', 'Navarro', 'Moss',
    'Fitzgerald', 'Doyle', 'Mclaughlin', 'Rojas', 'Rodgers', 'Stevenson', 'Singh', 'Yang', 'Figueroa', 'Harmon',
    'Newton', 'Paul', 'Manning', 'Garner', 'Mcgee', 'Reese', 'Francis', 'Burgess', 'Adkins', 'Goodman', 'Curry',
    'Brady', 'Christensen', 'Potter', 'Walton', 'Goodwin', 'Mullins', 'Molina', 'Webster', 'Fischer', 'Campos',
    'Avila', 'Sherman', 'Todd', 'Chang', 'Blake', 'Malone', 'Wolf', 'Hodges', 'Juarez', 'Gill', 'Farmer', 'Hines',
    'Gallagher', 'Duran', 'Hubbard', 'Cannon', 'Miranda', 'Wang', 'Saunders', 'Tate', 'Mack', 'Hammond', 'Carrillo',
    'Townsend', 'Wise', 'Ingram', 'Barton', 'Mejia', 'Ayala', 'Schroeder', 'Hampton', 'Rowe', 'Parsons', 'Frank',
    'Waters', 'Strickland', 'Osborne', 'Maxwell', 'Chan', 'Deleon', 'Norman', 'Harrington', 'Casey', 'Patton', 'Logan',
    'Bowers', 'Mueller', 'Glover', 'Floyd', 'Hartman', 'Buchanan', 'Cobb', 'French', 'Kramer', 'Mccormick', 'Clarke',
    'Tyler', 'Gibbs', 'Moody', 'Conner', 'Sparks', 'Mcguire', 'Leon', 'Bauer', 'Norton', 'Pope', 'Flynn', 'Hogan',
    'Robles', 'Salinas', 'Yates', 'Lindsey', 'Lloyd', 'Marsh', 'Mcbride', 'Owen', 'Solis', 'Pham', 'Lang', 'Pratt',
    'Lara', 'Brock', 'Ballard', 'Trujillo', 'Shaffer', 'Drake', 'Roman', 'Aguirre', 'Morton', 'Stokes', 'Lamb',
    'Pacheco', 'Patrick', 'Cochran', 'Shepherd', 'Cain', 'Burnett', 'Hess', 'Li', 'Cervantes', 'Olsen', 'Briggs',
    'Ochoa', 'Cabrera', 'Velasquez', 'Montoya', 'Roth', 'Meyers', 'Cardenas', 'Fuentes', 'Weiss', 'Hoover', 'Wilkins',
    'Nicholson', 'Underwood', 'Short', 'Carson', 'Morrow', 'Colon', 'Holloway', 'Summers', 'Bryan', 'Petersen',
    'Mckenzie', 'Serrano', 'Wilcox', 'Carey', 'Clayton', 'Poole', 'Calderon', 'Gallegos', 'Greer', 'Rivas', 'Guerra',
    'Decker', 'Collier', 'Wall', 'Whitaker', 'Bass', 'Flowers', 'Davenport', 'Conley', 'Houston', 'Huff', 'Copeland',
    'Hood', 'Monroe', 'Massey', 'Roberson', 'Combs', 'Franco', 'Larsen', 'Pittman', 'Randall', 'Skinner', 'Wilkinson',
    'Kirby', 'Cameron', 'Bridges', 'Anthony', 'Richard', 'Kirk', 'Bruce', 'Singleton', 'Mathis', 'Bradford', 'Boone',
    'Abbott', 'Charles', 'Allison', 'Sweeney', 'Atkinson', 'Horn', 'Jefferson', 'Rosales', 'York', 'Christian',
    'Phelps', 'Farrell', 'Castaneda', 'Nash', 'Dickerson', 'Bond', 'Wyatt', 'Foley', 'Chase', 'Gates', 'Vincent',
    'Mathews', 'Hodge', 'Garrison', 'Trevino', 'Villarreal', 'Heath', 'Dalton', 'Valencia', 'Callahan', 'Hensley',
    'Atkins', 'Huffman', 'Roy', 'Boyer', 'Shields', 'Lin', 'Hancock', 'Grimes', 'Glenn', 'Cline', 'Delacruz', 'Camacho',
    'Dillon', 'Parrish', 'Oneill', 'Melton', 'Booth', 'Kane', 'Berg', 'Harrell', 'Pitts', 'Savage', 'Wiggins',
    'Brennan', 'Salas', 'Marks', 'Russo', 'Sawyer', 'Baxter', 'Golden', 'Hutchinson', 'Liu', 'Walter', 'Mcdowell',
    'Wiley', 'Rich', 'Humphrey', 'Johns', 'Koch', 'Suarez', 'Hobbs', 'Beard', 'Gilmore', 'Ibarra', 'Keith', 'Macias',
    'Khan', 'Andrade', 'Ware', 'Stephenson', 'Henson', 'Wilkerson', 'Dyer', 'Mcclure', 'Blackwell', 'Mercado', 'Tanner',
    'Eaton', 'Clay', 'Barron', 'Beasley', 'Oneal', 'Preston', 'Small', 'Wu', 'Zamora', 'Macdonald', 'Vance', 'Snow',
    'Mcclain', 'Stafford', 'Orozco', 'Barry', 'English', 'Shannon', 'Kline', 'Jacobson', 'Woodard', 'Huang', 'Kemp',
    'Mosley', 'Prince', 'Merritt', 'Hurst', 'Villanueva', 'Roach', 'Nolan', 'Lam', 'Yoder', 'Mccullough', 'Lester',
    'Santana', 'Valenzuela', 'Winters', 'Barrera', 'Leach', 'Orr', 'Berger', 'Mckee', 'Strong', 'Conway', 'Stein',
    'Whitehead', 'Bullock', 'Escobar', 'Knox', 'Meadows', 'Solomon', 'Velez', 'Odonnell', 'Kerr', 'Stout',
    'Blankenship', 'Browning', 'Kent', 'Lozano', 'Bartlett', 'Pruitt', 'Buck', 'Barr', 'Gaines', 'Durham',
    'Gentry', 'Mcintyre', 'Sloan', 'Melendez', 'Rocha', 'Herman', 'Sexton', 'Moon', 'Hendricks', 'Rangel',
    'Stark', 'Lowery', 'Hardin', 'Hull', 'Sellers', 'Ellison', 'Calhoun', 'Gillespie', 'Mora', 'Knapp', 'Mccall',
    'Morse', 'Dorsey', 'Weeks', 'Nielsen', 'Livingston', 'Leblanc', 'Mclean', 'Bradshaw', 'Glass', 'Middleton',
    'Buckley', 'Schaefer', 'Frost', 'Howe', 'House', 'Mcintosh', 'Ho', 'Pennington', 'Reilly', 'Hebert', 'Mcfarland',
    'Hickman', 'Noble', 'Spears', 'Conrad', 'Arias', 'Galvan', 'Velazquez', 'Huynh', 'Frederick', 'Randolph', 'Cantu',
    'Fitzpatrick', 'Mahoney', 'Peck', 'Villa', 'Michael', 'Donovan', 'Mcconnell', 'Walls', 'Boyle', 'Mayer', 'Zuniga',
    'Giles', 'Pineda', 'Pace', 'Hurley', 'Mays', 'Mcmillan', 'Crosby', 'Ayers', 'Case', 'Bentley', 'Shepard',
    'Everett', 'Pugh', 'David', 'Mcmahon', 'Dunlap', 'Bender', 'Hahn', 'Harding', 'Acevedo', 'Raymond', 'Blackburn',
    'Duffy', 'Landry', 'Dougherty', 'Bautista', 'Shah', 'Potts', 'Arroyo', 'Valentine', 'Meza', 'Gould', 'Vaughan',
    'Fry', 'Rush', 'Avery', 'Herring', 'Dodson', 'Clements', 'Sampson', 'Tapia', 'Bean', 'Lynn', 'Crane', 'Farley',
    'Cisneros', 'Benton', 'Ashley', 'Mckay', 'Finley', 'Best', 'Blevins', 'Friedman', 'Moses', 'Sosa', 'Blanchard',
    'Huber', 'Frye', 'Krueger', 'Bernard', 'Rosario', 'Rubio', 'Mullen', 'Benjamin', 'Haley', 'Chung', 'Moyer', 'Choi',
    'Horne', 'Yu', 'Woodward', 'Ali', 'Nixon', 'Hayden', 'Rivers', 'Estes', 'Mccarty', 'Richmond', 'Stuart', 'Maynard',
    'Brandt', 'Oconnell', 'Hanna', 'Sanford', 'Sheppard', 'Church', 'Burch', 'Levy', 'Rasmussen', 'Coffey', 'Ponce',
    'Faulkner', 'Donaldson', 'Schmitt', 'Novak', 'Costa', 'Montes', 'Booker', 'Cordova', 'Waller', 'Arellano',
    'Maddox', 'Mata', 'Bonilla', 'Stanton', 'Compton', 'Kaufman', 'Dudley', 'Mcpherson', 'Beltran', 'Dickson',
    'Mccann', 'Villegas', 'Proctor', 'Hester', 'Cantrell', 'Daugherty', 'Cherry', 'Bray', 'Davila', 'Rowland',
    'Levine', 'Madden', 'Spence', 'Good', 'Irwin', 'Werner', 'Krause', 'Petty', 'Whitney', 'Baird'];




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

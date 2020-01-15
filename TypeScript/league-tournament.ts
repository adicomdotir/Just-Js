class LeagueTournament {
    numbers = [1, 2, 3, 4, 5, 6];
    players = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'];

    constructor() {

        for (let i = 0; i < (this.numbers.length - 1) * 2; i++) {
            let isHalf = false;
            if (i < this.numbers.length - 1) {
                isHalf = false;
            } else {
                isHalf = true;
            }
            this.match(isHalf, i);
            this.swap();
        }

    }
    swap() {
        const x = this.numbers[0];
        const newArray = [];
        newArray.push(this.numbers[0]);
        for (let i = 2; i < this.numbers.length; i++) {
            newArray.push(this.numbers[i]);
        }
        newArray.push(this.numbers[1]);
        this.numbers = newArray;
    }

    match(isHalf, index) {
        console.log('');
        console.log('دور ' + (index + 1));
        const lastPlayer = this.numbers.length - 1;
        for (let i = 0; i < this.numbers.length / 2; i++) {
            const home = this.getPlayerName(this.numbers[i]);
            const away = this.getPlayerName(this.numbers[lastPlayer - i]);
            if (isHalf) {
                console.log(`${away} - ${home}`);
            } else {
                console.log(`${home} - ${away}`);
            }
        }
    }

    getPlayerName(index) {
        return this.players[index - 1];
    }

}
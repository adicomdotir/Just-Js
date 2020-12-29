describe('MyCustomTest', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    function rollMany(n: number, pins: number) {
        for (let i = 0; i < n; i++) {
            game.roll(pins);
        }
    }

    it('test gutter game', () => {
        rollMany(20, 0);
        expect(game.score()).toEqual(0);
    });

    it('test all one', () => {
        rollMany(20, 1);
        expect(game.score()).toEqual(20);
    });

    function rollSpare() {
        game.roll(5);
        game.roll(5);
    }

    it('test one spare', () => {
        rollSpare();
        game.roll(3);
        rollMany(17, 0);
        expect(game.score()).toEqual(18);
    });

    function rollStrike() {
        game.roll(10);
    }

    it('test one strike', () => {
        rollStrike();
        game.roll(3);
        game.roll(4);
        rollMany(16, 0);
        expect(game.score()).toEqual(24);
    });

    it('test perfect game', () => {
        rollMany(12, 10);
        expect(game.score()).toEqual(300);
    });
});

export class Game {
    private rolls = [];
    private currentRoll = 0;

    roll(pins: number) {
        this.rolls[this.currentRoll++] = pins;
    }

    score(): number {
        let gameScore = 0;
        let frameIndex = 0;
        for (let frame = 0; frame < 10; frame++) {
            if (this.isStrike(frameIndex)) {
                gameScore += 10 + this.strikeBonus(frameIndex);
                frameIndex++;
            } else if (this.isSpare(frameIndex)) {
                gameScore += 10 + this.rolls[frameIndex + 1];
                frameIndex += 2;
            } else {
                gameScore += this.sumOfBallsInFrame(frameIndex);
                frameIndex += 2;
            }
        }
        return gameScore;
    }

    private isStrike(frameIndex: number) {
        return this.rolls[frameIndex] === 10;
    }

    private sumOfBallsInFrame(frameIndex: number) {
        return this.rolls[frameIndex] + this.rolls[frameIndex + 1];
    }

    private isSpare(frameIndex: number) {
        return this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10;
    }

    private strikeBonus(frameIndex: number) {
        return this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2];
    }
}


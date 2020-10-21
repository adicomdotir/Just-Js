class QueraMethod {
    private startUp(input: number[]) {
        let playerIndex = 0;
        const playerEat = new Array(input.length);
        playerEat.fill(0);
        while (!this.checkEmpty(input)) {
            input[playerIndex] -= 1;
            playerEat[playerIndex] += 1;
            playerIndex++;
            playerIndex = playerIndex % input.length;
            const temp = input.shift();
            input.push(temp);
        }
        console.log(playerEat);
    }

    private checkEmpty(input: number[]): boolean {
        for (const num of input) {
            if (num === 0) {
                return true;
            }
        }
        return false;
    }
}

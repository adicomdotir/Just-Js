class BackTracking {
    abc(word: string, n: number) {
        if (word.length > n) {
            return;
        }
        if (word.length === n) {
            console.log(word);
        }
        this.abc(word + 'a', n);
        this.abc(word + 'b', n);
        this.abc(word + 'c', n);
    }

    fromItoN(i, n) {
        if (i > n) {
            return 0;
        }
        if (i === n) {
            return 1;
        }
        return this.fromItoN(i + 1, n) + this.fromItoN(i + 2, n) + this.fromItoN(i + 3, n);
    }
}

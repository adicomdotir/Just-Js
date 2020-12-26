class PrimeFactors {
    generate(n: number): number[] {
        const tmp = [];
        let condidate = 2;
        while (n > 1) {
            while (n % condidate === 0) {
                tmp.push(condidate);
                n /= condidate;
            }
            condidate++;
        }
        return tmp;
    }
}

function list(...ints): number[] {
    const tmp: number[] = [];
    for (const i of ints) {
        tmp.push(i);
    }
    return tmp;
}

describe('PrimeFactors', () => {
    it('test one', () => {
        const app = new PrimeFactors();
        expect(app.generate(1)).toEqual(list());
    });

    it('test two', () => {
        const app = new PrimeFactors();
        expect(app.generate(2)).toEqual(list(2));
    });

    it('test three', () => {
        const app = new PrimeFactors();
        expect(app.generate(3)).toEqual(list(3));
    });

    it('test four', () => {
        const app = new PrimeFactors();
        expect(app.generate(4)).toEqual(list(2, 2));
    });

    it('test six', () => {
        const app = new PrimeFactors();
        expect(app.generate(6)).toEqual(list(2, 3));
    });

    it('test eight', () => {
        const app = new PrimeFactors();
        expect(app.generate(8)).toEqual(list(2, 2, 2));
    });

    it('test nine', () => {
        const app = new PrimeFactors();
        expect(app.generate(9)).toEqual(list(3, 3));
    });

    it('test ten', () => {
        const app = new PrimeFactors();
        expect(app.generate(10)).toEqual(list(2, 5));
    });
});


calcFunc('1', 1, 1, 2);
function calcFunc(expr, sum, prev, num) {
    if (sum > 100) {
        return;
    }
    if (num > 9) {
        if (sum === 100) {
            console.error(expr, sum);
        }
        return;
    } else {
        this.calcFunc(expr + ' + ' + num, sum + num, num, num + 1);
        this.calcFunc(expr + ' - ' + num, sum - num, -num, num + 1);
        const prevSum = sum - prev;
        const stringNumber = '' + prev + num;
        this.calcFunc(expr + '' + num, prevSum + parseInt(stringNumber, 10), parseInt(stringNumber, 10), num + 1);
    }
}

calcFunc('1', 1, 1, 2);
function calcFunc(expr: string, sum: number, prev: number, num: number): void {
    if (sum > 100) {
        return;
    }
    if (num > 9) {
        if (sum === 100) {
            console.error(expr, sum);
        }
        return;
    } else {
        calcFunc(expr + ' + ' + num, sum + num, num, num + 1);
        calcFunc(expr + ' - ' + num, sum - num, -num, num + 1);
        const prevSum = sum - prev;
        const stringNumber = '' + prev + num;
        calcFunc(expr + '' + num, prevSum + parseInt(stringNumber, 10), parseInt(stringNumber, 10), num + 1);
    }
}
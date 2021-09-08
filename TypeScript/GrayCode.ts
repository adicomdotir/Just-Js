function grayCode(length: number): string[] {
    if (length === 0) {
        return [];
    }
    const g1 = grayCode(length - 1);
    const g2 = reverse(g1);
    addChar(g1, '0');
    addChar(g2, '1');
    return [...g1, ...g2];
}

function addChar(arr: string[], ch: string) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = ch + arr[i];
    }
    if (arr.length === 0) {
        arr.push(ch);
    }
}

function reverse(arr: string[]): string[] {
    const newArr: string[] = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.unshift(arr[i]);
    }
    return newArr;
}

console.log(grayCode(1));
console.log(grayCode(2));
console.log(grayCode(3));
console.log(grayCode(4));

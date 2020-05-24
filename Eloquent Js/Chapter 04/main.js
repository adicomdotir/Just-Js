const array = [1, 2, 3, 4, 5, 6, 7];

const range = (start, end, step = 1) => {
    const newArray = [];
    if (step === 0) {
        step = 1;
    }
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            newArray.push(array[i]);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            newArray.push(array[i]);
        }
    }
    return newArray;
};

const sumArray = (arr) => {
    let sum = 0;
    for (let number of arr) {
        sum += number;
    }
    return sum;
};

const reverseArray = (arr) => {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.unshift(arr[i]);
    }
    return newArray;
};

const reverseArrayInPlace = (arr) => {
    for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
};

const arrayToList = (arr) => {
    let rest = null;
    for (let i = arr.length - 1; i >= 0; i--) {
        const temp = {};
        temp.value = arr[i];
        temp.rest = rest;
        rest = temp;
    }
    return rest;
};

const listToArray = (obj) => {
    const newArray = [];
    newArray.push(obj.value);
    while (obj.rest !== null) {
        obj = obj.rest;
        newArray.push(obj.value);
    }
    return newArray;
};

const prepend = (value, obj) => {
    const temp = {};
    temp.rest = obj;
    temp.value = value;
    return temp;
};

const nth = (obj, value) => {
    let counter = 0;
    if (obj.value === value) {
        return counter;
    }

    while (obj.rest !== null) {
        const temp = obj.rest;
        counter++;
        if (temp.value === value) {
            return counter;
        }
        obj = temp;
    }

    return undefined;
};

function deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object") return false;

    let keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
}

function main() {
    console.log(range(3, 5));
    console.log(range(5, 2, -1));
    console.log(sumArray(array));
    console.log(reverseArray(array));
    reverseArrayInPlace(array);
    console.log(array);

    console.log(arrayToList([10, 20]));
    console.log(listToArray(arrayToList([10, 20, 30])));
    console.log(prepend(10, prepend(20, null)));
    console.log(nth(arrayToList([10, 20, 30]), 30));

    let obj = {here: {is: "an"}, object: 2};
    console.log(deepEqual(obj, obj));
    console.log(deepEqual(obj, {here: 1, object: 2}));
    console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
}

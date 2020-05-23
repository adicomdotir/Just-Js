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

function main() {
    console.log(range(3, 5));
    console.log(range(5, 2, -1));
    console.log(sumArray(array));
    console.log(reverseArray(array));
    reverseArrayInPlace(array);
    console.log(array);
}

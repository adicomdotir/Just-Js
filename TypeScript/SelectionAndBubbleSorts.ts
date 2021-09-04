const arr: number[] = [2, 5, 3, 8, 6, 7, 1, 4];

function selectionSort(numbers: number[]) {
    for (let i = 0; i < numbers.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[j] < numbers[minIndex]) {
                minIndex = j;
            }
        }
        swap(numbers, i, minIndex);
    }
}

function swap(numbers: number[], i: number, j: number) {
    const tmp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = tmp;
}

function bubbleSort(numbers: number[]) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 1; j < numbers.length; j++) {
            if (numbers[j - 1] > numbers[j]) {
                swap(numbers, j - 1, j);
            }
        }
    }
}

// selectionSort(arr);
bubbleSort(arr);
console.log(arr);

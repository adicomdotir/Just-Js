function insertionSort(arr: number[]) {
    for (let i = 1; i < arr.length; i++) {
        let p = i;
        while (p > 0 && arr[p] < arr[p - 1]) {
            const tmp = arr[p];
            arr[p] = arr[p - 1];
            arr[p - 1] = tmp;
            p -= 1;
        }
    }
}
const arr = [6,8,2,4,1];
insertionSort(arr);
console.log(arr)

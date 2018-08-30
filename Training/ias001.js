function sumAll(arr) {
  let sum = 0;
  if (arr[0] > arr[1]) {
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
  }
  for (let i = arr[0]; i <= arr[1]; i++) {
    sum += i;
  }
  return sum;
}

sumAll([1, 4]);

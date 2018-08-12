function frankenSplice(arr1, arr2, n) {
  let arrCopy = arr2.slice(0, arr2.length);
  arrCopy.splice(n, 0, ...arr1);
  return arrCopy;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);

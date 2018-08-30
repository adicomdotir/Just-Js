function diffArray(arr1, arr2) {
  var newArr = [];
  // Same, same; but different.
  for (let i = 0; i < arr1.length; i++) {
    let flag = false;
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] == arr2[j]) {
        flag = true;
      }
    }
    if (!flag) {
      newArr.push(arr1[i]);
    }
  }

  for (let j = 0; j < arr2.length; j++) {
    let flag = false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] == arr2[j]) {
        flag = true;
      }
    }
    if (!flag) {
      newArr.push(arr2[j]);
    }
  }
  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

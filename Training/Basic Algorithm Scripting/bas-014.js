function getIndexToIns(arr, num) {
  var index = arr.sort((curr, next) => curr > next)
    .findIndex((currNum)=> num <= currNum);
  // Returns proper answer
  return index === -1 ? arr.length : index;
}

getIndexToIns([40, 60], 50);

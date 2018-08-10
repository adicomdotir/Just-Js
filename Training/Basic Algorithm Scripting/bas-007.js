function repeatStringNumTimes(str, num) {
  // repeat after me
  let newStr = '';
  for (let i = 0; i < num; i++) {
    newStr += str;
  }
  return newStr;
}

repeatStringNumTimes("abc", 3);

function findLongestWordLength(str) {
  let strSplit = str.split(' ');
  let longestWord = strSplit.sort(function(a, b) {
      return b.length - a.length;
  });
  return longestWord[0].length;
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");

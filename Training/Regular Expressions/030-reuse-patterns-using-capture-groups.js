let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\2(\d+)\s\2$/; // Change this line
let result = reRegex.test(repeatNum);
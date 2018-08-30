nearHundred = function(n) {
	return (Math.abs(100 - n) <= 10) || (Math.abs(200 - n) <= 10);
}

var diff21 = function(n) {
	if (n < 21) return 21 - n;
  	else return (n - 21) * 2;
}

missingChar = function(str, n) {
	return str.substring(0, n) + str.substring(n + 1);
}

var backAround = function(str) {
	return str.substring(str.length - 1) + str + str.substring(str.length - 1);
}

var startHi = function(str) {
	return str.substring(0, 2) === 'hi';
}

var hasTeen = function(a, b, c) {
    return (a >= 13 && a <= 19) || (b >= 13 && b <= 19) || (c >= 13 && c <= 19);
}

var mixStart = function(str) {
	return str.substring(1, 3) == 'ix';
}

var close10 = function(a, b){
	if (Math.abs(a - 10) < Math.abs(b - 10)) {
		return a;
	} else if (Math.abs(a - 10) > Math.abs(b - 10)) {
		return b;
	}
	return 0;
}

var stringE = function(str) {
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == 'e') {
			count++;
		}
	}
	return count >= 1 && count <= 3;
}

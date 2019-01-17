function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1)
}

function bunnyEars(bunnies) {
    if (bunnies <= 0) return 0;
    return 2 + bunnyEarsRecursive(bunnies - 1);;
}

function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2)
}

function bunnyEars2(n) {
    if (n == 0) return 0;
    if (n % 2 == 0) return 3 + bunnyEars2(n - 1);
    return 2 + bunnyEars2(n - 1);
}

function triangle(rows) {
    if (rows <= 0) return 0;
    return rows + triangle(rows - 1)
}

function simDigits1 (n) {
    if (n <= 0) return 0;
    return n % 10 + simDigits1(Math.floor(n / 10));
}

function count7(n){
    var count = 0;
    if (n <= 0) return 0;
    if (n % 10 == 7) count = 1;
    return count + count7(Math.floor(n / 10));
}

function count8(n){
    if (n <= 0) return 0;
    if (n % 10 == 8) {
        if (Math.floor(n / 10) % 10 == 8)
            return 2 + count(Math.floor(n / 10));
        else return 1 + count(Math.floor(n / 10));
    }
    return count(Math.floor(n / 10));
}

function powerN(base, n){
    if (n == 1) return base;
    return base * powerN(base, n - 1);
}

function countX(str){
    if (str.length <= 0) return 0;
    if (str.charAt(0) == 'x') 
        return 1 + countX(str.substring(1));
    return countX(str.substring(1));
}

function countHi(str){
    if (str.length <= 1) return 0;
    if (str.substring(0, 2) == 'hi') 
        return 1 + countHi(str.substring(1));
    return countHi(str.substring(1));
}

function changePi(str){
	if (str.length <= 0) return "";
	if (str.substring(0, 2) == 'pi') {
		return '3.14' + changePi(str.substring(2));
	}
	return str.charAt(0)+ changePi(str.substring(1));
}

function noX(str){
  	if (str.length <= 0) return '';
  	if (str.charAt(0) == 'x')
    	return noX(str.substring(1));
  	return str.charAt(0) + noX(str.substring(1));
}

function array6(nums, i){
  	if (nums.length == i) return false;
  	if (nums[i] == 6) return true;
  	return array6(nums, i + 1);
}

function array220(nums, i){
    if (i == nums.length - 1 || nums.length == 0){
        return false;
    }
    if (nums[i] * 10 == nums[i + 1]){
        return true;
    }
    return array220(nums, i + 1);
}

function allStar(str){
    if (str.length <= 1) return str;
        return str.charAt(0) + '*' + allStar(str.substring(1));
}
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

function simDigits1(n) {
    if (n <= 0) return 0;
    return n % 10 + simDigits1(Math.floor(n / 10));
}

function count7(n) {
    var count = 0;
    if (n <= 0) return 0;
    if (n % 10 == 7) count = 1;
    return count + count7(Math.floor(n / 10));
}

function count8(n) {
    if (n <= 0) return 0;
    if (n % 10 == 8) {
        if (Math.floor(n / 10) % 10 == 8)
            return 2 + count(Math.floor(n / 10));
        else return 1 + count(Math.floor(n / 10));
    }
    return count(Math.floor(n / 10));
}

function powerN(base, n) {
    if (n == 1) return base;
    return base * powerN(base, n - 1);
}

function countX(str) {
    if (str.length <= 0) return 0;
    if (str.charAt(0) == 'x')
        return 1 + countX(str.substring(1));
    return countX(str.substring(1));
}

function countHi(str) {
    if (str.length <= 1) return 0;
    if (str.substring(0, 2) == 'hi')
        return 1 + countHi(str.substring(1));
    return countHi(str.substring(1));
}

function changePi(str) {
    if (str.length <= 0) return "";
    if (str.substring(0, 2) == 'pi') {
        return '3.14' + changePi(str.substring(2));
    }
    return str.charAt(0) + changePi(str.substring(1));
}

function noX(str) {
    if (str.length <= 0) return '';
    if (str.charAt(0) == 'x')
        return noX(str.substring(1));
    return str.charAt(0) + noX(str.substring(1));
}

function array6(nums, i) {
    if (nums.length == i) return false;
    if (nums[i] == 6) return true;
    return array6(nums, i + 1);
}

function array220(nums, i) {
    if (i == nums.length - 1 || nums.length == 0) {
        return false;
    }
    if (nums[i] * 10 == nums[i + 1]) {
        return true;
    }
    return array220(nums, i + 1);
}

function allStar(str) {
    if (str.length <= 1) return str;
    return str.charAt(0) + '*' + allStar(str.substring(1));
}

function pairStar(str) {
    if (str.length <= 1) return str;
    if (str.charAt(0) == str.charAt(1)) {
        return str.charAt(0) + '*' + pairStar(str.substring(1));
    }
    return str.charAt(0) + pairStar(str.substring(1));
}

function endX(str) {
    if (str.length <= 1) return str;
    if (str.charAt(0) == 'x')
        return endX(str.substring(1)) + str.charAt(0);
    return str.charAt(0) + endX(str.substring(1))
}

function countPairs(str) {
    if (str.length <= 2) return 0;
    if (str.charAt(0) == str.charAt(2)) {
        return 1 + countPairs(str.substring(1));
    }
    return countPairs(str.substring(1));
}

function countAbc(str) {
    if (str.length < 3) return 0;
    if (str.substring(0, 3) == 'abc' || str.substring(0, 3) == 'aba') return countAbc(str.substring(1)) + 1;
    return countAbc(str.substring(1));
}

function count11(str) {
    if (str.length < 2) return 0;
    if (str.substring(0, 2) == '11') {
        return 1 + count11(str.substring(2));
    }
    return count11(str.substring(1));
}

function stringClean(str) {
    if (str.length <= 1) return str;
    if (str.charAt(0) == str.charAt(1)) {
        return stringClean(str.substring(1));
    }
    return str.charAt(0) + stringClean(str.substring(1));
}

function starBit(str) {
    if (str.charAt(0) == "-" && str.charAt(str.length - 1) == "*") {
        return str;
    }

    if (str.charAt(str.length - 1) == "*") {
        return starBit(str.substring(1));
    }

    if (str.charAt(0) == "-") {
        return starBit(str.substring(0, str.length - 1));
    }

    return starBit(str.substring(1, str.length - 1));
}

function nestParen(str) {
    if (str.length == 0)
        return true;

    if (str.charAt(0) == '(' && str.charAt(str.length - 1) == ')') {
        return nestParen(str.substring(1, str.length - 1));
    }

    return false;
}

function countHi2(str) {
    if (str.length <= 1) {
        return 0;
    }

    if (str.substring(0, 3) == "xhi") {
        return countHi2(str.substring(3))
    }

    if (str.substring(0, 2) == "hi") {
        return 1 + countHi2(str.substring(2))
    }

    return countHi2(str.substring(1))
}

function strCount(str, sub) {
    if (str.length < sub.length) return 0;
    if (str.substring(0, sub.length) == sub) {
        return 1 + strCount(str.substring(sub.length), sub);
    }
    return strCount(str.substring(1), sub);
}

function strCopies(str, sub, n) {
    if (n == 0) return true;
    if (str.length < sub.length) return false;
    if (str.substring(0, sub.length) == sub) {
        return strCopies(str.substring(1), sub, n - 1);
    }
    return strCopies(str.substring(1), sub, n);
}
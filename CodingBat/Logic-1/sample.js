/*
When squirrels get together for a party, they like to have cigars. 
A squirrel party is successful when the number of cigars is between 40 and 60, inclusive. 
Unless it is the weekend, in which case there is no upper bound on the number of cigars. 
Return true if the party with the given values is successful, or false otherwise.

Examples

cigarParty(30, false) → false
cigarParty(50, false) → true
cigarParty(70, true) → true
*/

function cigarParty(cigars, isWeekend) {
    if (isWeekend == true && cigars >= 40) {
        return true;
    } else if (cigars >= 40 && cigars <= 60) {
        return true;
    }
    return false;
}

/*
You and your date are trying to get a table at a restaurant. 
The parameter "you" is the stylishness of your clothes, in the range 0..10, 
and "date" is the stylishness of your date's clothes. 
The result getting the table is encoded as an int value with 0=no, 1=maybe, 2=yes. 
If either of you is very stylish, 8 or more, then the result is 2 (yes). 
With the exception that if either of you has style of 2 or less, then the result is 0 (no). 
'Otherwise the result is 1 (maybe).

Examples

dateFashion(5, 10) → 2
dateFashion(5, 2) → 0
dateFashion(5, 5) → 1
*/

function dateFashion(you, date) {
    if (you <= 2 || date <= 2) {
        return 0;
    }

    if (you >= 8 || date >= 8) {
        return 2;
    }

    return 1;
}

/*
The squirrels in Palo Alto spend most of the day playing. 
In particular, they play if the temperature is between 60 and 90 (inclusive).
Unless it is summer, then the upper limit is 100 instead of 90. 
Given an int temperature and a boolean isSummer, return true if the squirrels play and false otherwise.

Examples

squirrelPlay(70, false) → true
squirrelPlay(95, false) → false
squirrelPlay(95, true) → true
*/

function squirrelPlay(temp, isSummer) {
    if (isSummer && temp >= 60 && temp <= 100) {
        return true;
    }

    if (!isSummer && temp >= 60 && temp <= 90) {
        return true;
    }

    return false;
}

function caughtSpeeding(speed, isBirthday) {
    if (isBirthday) {
        if (speed <= 65) {
            return 0;
        } else if (speed >= 66 && speed <= 85) {
            return 1;
        } else if (speed >= 86) {
            return 2;
        }
    }

    if (speed <= 60) {
        return 0;
    } else if (speed >= 61 && speed <= 80) {
        return 1;
    } else {
        return 2;
    }
}

/*
Given 2 ints, a and b, return their sum. However, 
sums in the range 10..19 inclusive, are forbidden, so in that case just return 20.

Examples

sortaSum(3, 4) → 7
sortaSum(9, 4) → 20
sortaSum(10, 11) → 21
*/

function sortaSum(a, b) {
    var sum = a + b;
    if (sum >= 10 && sum <= 19) return 20;
    return sum;
}

/*
Given a day of the week encoded as 0=Sun, 1=Mon, 2=Tue, ...6=Sat, 
and a boolean indicating if we are on vacation, 
return a string of the form "7:00" indicating when the alarm clock should ring. 
Weekdays, the alarm should be "7:00" and on the weekend it should be "10:00". 
Unless we are on vacation -- then on weekdays it should be "10:00" and weekends it should be "off".

Examples

alarmClock(1, false) → 7:00
alarmClock(5, false) → 7:00
alarmClock(0, false) → 10:00
*/

function alarmClock(day, vacation) {
    // if (vacation == false && day > 0 && day < 6) return "7:00";
    // if (vacation == false && (day == 0 || day == 6)) return "10:00";
    // if (vacation == true && day > 0 && day < 6) return "10:00";

    // CleanCode
    if (vacation) {
        if (day > 0 && day < 6) return '10:00';
    } else {
        if (day > 0 && day < 6) return '7:00';
        if (day == 0 || day == 6) return "10:00";
    }
    return "off";
}

/*
The number 6 is a truly great number. Given two int values, a and b, 
return true if either one is 6. Or if their sum or difference is 6. 
Note: the function Math.abs(num) computes the absolute value of a number.

Examples

love6(6, 4) → true
love6(4, 5) → false
love6(1, 5) → true
*/

function love6(a, b) {
    if (a == 6 || b == 6) return true;
    if (a + b == 6 || Math.abs(a - b) == 6) return true;
    return false;
}

/*
Given a number n, return true if n is in the range 1..10, inclusive. 
Unless "outsideMode" is true, in which case return true if the number is less or equal to 1, 
or greater or equal to 10.

Examples

in1To10(5, false) → true
in1To10(11, false) → false
in1To10(11, true) → true
*/

function in1To10(n, outsideMode) {
    if (!outsideMode) {
        if (n >= 1 && n <= 10) return true;
    } else {
        if (n <= 1 || n >= 10) return true;
    }
    return false;
}

/*
We'll say a number is special if it is a multiple of 11 or if it is one more than a multiple of 11. 
Return true if the given non-negative number is special. Use the % "mod" operator.

Examples

specialEleven(22) → true
specialEleven(23) → true
specialEleven(24) → false
*/

function specialEleven(n) {
    if (n % 11 == 0 || n % 11 == 1) return true;
    return false;
}

/*
Return true if the given non-negative number is 1 or 2 more than a multiple of 20.

Examples

more20(20) → false
more20(21) → true
more20(22) → true
*/

function more20(n) {
    if (n % 20 == 1 || n % 20 == 2) return true;
    return false;
}

/*
Return true if the given non-negative number is a multiple of 3 or 5, but not both. 
Use the % "mod" operator.

Examples

old35(3) → true
old35(10) → true
old35(15) → false
*/

function old35(n) {
    if (n % 3 == 0 && n % 5 == 0) return false;
    if (n % 3 == 0 || n % 5 == 0) return true;
    return false;
}

/*
Return true if the given non-negative number is 1 or 2 less than a multiple of 20. 
So for example 38 and 39 return true, but 40 returns false.

Examples

less20(18) → true
less20(19) → true
less20(20) → false
*/

function less20(n) {
    if (n % 20 == 19 || n % 20 == 18) return true;
    return false;
}

/*
Given a non-negative number "num", return true if num is within 2 of a multiple of 10. 
Note: (a % b) is the remainder of dividing a by b, so (7 % 5) is 2.

Examples

nearTen(12) → true
nearTen(17) → false
nearTen(19) → true
*/

function nearTen(num) {
    return (num % 10 <= 2 || num % 10 >= 8);
}

/*
Given 2 ints, a and b, return their sum. However, "teen" values in the range 13..19 inclusive, 
are extra lucky. So if either value is a teen, just return 19.

Examples

teenSum(3, 4) → 7
teenSum(10, 13) → 19
teenSum(13, 2) → 19
*/

function teenSum(a, b) {
    if (a >= 13 && a <= 19) return 19;
    if (b >= 13 && b <= 19) return 19;
    return a + b;
}

/*
Your cell phone rings. Return true if you should answer it. 
Normally you answer, except in the morning you only answer if it is your mom calling. 
In all cases, if you are asleep, you do not answer.

Examples

answerCell(false, false, false) → true
answerCell(false, false, true) → false
answerCell(true, false, false) → false
*/

function answerCell(isMorning, isMom, isAsleep) {
    if (isAsleep) return false;
    if (isMorning && isMom) return true;
    if (isMorning) return false;
    return true;
}

function teaParty(tea, candy) {
    if (tea >= 5 && candy >= 5) {
        if (tea >= candy * 2 || candy >= tea * 2) {
            return 2;
        }
        return 1;
    }
    return 0;
}

/*
Given a string str, if the string starts with "f" return "Fizz". 
If the string ends with "b" return "Buzz". 
If both the "f" and "b" conditions are true, return "FizzBuzz". 
In all other cases, return the string unchanged.

Examples

fizzString('fig') → Fizz
fizzString('dib') → Buzz
fizzString('fib') → FizzBuzz
*/

function fizzString(str) {
    let lastIndex = str.length - 1;
    if (str.charAt(0) == 'f' && str.charAt(lastIndex) == 'b') return "FizzBuzz";
    else if (str.charAt(0) == 'f') return "Fizz";
    else if (str.charAt(lastIndex) == 'b') return "Buzz";
    return str;
}

/*
Given an int n, return the string form of the number followed by "!". 
So the int 6 yields "6!". Except if the number is divisible by 3 use "Fizz" instead of the number, 
and if the number is divisible by 5 use "Buzz", and if divisible by both 3 and 5, use "FizzBuzz". 
Note: the % "mod" operator computes the remainder after division, so 23 % 10 yields 3. 
What will the remainder be when one number divides evenly into another?

Examples

fizzString2(1) → 1!
fizzString2(2) → 2!
fizzString2(3) → Fizz!
*/

function fizzString2(n) {
    if (n % 3 == 0 && n % 5 == 0) return "FizzBuzz!";
    else if (n % 3 == 0) return "Fizz!";
    else if (n % 5 == 0) return "Buzz!";
    return n + '!';
}

/*
Given three ints, a b c, return true if it is possible to add two of the ints to get the third.

Examples

twoAsOne(1, 2, 3) → true
twoAsOne(3, 1, 2) → true
twoAsOne(3, 2, 2) → false
*/

function twoAsOne(a, b, c) {
    if (a + b == c) return true;
    if (a + c == b) return true;
    if (b + c == a) return true;
    return false;
}

/*
Given three ints, a b c, return true if b is greater than a, and c is greater than b. 
However, with the exception that if "bOk" is true, b does not need to be greater than a.

Examples

inOrder(1, 2, 4, false) → true
inOrder(1, 2, 1, false) → false
inOrder(1, 1, 2, true) → true
*/

function inOrder(a, b, c, bOk) {
    if (!bOk && b > a && c > b) return true;
    if (bOk && c > b) return true;
    return false;
}

/*
Given three ints, a b c, return true if they are in strict increasing order, 
such as 2 5 11, or 5 6 7, but not 6 5 7 or 5 5 7. 
However, with the exception that if "equalOk" is true, equality is allowed, such as 5 5 7 or 5 5 5.

Examples

inOrderEqual(2, 5, 11, false) → true
inOrderEqual(5, 7, 6, false) → false
inOrderEqual(5, 5, 7, true) → true
*/

function inOrderEqual(a, b, c, equalOk) {
    if (equalOk && a <= b && b <= c) return true;
    if (!equalOk && a < b && b < c) return true;
    return false;
}

/*
Given two non-negative int values, return true if they have the same last digit,
such as with 27 and 57. Note that the % 'mod' operator computes remainders, so 17 % 10 is 7.

Examples

lastDigit(7, 17) → true
lastDigit(6, 17) → false
lastDigit(3, 113) → true
*/

function lastDigit(a, b, c) {
    return a % 10 == b % 10 || b % 10 == c % 10 || a % 10 == c;
}

/*
Given three ints, a b c, return true if one of them is 10 or more less than one of the others.

Examples

lessBy10(1, 7, 11) → true
lessBy10(1, 7, 10) → false
lessBy10(11, 1, 7) → true
*/

function lessBy10(a, b, c) {
    return Math.abs(a - b) >= 10 || Math.abs(b - c) >= 10 || Math.abs(c - a) >= 10;
}

function withoutDoubles(die1, die2, noDoubles) {
    if (noDoubles) {
        if (die1 == die2) {
            if (die1 == 6 || die2 == 6) {
                die1 = 1;
                return die1 + die2;
            }
            return die1 + die2 + 1;
        }
    }
    return die1 + die2;
}

function maxMod5(a, b) {
    if (a == b) {
        return 0;
    }

    if (a % 5 == b % 5) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }
    return a > b ? a : b;
}

/*
You have a red lottery ticket showing ints a, b, and c, each of which is 0, 1, or 2.
If they are all the value 2, the result is 10. Otherwise if they are all the same, the result is 5.
Otherwise so long as both b and c are different from a, the result is 1. Otherwise the result is 0.

Examples

redTicket(2, 2, 2) → 10
redTicket(2, 2, 1) → 0
redTicket(0, 0, 0) → 5
*/

function redTicket(a, b, c) {
    if (a == 2 && b == 2 && c == 2) return 10;
    if (a == b && b == c) return 5;
    if (a != b && a != c) return 1;
    return 0;
}

/*
You have a green lottery ticket, with ints a, b, and c on it.
If the numbers are all different from each other, the result is 0.
If all of the numbers are the same, the result is 20.
If two of the numbers are the same, the result is 10.

Examples

greenTicket(1, 2, 3) → 0
greenTicket(2, 2, 2) → 20
greenTicket(1, 1, 2) → 10
*/

function greenTicket(a, b, c){
    if (a == b && b == c) return 20;
    if (a == b || a == c || b == c) return 10;
    return 0;
}

function blueTicket() {
    // Dont have question
}

/*
Given two ints, each in the range 10..99,
return true if there is a digit that appears in both numbers, such as the 2 in 12 and 23.
(Note: division, e.g. n/10, gives the left digit while the % "mod" n%10 gives the right digit.)

Examples

shareDigit(12, 23) → true
shareDigit(12, 43) → false
shareDigit(12, 44) → false
*/

function shareDigit(a, b) {
    const aFirst = Math.floor(a / 10);
    const aLast = a % 10;

    if (aFirst == Math.floor(b / 10) || aFirst == b % 10) {
        return true;
    }

    if (aLast == Math.floor(b / 10) || aLast == b % 10) {
        return true;
    }

    return false;
}

/*
Given 2 non-negative ints, a and b, return their sum,
so long as the sum has the same number of digits as a.
If the sum has more digits than a, just return a without b.
(Note: one way to compute the number of digits of a non-negative int n is to convert
it to a string with String.valueOf(n) and then check the length of the string.)

Examples

sumLimit(2, 3) → 5
sumLimit(8, 3) → 8
sumLimit(8, 1) → 9
*/

function sumLimit(a, b){
    const aLen = Math.abs(a).toString().length;
    const bLen = Math.abs(b).toString().length;
    const res = a + b;
    const resLen = Math.abs(res).toString().length;

    if (resLen == aLen) {
        return res;
    } else if (resLen >= aLen) {
        return a;
    }
}

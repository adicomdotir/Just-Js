function stringTimes(str, n) {
    let newStr = '';
    for (let i = 0; i < n; i += 1) {
        newStr += str;
    }
    return newStr;
}

/*
Given a string and a non-negative int n, we'll say that the front of the string is the first 3 chars,
or whatever is there if the string is less than length 3. Return n copies of the front.

Examples

frontTimes('Chocolate', 2) → ChoCho
frontTimes('Chocolate', 3) → ChoChoCho
frontTimes('Abc', 3) → AbcAbcAbc
*/

function frontTimes(str, n) {
    let newStr = '';
    for (let i = 0; i < n; i += 1) {
        if (str.length < 3) newStr += str;
        else newStr += str.substring(0, 3);
    }
    return newStr;
}

/*
Count the number of 'xx' in the given string.
We'll say that overlapping is allowed, so 'xxx' contains 2 'xx'.

Examples

countXX('abcxx') → 1
countXX('xxx') → 2
countXX('xxxx') → 3
*/

function countXX(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.substring(i, i + 2) == 'xx') count++;
    }
    return count;
}

/*
Given a string, return true if the first instance of "x" in the string is immediately followed by another "x".

Examples

doubleX('axxbb') → true
doubleX('axaxax') → false
doubleX('xxxxx') → true
*/

function doubleX(str) {
    str.toLowerCase();
    x = str.indexOf('x');
    if (x == -1) {
        return false;
    }
    if (x >= str.length) {
        return false;
    }
    return str.substring(x + 1, x + 2) == 'x';
}

/*
Given a string, return a new string made of every other char starting with the first, 
so "Hello" yields "Hlo".

Examples

stringBits('Hello') → Hlo
stringBits('Hi') → H
stringBits('Heeololeo') → Hello
*/

function stringBits(str) {
    let len = str.length;
    let temp = '';
    for (let i = 0; i < len; i++) {
        temp += str.charAt(i);
    }
    return temp;
}
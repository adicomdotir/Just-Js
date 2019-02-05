function scoresIncreasing(scores) {
    for (let i = 0; i < scores.length - 1; i++) {
        if (scores[i] > scores[i + 1]) return false;
    }
    return true;
}

function scores100(scores) {
    let count = 0;
    for (let i = 0; i < scores.length - 1; i++) {
        if (scores[i] == 100 && scores[i + 1] == 100) count++;
    }
    return count > 0;
}

function scoresClump(scores) {
    for (var i = 0; i < scores.length - 1; i++) {
        if (scores[i + 2] - scores[i] <= 2) {
            return true;
        }
    }
    return false;
}

function scoresAverage(scores) {
    function average(nums) {
        var sum = 0;
        for (var i = 0; i < nums.length; i++) {
            sum += nums[i]
        }
        return sum / nums.length;
    }

    var half = scores.length / 2
    var first = [];
    var second = [];

    for (var i = 0; i < half; i++) {
        first.push(scores[i])
    };

    for (var i = half; i < scores.length; i++) {
        second.push(scores[i])
    };

    var av1 = average(first);
    var av2 = average(second);

    if (av1 > av2) {
        return av1;
    }
    return av2
}

function wordsCount(words, len) {
    let count = 0;
    for (let i = 0; i < words.length; i++) {
        const element = words[i];
        if (element.length == len) count++;
    }
    return count;
}

/*
Given an array of strings, return a new array containing the first N strings. 
N will be in the range 1..length.

Examples

wordsFront(['a', 'b', 'c', 'd'], 1) → a
wordsFront(['a', 'b', 'c', 'd'], 2) → a,b
wordsFront(['a', 'b', 'c', 'd'], 3) → a,b,c
*/

function wordsFront(words, n) {
    let newWords = [];
    for (let i = 0; i < n; i++) {
        const element = words[i];
        newWords.push(element);
    }
    return newWords;
}

/*
Given an array of strings, return a new List (e.g. an ArrayList) 
where all the strings of the given length are omitted. See wordsWithout() 
below which is more difficult because it uses arrays.

Examples

wordsWithoutList(['a', 'bb', 'b', 'ccc'], 1) → bb,ccc
wordsWithoutList(['a', 'bb', 'b', 'ccc'], 3) → a,bb,b
wordsWithoutList(['a', 'bb', 'b', 'ccc'], 4) → a,bb,b,ccc
*/
function wordsWithoutList(words, len) {
    let newWords = [];
    for (let i = 0; i < words.length; i++) {
        const element = words[i];
        if (element.length != len) {
            newWords.push(element);
        }
    }
    return newWords;
}

/*
Given a positive int n, return true if it contains a 1 digit. 
Note: use % to get the rightmost digit, and / to discard the rightmost digit.

Examples

hasOne(10) → true
hasOne(22) → false
hasOne(220) → false
*/

function hasOne(n) {
    while (n > 0) {
        let d = n % 10;
        if (d === 1) return true;
        n = Math.floor(n / 10);
    }
    return false;
}

/*
We'll say that a positive int divides itself if every digit in the number divides into the number evenly. 
So for example 128 divides itself since 1, 2, and 8 all divide into 128 evenly. 
We'll say that 0 does not divide into anything evenly, so no number with a 0 digit divides itself. 
Note: use % to get the rightmost digit, and / to discard the rightmost digit.

Examples

dividesSelf(128) → true
dividesSelf(12) → true
dividesSelf(120) → false
*/

function dividesSelf(n) {
    let temp = n;
    while (temp > 0) {
        let d = temp % 10;
        if (n % d != 0) return false;
        temp = Math.floor(temp / 10);
    }
    return true;
}

/*
Given an array of positive ints, 
return a new array of length "count" containing the first even numbers from the original array. 
The original array will contain at least "count" even numbers.

Examples

copyEvens([3, 2, 4, 5, 8], 2) → 2,4
copyEvens([3, 2, 4, 5, 8], 3) → 2,4,8
copyEvens([6, 1, 2, 4, 5, 8], 3) → 6,2,4
*/

function copyEvens(nums, count) {
    let newArr = [];
    for (let i = 0; i < nums.length, newArr.length < count; i++) {
        const element = nums[i];
        if (element % 2 == 0) {
            newArr.push(element);
        }
    }
    return newArr;
}

/*
We'll say that a positive int n is "endy" if it is in the range 0..10 or 90..100 (inclusive). 
Given an array of positive ints, 
return a new array of length "count" containing the first endy numbers from the original array. 
Decompose out a separate isEndy(int n) method to test if a number is endy. 
The original array will contain at least "count" endy numbers.

Examples

copyEndy([9, 11, 90, 22, 6], 2) → 9,90
copyEndy([9, 11, 90, 22, 6], 3) → 9,90,6
copyEndy([12, 1, 1, 13, 0, 20], 2) → 1,1
*/

function copyEndy(nums, count) {
    let newArr = [];
    for (let i = 0; i < nums.length, newArr.length < count; i++) {
        const element = nums[i];
        if (element < 10 && element >= 0) {
            newArr.push(element);
        } else if (element < 100 && element >= 90) {
            newArr.push(element);
        }
    }
    return newArr;
}

/*
Given arrays nums1 and nums2 of the same length, for every element in nums1, 
consider the corresponding element in nums2 (at the same index). 
Return the count of the number of times that the two elements differ by 2 or less, but are not equal.

Examples

matchUp([1, 2, 3], [2, 3, 10]) → 0
matchUp([1, 2, 3], [2, 3, 5]) → 0
matchUp([1, 2, 3], [2, 3, 3]) → 0
*/

function matchUp(a, b) {
    let count = 0;
    for (let j = 0; j < a.length; j++) {
        if (Math.abs(a[j] - b[j]) == 2 && Math.abs(a[j] - b[j]) == 2) {
            count++;
        }
    }
    return count;
}

/*
Given an array of ints, return true if the array contains two 7's next to each other, 
or there are two 7's separated by one element, such as with {7, 1, 7}.

Examples

has77([1, 7, 7]) → true
has77([1, 7, 1, 7]) → true
has77([1, 7, 1, 1, 7]) → false
*/

function has77(nums) {
    for (var i = 0; i < nums.length - 1; i++) {
        if ((nums[i] == 7 && nums[i + 1] == 7) || (nums[i] == 7 && nums[i + 2] == 7)) {
            return true;
        }
    }
    return false;
}
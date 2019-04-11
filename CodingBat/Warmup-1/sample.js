function endUp(str) {
    if (str.length < 3) return str.toUpperCase();
    return str.substring(0, str.length - 3) + str.substring(str.length - 3).toUpperCase();
}

/*
Given a non-empty string and an int N, return the string made starting with char 0,
and then every Nth char of the string.
So if N is 3, use char 0, 3, 6, ... and so on. N is 1 or more.

Examples

everyNth('Miracle', 2) → Mrce
everyNth('abcdefg', 2) → aceg
everyNth('abcdefg', 3) → adg
*/

function everyNth(str, n) {
    let newStr = '';
    for (let i = 0; i < str.length; i += n) {
        newStr += str.charAt(i);
    }
    return newStr;
}

"use strict";

function nonUniqueElements(data) {
    var temp = [];
    for (var i = 0; i < data.length; i++) {
        var f = data.indexOf(data[i]);
        var l = data.lastIndexOf(data[i]);
        if (f == l) {
            data.splice(i, 1);
            i = -1;
        }
    }
    return data;
}

var assert = require('assert');

if (!global.is_checking) {
    assert.deepEqual(nonUniqueElements([1, 2, 3, 1, 3]), [1, 3, 1, 3], "1st example");
    assert.deepEqual(nonUniqueElements([1, 2, 3, 4, 5]), [], "2nd example");
    assert.deepEqual(nonUniqueElements([5, 5, 5, 5, 5]), [5, 5, 5, 5, 5], "3rd example");
    assert.deepEqual(nonUniqueElements([10, 9, 10, 10, 9, 8]), [10, 9, 10, 10, 9], "4th example");
    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}

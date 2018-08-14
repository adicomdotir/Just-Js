function chunkArrayInGroups(arr, size) {
    var arraySize  = arr.length/size;
    var newArray = [];
    for (var i = 0; i < arraySize; i++) {
        var subArray= arr.splice(0, size);
        newArray.push(subArray);
    }
    return newArray;
}
chunkArrayInGroups(["a", "b", "c", "d"], 2);

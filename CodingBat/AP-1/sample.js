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
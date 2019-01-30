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
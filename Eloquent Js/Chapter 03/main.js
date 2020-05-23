
const min = (a, b) => {
    return a < b ? a : b;
};

const isEven = (number) => {
    if (number === 0) return true;
    else if (number === 1) return false;
    return isEven(number - 2);
};

function main() {
    console.log('min(10, 15) => ' + min(10, 15));
    console.log('min(1, 5) => ' + min(1, 5));
    console.log('min(-1, 55) => ' + min(-1, 55));
    console.log('min(15, -5) => ' + min(15, -5));
    console.log('min(21, 0) => ' + min(21, 0));
    console.log('min(81, 5) => ' + min(81, 5));

    console.log(isEven(50));
    console.log(isEven(75));
}

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

function simDigits1 (n) {
    if (n <= 0) return 0;
    return n % 10 + simDigits1(Math.floor(n / 10));
}

function count7(n){
    var count = 0;
    if (n <= 0) return 0;
    if (n % 10 == 7) count = 1;
    return count + count7(Math.floor(n / 10));
}

function count8(n){
    if (n <= 0) return 0;
    if (n % 10 == 8) {
        if (Math.floor(n / 10) % 10 == 8)
            return 2 + count(Math.floor(n / 10));
        else return 1 + count(Math.floor(n / 10));
    }
    return count(Math.floor(n / 10));
}
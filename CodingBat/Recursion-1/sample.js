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
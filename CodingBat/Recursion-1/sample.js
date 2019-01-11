function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1)
}

function bunnyEars(bunnies) {
    if (bunnies <= 0) return 0;
    return 2 + bunnyEarsRecursive(bunnies - 1);;
}
class DynamicProgrammingTop10Question {
    // http://kahu.ir/question/11530/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D9%86%D9%88%DB%8C%D8%B3%DB%8C-%D9%BE%D9%88%DB%8C%D8%A7-%DA%86%DB%8C%D8%B3%D8%AA-%D9%88-%D9%85%D8%B3%D8%A7%D8%A6%D9%84-%D9%85%D9%87%D9%85-%D8%A2%D9%86-%DA%A9%D8%AF%D8%A7%D9%85%D9%86%D8%AF-%D9%82%D8%B3%D9%85%D8%AA-%D8%A7%D9%88%D9%84/

    fibonacci(n: number) {
        // n امین عدد دنباله ی فیبوناچی را بدست آورید (خیلی خیلی ساده)
        let idx = 2;
        let previousNumber = 0;
        let currectNumber = 1;
        if (n === 0) {
            return 0;
        }
        if (n === 1) {
            return 1;
        }
        while (idx <= n) {
            const tmp = previousNumber + 2 * currectNumber;
            previousNumber = currectNumber;
            currectNumber = tmp;
            idx += 1;
        }
        return currectNumber;
    }

    questionTwo(n: number) {
        // n را از ورودی بگیر و تعداد راهای نوشتن آن با اعداد 1 و 3 و4 را بدست آورید
        //  (ساده) مثلا عدد 5 را می توان به 5 روش نوشت.

        // n = 1 => {[1]} => 1
        // n = 2 => {[1 + 1]} => 1
        // n = 3 => {[3]} => 1
        // n = 4 => {[4]} => 1
        // n = 5 => {[4 + 1], [3 + 1 + 1], []} => 1
    }

    questionThree(arr: number[]) {
        // دنباله ای داریم از n عدد صحیح (مثبت و منفی) بزرگترین
        // زیر آرایه متوالی با بیشرترین مجموع را بیابید.(ساده و معروف)
    }

    questionFour(arr: number[]) {
        // دنباله ای داریم از n عدد صحیح (مثبت و منفی)
        // طول بزگترین زیر دنباله ی صعودی را بیابیید.(ساده و معروف)
    }

    questionFive(arr, k) {
        // فردی دارای n نوع سکه است و می خواهد اسکناس k تومانی خود را با این سکه ها خرد کند.
        // کمترین تعداد سکه های لازم را بیابیید.
        // ابتدا n را دریافت کرده و سپس n نوع سکه را دریافت کرده و k را دریافت کنید.(ساده و معروف)
        const myArray: any[][] = [];
        console.log(myArray);
    }
}

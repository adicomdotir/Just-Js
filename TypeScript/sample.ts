class Collection {
    array = [];

    constructor(array: number[]) {
        this.array = array;
    }

    compareCollection(a: number[], b: number[]): boolean {
        if (this.convertToCode(a) === this.convertToCode(b)) {
            return true;
        }
        return false;
    }

    convertToCode(b: number[]): number {
        const newArray = [];
        let code = 0;
        for (const t of b) {
            let exist = false;
            for (let i = 0; i < this.array.length; i++) {
                if (this.array[i] === t) {
                    newArray.push(i);
                    exist = true;
                    break;
                }
            }
            if (exist === false) {
                return -1;
            }
        }
        for (const i of newArray) {
            code += Math.pow(2, i);
        }
        return code;
    }
}


function main(): void {
    const myArray = new MyArray(10, 20, 35, 100);

    myArray.forEach((value, index, array) => {
        console.log(`Index=${index}, Value=${value}, Array=${this.arrayToString(array)}`);
    });

    let tempArray = myArray.filter((item) => item % 2 === 0);
    console.log(tempArray);
    
    tempArray = myArray.map((item) => item * 3);
    console.log(tempArray);
}




   function myTest(n: number, index, result) {
        if (index > n) {
            console.log(result);
            return;
        }
        for (let i = 1; i <= n; i++) {
            this.myTest(n, index + 1, result + i + ' ');
        }
    }


// تصاعد حسابی
function arithmeticProgression(n, k, a: Array<number>) {
	let counter = 0;
	let newNums = [];
	for (let x = -100000; x <= 100000; x++) {
		let newCounter = 0;
		const temp = [];
		for (let i = 0; i < a.length; i++) {
			const newA = Math.abs(x + i * k - a[i]);
			newCounter += newA;
			temp.push(x + i * k);
		}
		if (counter === 0 || counter > newCounter) {
			counter = newCounter;
			newNums = [];
			newNums = temp;
		}
	}
	console.log(counter, newNums);
}

function goliland(n, q, happiness: Array<number>, dayTemperature: Array<number>) {
	for (let i = 0; i < q; i++) {
	    let sad = 0;
	    for (let j = 0; j < n; j++) {
		if (happiness[j] < dayTemperature[i]) {
		    sad += 1;
		}
	    }
	    console.log(sad);
	}
}

function traiangle(n: number) {
	const arr = [];
	for (let a = 1; a <= n; a++) {
	    for (let b = a; b <= n; b++) {
		const c = n - a - b;
		if (a + b > c && b <= c) {
		    arr.push({a, b, c});
		}
	    }
	}
	console.log(arr.length, arr);
}



function arrayToString(array: any[]): string {
    return `[${array.join(', ')}]`;
}

class MyArray {
    private arr: any[] = [];

    constructor(...args: any[]) {
        this.arr.push(...args);
    }

    setArray(arr: any[]): void {
        this.arr = [];
        this.arr.push(...arr);
    }

    getArray(): any[] {
        return this.arr;
    }

    forEach(callback: (value: any, index: number, array: any[]) => void): void {
        for (let i = 0; i < this.arr.length; i++) {
            callback(this.arr[i], i, this.arr);
        }
    }

    filter(callback: (item: any) => boolean): any[] {
        const newArr: any[] = [];
        for (const item of this.arr) {
            if (callback(item)) {
                newArr.push(item);
            }
        }
        return newArr;
    }

    map(callback: (item: any) => any): any[] {
        const newArr: any[] = [];
        for (const item of this.arr) {
            newArr.push(callback(item));
        }
        return newArr;
    }
}

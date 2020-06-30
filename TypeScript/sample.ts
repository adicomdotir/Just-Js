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
function main(): void {
	const myArray = new MyArray(10, 20, 35, 100);
	myArray.forEach((value, index, array) => {
		console.log(`Index=${index}, Value=${value}, Array=${this.arrayToString(array)}`);
	});
}

function arrayToString(array: any[]): string {
	return `[${array.join(', ')}]`;
}
		
class MyArray {
    arr: any[] = [];

    constructor(...args: any[]) {
        this.arr.push(...args);
    }

    forEach(callback: (value: any, index: number, array: any[]) => void): void {
        for (let i = 0; i < this.arr.length; i++) {
            callback(this.arr[i], i, this.arr);
        }
    }
}
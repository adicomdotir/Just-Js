this.func(0, '');
this.arr.forEach(x => {
	const values = x.split(',');
	let result = 0;
	for (let i = 0; i < this.index; i++) {
		result += this.ratio[i] * parseInt(values[i], 10);
	}
	if (Math.round(result) === 10) {
		console.log(x, result);
	}
});

index = 2;
arr: string[] = [];
ratio = [0.5, 1];
func(index, value: string) {
	// console.log(index, value);
	if (index < this.index) {
		for (let i = 1; i <= 20; i++) {
			const newValue = `${value},${i}`;
			this.func(index + 1, newValue);
		}
	} else {
		this.arr.push(`${value.substring(1)}`);
	}
}
/*
[1,1]=(1*0.5)+(1*1)=1.5
[1,2]=(1*0.5)+(2*1)=2.5
[1,3]=(1*0.5)+(3*1)=3.5
[2,1]=(2*0.5)+(1*1)=2
[2,2]=(2*0.5)+(2*1)=3
[2,3]=(2*0.5)+(3*1)=4
[3,1]=(3*0.5)+(1*1)=2.5
[3,2]=(3*0.5)+(2*1)=3.5
[3,3]=(3*0.5)+(3*1)=4.5
*/
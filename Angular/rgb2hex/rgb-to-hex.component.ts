import { Component } from '@angular/core';

@Component({
    selector: 'app-rgbtohex',
    template: `
    <table>
	  <tr>
		<td><label style="color: red;">RED:‌ </label></td>
		<td><input type="number" [(ngModel)]="redNumber" min="0" max="255" /></td>
	  </tr>
	  <tr>
		<td><label style="color: green;">GREEN: </label></td>
		<td><input type="number" [(ngModel)]="greenNumber" min="0" max="255" /></td>
	  </tr>
	  <tr>
		<td><label style="color: blue;">BLUE:‌ </label></td>
		<td><input type="number" [(ngModel)]="blueNumber" min="0" max="255" /></td>
	  </tr>
	  <tr>
		<td colspan="2"><span>Result: {{getHexColor()}}</span></td>
	  </tr>
	  <tr>
		<td colspan="2">
		  <div [style.background-color]="hexColor">&nbsp;</div>
		</td>
	  </tr>
	</table>
    `,
    styles: []
})
export class RgbToHexComponent {
    redNumber = 0;
	greenNumber = 0;
	blueNumber = 0;
	hexColor = '000000';

	getHexColor(): string {
	if (
	  this.redNumber < 0 ||
	  this.redNumber > 255 ||
	  this.greenNumber < 0 ||
	  this.greenNumber > 255 ||
	  this.blueNumber < 0 ||
	  this.blueNumber > 255
	) {
	  return "value must be 0-255";
	}
	const redHex = this.decimalToHex(this.redNumber);
	const greenHex = this.decimalToHex(this.greenNumber);
	const blueHex = this.decimalToHex(this.blueNumber);
	this.hexColor = '#' + redHex + greenHex + blueHex;
	return this.hexColor;
	}

	decimalToHex(value: number): string {
	let res = "";
	while (value > 0) {
	  const reminder = value % 16;
	  value = Math.floor(value / 16);
	  res += this.numberToLetter(reminder);
	}
	if (res.length === 0) {
	  res += "00";
	} else if (res.length === 1) {
	  res += "0";
	}
	return res
	  .split("")
	  .reverse()
	  .join("");
	}

	numberToLetter(value: number): string {
	switch (value) {
	  case 10:
		return "A";
	  case 11:
		return "B";
	  case 12:
		return "C";
	  case 13:
		return "D";
	  case 14:
		return "E";
	  case 15:
		return "F";
	}
	return value.toString();
	}
}

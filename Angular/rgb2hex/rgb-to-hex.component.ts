import { Component } from '@angular/core';

@Component({
    selector: 'app-rgbtohex',
    template: `
    <div>
    <label style="color: red;">RED:‌ </label>
        <input type="number" [(ngModel)]="redNumber" min="0" max="255" />
    </div>
    <div>
        <label style="color: green;">GREEN: </label>
        <input type="number" [(ngModel)]="greenNumber" min="0" max="255" />
    </div>
    <div>
        <label style="color: blue;">BLUE: </label>
        <input type="number" [(ngModel)]="blueNumber" min="0" max="255" />
    </div>
    <div>
        <span>Result: {{getHexColor()}}</span>
    </div>
    `,
    styles: []
})
export class RgbToHexComponent {
    redNumber = 0;
    greenNumber = 0;
    blueNumber = 0;

    getHexColor(): string {
        if (
            this.redNumber < 0 ||
            this.redNumber > 255 ||
            this.greenNumber < 0 ||
            this.greenNumber > 255 ||
            this.blueNumber < 0 ||
            this.blueNumber > 255
        ) {
            return 'value must be 0-255';
        }
        const redHex = this.decimalToHex(this.redNumber);
        const greenHex = this.decimalToHex(this.greenNumber);
        const blueHex = this.decimalToHex(this.blueNumber);
        return redHex + greenHex + blueHex;
    }

    decimalToHex(value: number): string {
        let res = '';
        while (value > 0) {
            const reminder = value % 10;
            value = Math.floor(value / 10);
            res = this.numberToLetter(reminder);
        }
        return res
            .split('')
            .reverse()
            .join('');
    }

    numberToLetter(value: number): string {
        switch (value) {
            case 10:
                return 'A';
            case 11:
                return 'B';
            case 12:
                return 'C';
            case 13:
                return 'D';
            case 14:
                return 'E';
            case 15:
                return 'F';
        }
        return value.toString();
    }
}

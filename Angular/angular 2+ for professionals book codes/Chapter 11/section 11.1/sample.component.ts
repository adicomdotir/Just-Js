import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'even'
})
export class EvenPipe implements PipeTransform {
    transform(value: string): string {
        if (value && value % 2 === 0) {
            return value;
        }
    }
}
@Component({
    selector: 'example-component',
    template: `<div>
        < div * ngFor="let number of numbers | even">
            {{ number }}
    </div>
    < /div>`
})
export class exampleComponent {
    let numbers: List<number> = Array.apply(null, { length: 10 }).map(Number.call, Number)
}
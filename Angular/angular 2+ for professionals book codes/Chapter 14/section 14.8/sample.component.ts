import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'truthy'})
export class Truthy implements PipeTransform {
	transform(value: any, truthy: string, falsey: string): any {
		if (typeof value === 'boolean') {
			return value ? truthy : falsey;
		}
		else return value
	}
}


import { Truthy} from './pipes.pipe';
@Component({
	selector: 'my-component',
	template: `
		<p>{{value | truthy:'enabled':'disabled' }}</p>
	`,
	pipes: [Truthy]
})
export class MyComponent{ }

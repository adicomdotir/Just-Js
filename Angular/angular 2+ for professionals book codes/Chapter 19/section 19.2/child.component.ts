import { Component, Input, OnChanges } from "../../../node_modules/@angular/core";

@Component({
    selector: 'app-child',
    template: '<b>Hello {{name.length}}, This is child</b>'
})
export class ChildComponent implements OnChanges {
    @Input()
    name: any;

    ngOnChanges() {

    }
}
/*

*/


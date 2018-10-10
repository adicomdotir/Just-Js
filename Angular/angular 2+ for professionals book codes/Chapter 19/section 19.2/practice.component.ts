import { Component, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from "../../../node_modules/@angular/core";
import { Observable, Subscriber } from "../../../node_modules/rxjs";
import { VERSION } from "../../../node_modules/@angular/common";
import { of } from 'rxjs';
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { ChildComponent } from './child.component';

@Component({
    selector: 'app-practice',
    template: `<div>
    {{my|json}}
    <hr>
    <b *ngFor='let item of names | async'>{{item}}</b>
    {{names|async}}
    </div>
    <div>
 <h2>Hello {{name}}</h2>
 <input type="button" value="Click me to add element" (click) = addElement()> // call the
function on click of the button
 <div #parent> </div> // Dynamic component will be loaded here
 </div>`,
    providers: []
})
export class PracticeComponent {
    my: object = { foo: 'bar', baz: 'qux', nested: { xyz: 3, numbers: [1, 2, 3, 4, 5] } };
    names = of(['One', 'two', 'three']);

    @ViewChild('parent', {read: ViewContainerRef}) target: ViewContainerRef;
    private componentRef: ComponentRef<any>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    addElement() {
        let childComponent = this.componentFactoryResolver.resolveComponentFactory(ChildComponent);
        this.componentRef = this.target.createComponent(childComponent);
    }
}

/*
*/
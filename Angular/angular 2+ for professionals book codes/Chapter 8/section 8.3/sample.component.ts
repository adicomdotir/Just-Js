import { Component, OnChanges, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChildComponent } from './child.component';

@Component({
    selector: 'parent-component',
    template: `
 		<child-component [data]="asyncData"></child-component>
 	`
})
export class ParentComponent {

    asyncData: any;

    constructor(private _http: Http) { }

    ngOnInit() {
        this._http.get('some.url')
            .map(this.extractData)
            .subscribe(this.handleData)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    handleData(data: any) {
        this.asyncData = data;
    }

    handleError(error: any) {
        console.error(error);
    }
}

@Component({
    selector: 'child-component',
    template: `
    	<p *ngIf="doesDataExist">Hello child</p>
    `
})
export class ChildComponent {

    doesDataExist: boolean = false;
    @Input('data') data: any;
    // Runs whenever component @Inputs change
    ngOnChanges() {
        // Check if the data exists before using it
        if (this.data) {
           	this.useData(data);
        }
    }
    
    // contrived example to assign data to reliesOnData
    useData(data) {
        this.doesDataExist = true;
    }
}
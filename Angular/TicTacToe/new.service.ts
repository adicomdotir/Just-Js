import { Injectable } from "../../../../node_modules/@angular/core";
import { Subject } from "../../../../node_modules/rxjs";

@Injectable({
    providedIn: 'root'
})
export class NewService {
    private id: number = Math.round(Math.random() * 1000000);

    reset = new Subject();
    reset$ = this.reset.asObservable();

    constructor() {}

    callMethod() {
        console.log('NewService: ' + this.id);
    }
}
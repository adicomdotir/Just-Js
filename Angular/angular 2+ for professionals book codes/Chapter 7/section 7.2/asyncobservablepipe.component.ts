import { Component } from "../../../node_modules/@angular/core";
import { Observable, Subscriber } from "../../../node_modules/rxjs";

@Component({
    selector: 'app-practice',
    template: `
    <b>{{time | async}}</b>
    <button>Ok</button>
    `,
    providers: []
})
export class AsyncObservablePipeComponent {

    time = new Observable<string>((observer: Subscriber<string>) => {
        setInterval(() => observer.next(new Date().toString()), 1000);
    });
}
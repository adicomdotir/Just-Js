import { Component } from "../../../node_modules/@angular/core";
import { Observable, Subscriber } from "../../../node_modules/rxjs";
import { VERSION } from "../../../node_modules/@angular/common";
import {of} from 'rxjs';
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { Movie } from "./movie";

@Component({
    selector: 'app-practice',
    template: `<div>
    {{my|json}}
    <hr>
    <b *ngFor='let item of names | async'>{{item}}</b>
    {{names|async}}
    </div>`,
    providers: []
})
export class PracticeComponent {
    my: object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};
    names = of(['One', 'two', 'three']);
    movies: Movie[];

    constructor(private route: ActivatedRoute) {
        route.data.subscribe(data => this.movies = data.movies);
    }
}

/*
*/
import { Injectable } from "../../../node_modules/@angular/core";
import { Http } from '@angular/http';
import { Observable } from "../../../node_modules/rxjs";
import { Movie } from "./movie";
import { map } from 'rxjs/operators';

@Injectable()
export class MoviesService {
    constructor(private http: Http) {

    }

    index(): Observable<Movie[]> {
        return this.http.get('http://moviesapi.ir/api/v1/movies?page=1')
            .pipe(map(res => res.json()));
    }

    get(id: number | string): Observable<Movie> {
        return this.http.get('http://moviesapi.ir/api/v1/movies/' + id)
            .pipe(map(res => res.json()));
    }
}
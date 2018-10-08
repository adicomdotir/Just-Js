import { MoviesService } from './movies.service';
import { Observable } from "../../../node_modules/rxjs";
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { Movie } from './movie';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class MoviesResolver implements Resolve<Movie[] | Movie> {
    // Inject UsersService into the resolver
    constructor(private service: MoviesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[] | Movie> {
        // If userId param exists in current URL, return a single user, else return all users
        // Uses brackets notation to access `id` to suppress editor warning, may use dot notation if
        // you create an interface extending ActivatedRoute with an optional id ? attribute
        if (route.params['id']) return this.service.get(route.params['id']);
        return this.service.index();
    }
}

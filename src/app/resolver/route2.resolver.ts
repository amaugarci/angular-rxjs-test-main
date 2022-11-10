import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Subject, forkJoin, Observable, of } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';
import { LoadingSpinnerOverlayService } from '../services/loading-spinner-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class CustomRouteDataResolver2 implements Resolve<string> {
  completionNotifier$ = new Subject<boolean>();
  constructor(
    private loadingSpinner: LoadingSpinnerOverlayService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    setTimeout(() => {
      console.log(`completionNotifier$.next`)
      this.completionNotifier$.next(false);
    }, 2000);
    return of([route.params, route.queryParams])
      .pipe(
        tap(() => this.loadingSpinner.show()),
        concatMap(([{ id }, { j }]) => forkJoin([
          this.completionNotifier$
            .pipe(first()),
          of(`${id}-${j}`)
        ])),
        tap(() => this.loadingSpinner.hide()),
        map(([a, x]) => x)
      );
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';
import { LoadingSpinnerOverlayService } from '../services/loading-spinner-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class CustomRouteDataResolver implements Resolve<string> {
  completionNotifier$ = new Subject<boolean>();

  constructor(
    private loadingSpinner: LoadingSpinnerOverlayService
  ) {
    setTimeout(() => {
      console.log(`completionNotifier$.next`)
      this.completionNotifier$.next(true);
    }, 2000)
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {


    return of([route.params, route.queryParams])
      .pipe(
        tap(() => {
          console.log(`loadingSpinner.show`)
          this.loadingSpinner.show()
        }),
        concatMap(([{ id }, { j }]) => forkJoin([
          this.completionNotifier$.pipe(first()),
          of(`${id}-${j}`)
        ])),
        tap(() => {
          console.log(`loadingSpinner.hide`)
          this.loadingSpinner.hide();
        }),
        map(([a, x]) => x)
      );
  }
}

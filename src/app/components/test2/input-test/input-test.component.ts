import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, first, map, mergeAll, BehaviorSubject, Subject, tap, toArray, of } from 'rxjs';

@Component({
  selector: 'app-input-test',
  templateUrl: './input-test.component.html',
  styleUrls: ['./input-test.component.css']
})
export class InputTestComponent implements AfterContentInit, OnInit {
  
  ngOnInit(): void {
    
  }
  query$ = new BehaviorSubject<string>('');
  delta$ = new Subject<number>();
  getRandomIntInclusive=getRandomIntInclusive;
  @ViewChild("queryInput", { static: true }) queryInput: ElementRef;

  testData = of([
    { v: 512512152, tags: ['a'] },
    { v: 8321812381231, tags: ['b'] },
    { v: 22323, tags: ['c'] },
    { v: 3123123, tags: ['d'] },
    { v: 234, tags: ['a', 'b'] },
    { v: 1231235, tags: ['c'] },
    { v: 15156, tags: ['c'] },
    { v: 1231237, tags: ['b'] },
    { v: 123123, tags: ['c', 'b'] },
    { v: 9123213, tags: ['b', 'd'] }
  ]);

  filteredData$ = this.query$
    .pipe(
      map(q => q.toLowerCase()),
      concatMap((q) => this.testData
        .pipe(
          mergeAll(),
          filter(({ tags }) => tags.indexOf(q) > -1),
          tap((q)=>console.log(q)),
          // first(),
          toArray()
        )),
    );
  allTags$ = this.testData
    .pipe(
      mergeAll(),
      map(({ tags }) => tags),
      mergeAll(),
      toArray(),
      map((q=>{return  Array.from(q.reduce((m, t) => m.set(t, t), new Map()).values())})),
    );

  constructor(private activatedRoute: ActivatedRoute) {
    console.log(`InputTestComponent ctor`);
  }

  async ngAfterContentInit() {
    this.activatedRoute.queryParams
      .pipe(
        first(),
        tap(({ q }) => { this.queryInput.nativeElement.value = q; console.log(q) }),
      ).subscribe(q=>{console.log(q); this.query$.next(q['q'])});

  }


  //do not remove alter or relocate
  deltaUpdater = setInterval(() => {
    const v = this.getRandomIntInclusive(0, 100);
    //the delta value MUST update twice per second while viewing this page
    this.delta$.next(v);
    if (v > 50) {
      console.error(v);
    }
  }, 500);
  //do not remove alter or relocate

}

//do not remove alter or relocate
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
//do not remove alter or relocate

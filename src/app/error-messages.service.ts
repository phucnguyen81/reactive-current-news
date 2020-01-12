import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  private readonly cancel$: rx.Subject<any>;

  constructor(
    private context: CurrentNewsService,
    private snackBar: MatSnackBar,
  ) {
    this.cancel$ = new rx.Subject<any>();

    context.output$.pipe(
      ops.distinctUntilChanged(
        (s1: CurrentNewsState, s2: CurrentNewsState) => {
          return (s1.latestNewsError === s2.latestNewsError);
        }
      ),
      ops.map(state => state.latestNewsError),
      ops.filter(state => !!state),
      ops.tap(error => {
        snackBar.open(error, 'Dismiss', {
          duration: 4000,
        });
      }),
      ops.takeUntil(this.cancel$),
    ).subscribe();
  }

  detach(): void {
    this.cancel$.next(true);
    this.cancel$.complete();
  }

}

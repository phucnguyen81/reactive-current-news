import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesControl } from './error-messages.control';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  private readonly unsubscribe$ = new rx.Subject<any>();

  attach(
    currentNews: CurrentNewsService,
    snackBar: MatSnackBar,
  ): void {
    const errorMessages = new ErrorMessagesControl(
      snackBar,
      currentNews.output$.pipe(
        ops.map<CurrentNewsState, string>(
          state => state.latestNewsError
        )
      ),
    );

    errorMessages.output$.pipe(
      ops.takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  detach(): void {
    this.unsubscribe$.next(true);
  }

}

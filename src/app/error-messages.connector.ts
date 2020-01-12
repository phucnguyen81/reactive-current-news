import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsConnector } from './current-news.connector';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesControl } from './error-messages.control';

export class ErrorMessagesConnector {

  constructor(private snackBar: MatSnackBar) {}

  connect(currentNews: CurrentNewsConnector): void {
    const errorMessages = new ErrorMessagesControl(
      this.snackBar,
      currentNews.output$.pipe(
        ops.map<CurrentNewsState, string>(
          state => state.latestNewsError
        )
      ),
    );

    errorMessages.output$.pipe(
      ops.takeUntil(currentNews.finish$)
    ).subscribe();
  }

}

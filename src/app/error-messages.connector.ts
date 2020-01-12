import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesControl } from './error-messages.control';

export class ErrorMessagesConnector {

  constructor(private snackBar: MatSnackBar) {}

  connect(appService: AppService): void {
    const errorMessages = new ErrorMessagesControl(
      this.snackBar,
      appService.output$.pipe(
        ops.map<CurrentNewsState, string>(
          state => state.latestNewsError
        )
      ),
    );

    errorMessages.output$.pipe(
      ops.takeUntil(appService.finish$)
    ).subscribe();
  }

}

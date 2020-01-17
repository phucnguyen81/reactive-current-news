import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { GotoSettings } from './current-news.events';

import { AppService } from './app.service';
import { CurrentNewsState } from './current-news.state';
import { MissingApiKeyControl } from './missing-api-key.control';

export class MissingApiKeyConnector {

  readonly output$: rx.Observable<events.AppEvent> =
    this.appService.output$.pipe(
      showMissingApiKeyMessage(this.snackBar),
    );

  constructor(
    private snackBar: MatSnackBar,
    private appService: AppService,
  ) {}

}

function showMissingApiKeyMessage(
  snackBar: MatSnackBar
): rx.OperatorFunction<CurrentNewsState, events.AppEvent> {
  return (currentNews$: rx.Observable<CurrentNewsState>) => {
    const control = new MissingApiKeyControl(
      currentNews$,
      snackBar,
    );

    return control.onSettings$.pipe(
      ops.map(() => { return new events.GotoSettings(); }),
    );
  };
}


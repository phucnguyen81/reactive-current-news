import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';
import { CurrentNewsState } from './current-news.state';
import { SnackBarControl } from './snackbar.control';
import { MissingApiKeyControl } from './missing-api-key.control';

export class MissingApiKeyConnector {

  constructor(private snackBar: MatSnackBar) {}

  connect(appService: AppService): void {
    const control = new MissingApiKeyControl(
      appService.output$,
      this.snackBar,
    );

    control.onSettings$.pipe(
      ops.tap(() => {
        appService.goToSettings();
      }),
      ops.takeUntil(appService.finish$)
    ).subscribe();
  }

}

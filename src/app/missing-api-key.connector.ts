import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';
import { CurrentNewsState } from './current-news.state';
import { MissingApiKeyControl } from './missing-api-key.control';

export class MissingApiKeyConnector {

  constructor(private snackBar: MatSnackBar) {}

  connect(appService: AppService): void {
    const missingApiKey$ = appService.output$.pipe(
      ops.map<CurrentNewsState, string>(state => {
        if (state.apiKey) {
          return '';
        }
        if (state.fetchingLatestNews) {
          return 'Fetching requires API Key';
        }
        return 'Missing API Key';
      })
    );

    const errorMessages = new MissingApiKeyControl(
      this.snackBar,
      missingApiKey$,
    );

    errorMessages.output$.pipe(
      ops.takeUntil(appService.finish$)
    ).subscribe();
  }

}

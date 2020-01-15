import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsState } from './current-news.state';
import { SnackBarControl } from './snackbar.control';

export class MissingApiKeyControl {

  private readonly missingApiKey$: rx.Observable<string> =
    this.currentNews$.pipe(
      ops.map<CurrentNewsState, string>(state => {
        if (state.apiKey) { return ''; }
        else if (state.fetchingLatestNews) {
          return 'Fetching requires API Key';
        }
        else { return 'Missing API Key'; }
      })
    );

  readonly onSettings$: rx.Observable<any> = new SnackBarControl(
    this.snackBar, this.missingApiKey$, 'Settings'
  ).onAction$;

  constructor(
    private currentNews$: rx.Observable<CurrentNewsState>,
    private snackBar: MatSnackBar,
  ) { }

}

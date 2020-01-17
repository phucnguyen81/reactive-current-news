import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { nextState } from './current-news.reducers';

import { ErrorMessagesConnector } from './error-messages.connector';
import { MissingApiKeyConnector } from './missing-api-key.connector';
import { CurrentsApiConnector } from './currentsapi.connector';
import { SettingsConnector } from './settings.connector';
import { RouterConnector } from './router.connector';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly input$ = new rx.Subject<events.AppEvent>();

  readonly output$: rx.Observable<CurrentNewsState> = this.input$.pipe(
    ops.scan<events.AppEvent, CurrentNewsState>(
      nextState, new CurrentNewsState()
    ),
    ops.shareReplay(1),
  );

  private readonly settings = new SettingsConnector();

  private readonly currentsapi = new CurrentsApiConnector(
    this.httpClient, this
  );

  private readonly errorMessages = new ErrorMessagesConnector(
    this.snackBar, this
  );

  private readonly missingApiKey = new MissingApiKeyConnector(
    this.snackBar, this
  );

  private readonly rounting = new RouterConnector(
    this.router, this
  );

  private readonly effect$ = rx.merge<events.AppEvent>(
    this.currentsapi.output$,
    this.errorMessages.output$,
    this.settings.output$,
    this.missingApiKey.output$,
    this.rounting.output$,
  );

  private readonly effectSubscription = this.effect$.subscribe(
    this.input$
  );

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  start(): void {
    this.fetchLatestNews();
  }

  stop(): void {
    this.cancelFetchingLatestNews();
    this.effectSubscription.unsubscribe();
  }

  send(event: events.AppEvent): void {
    this.input$.next(event);
  }

  fetchLatestNews(): void {
    this.input$.next(new events.FetchLatestNews());
  }

  cancelFetchingLatestNews(): void {
    this.input$.next(new events.CancelFetchingLatestNews());
  }

  goToHome(): void {
    this.rounting.gotoHome();
  }

  goToSettings(): void {
    this.rounting.gotoSettings();
  }

  goToStatus(): void {
    this.rounting.gotoStatus();
  }

  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

  changeApiKey(apiKey: string): void {
    this.settings.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.settings.saveApiKey();
  }

}

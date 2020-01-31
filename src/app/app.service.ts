import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { ContextService } from './context.service';
import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { nextState } from './current-news.reducers';

import { ContextConnector } from './context.connector';
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

  private readonly context = new ContextConnector(
    this.contextService, this
  );

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
    this.context.output$,
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
    private router: Router,
    private contextService: ContextService,
  ) { }

  send(event: events.AppEvent): void {
    this.input$.next(event);
  }

  start(): void {
    this.initFromContext();
    this.fetchLatestNews();
  }

  stop(): void {
    this.cancelFetchingLatestNews();
    this.effectSubscription.unsubscribe();
  }

  initFromContext(): void {
    const state: CurrentNewsState = this.context.loadState();
    if (state) {
      this.input$.next(new events.Init(state));
    }
  }

  save(): void {
    this.settings.saveApiKey();
    this.context.saveState();
  }

  openNewTab(url: string): void {
    this.context.openNewTab(url);
  }

  changeApiKey(apiKey: string): void {
    this.settings.changeApiKey(apiKey);
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

}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';

import { CurrentNewsConnector } from './current-news.connector';
import { ErrorMessagesConnector } from './error-messages.connector';
import { MissingApiKeyConnector } from './missing-api-key.connector';
import { CurrentsApiConnector } from './currentsapi.connector';
import { SettingsConnector } from './settings.connector';
import { RouterConnector } from './router.connector';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly currentNews = new CurrentNewsConnector();

  readonly input$: rx.Subject<events.AppEvent> =
    this.currentNews.input$;

  readonly output$: rx.Observable<CurrentNewsState> =
    this.currentNews.output$;

  readonly finish$ = new rx.Subject<any>();

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

  private readonly rounting = new RouterConnector(this.router, this);

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  start(): void {
    this.currentNews.output$.pipe<CurrentNewsState>(
      ops.takeUntil(this.finish$)
    ).subscribe();

    rx.merge<events.AppEvent>(
      this.currentsapi.output$,
      this.errorMessages.output$,
      this.settings.output$,
      this.missingApiKey.output$,
      this.rounting.output$,
    ).pipe<events.AppEvent>(
      ops.takeUntil(this.finish$)
    ).subscribe(this.input$);

    this.currentNews.fetchLatestNews();
  }

  stop(): void {
    this.currentNews.cancelFetchingLatestNews();
    this.finish$.next(true);
  }

  send(event: events.AppEvent): void {
    this.input$.next(event);
  }

  fetch(): void {
    this.currentNews.fetchLatestNews();
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

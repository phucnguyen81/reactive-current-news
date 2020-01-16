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

  readonly input$: rx.Subject<events.AppEvent>;

  readonly output$: rx.Observable<CurrentNewsState>;

  readonly finish$ = new rx.Subject<any>();

  private readonly currentNews: CurrentNewsConnector;

  private readonly settings: SettingsConnector;

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.settings = new SettingsConnector();

    this.currentNews = new CurrentNewsConnector();
    this.input$ = this.currentNews.input$;
    this.output$ = this.currentNews.output$.pipe(
      ops.shareReplay(1)
    );
  }

  start(): void {
    const currentNews = this.currentNews;
    const currentsapi = new CurrentsApiConnector(this.httpClient);
    const errorMessages = new ErrorMessagesConnector(this.snackBar);
    const missingApiKey = new MissingApiKeyConnector(this.snackBar);
    const settings = this.settings;
    const rounting = new RouterConnector(this.router);

    currentNews.connect(this);
    currentsapi.connect(this);
    errorMessages.connect(this);
    missingApiKey.connect(this);
    settings.connect(this);

    rx.merge<events.AppEvent>(
      rounting.connect(this)
    ).pipe<events.AppEvent>(
      ops.takeUntil(this.finish$)
    ).subscribe(this.input$);

    this.currentNews.start();
  }

  stop(): void {
    this.currentNews.stop();
    this.finish$.next(true);
  }

  fetch(): void {
    this.currentNews.fetchLatestNews();
  }

  goToHome(): void {
    this.input$.next(new events.GotoHome());
  }

  goToSettings(): void {
    this.input$.next(new events.GotoSettings());
  }

  goToStatus(): void {
    this.input$.next(new events.GotoStatus());
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

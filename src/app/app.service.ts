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
import { CurrentsApiConnector } from './currentsapi.connector';
import { SettingsConnector } from './settings.connector';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly input$: rx.Subject<events.AppEvent>;

  readonly output$ = new rx.BehaviorSubject<CurrentNewsState>(
    new CurrentNewsState()
  );

  readonly finish$ = new rx.Subject<any>();

  private readonly currentNews: CurrentNewsConnector;

  private readonly settings: SettingsConnector;

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.currentNews = new CurrentNewsConnector();
    this.input$ = this.currentNews.input$
    this.settings = new SettingsConnector();
  }

  start(): void {
    const currentNews = this.currentNews;
    const currentsapi = new CurrentsApiConnector(this.httpClient);
    const errorMessages = new ErrorMessagesConnector(this.snackBar);
    const settings = this.settings;

    currentNews.connect(this);
    currentsapi.connect(this);
    errorMessages.connect(this);
    settings.connect(this);

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
    this.router.navigate(['']);
  }

  goToSettings(): void {
    this.router.navigate(['settings']);
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

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsConnector } from './current-news.connector';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesConnector } from './error-messages.connector';
import { CurrentsApiConnector } from './currentsapi.connector';
import { SettingsConnector } from './settings.connector';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly output$: rx.Observable<CurrentNewsState>;

  private readonly currentNewsConnector: CurrentNewsConnector;

  private readonly settings: SettingsConnector;

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.currentNewsConnector = new CurrentNewsConnector(httpClient);
    this.output$ = this.currentNewsConnector.output$;
    this.settings = new SettingsConnector();
  }

  start(): void {
    const currentsapi = new CurrentsApiConnector(this.httpClient);
    const errorMessages = new ErrorMessagesConnector(this.snackBar);
    const settings = this.settings;

    currentsapi.connect(this.currentNewsConnector);
    errorMessages.connect(this.currentNewsConnector);
    settings.connect(this.currentNewsConnector);

    this.currentNewsConnector.start();
  }

  stop(): void {
    this.currentNewsConnector.stop();
    this.currentNewsConnector.finish();
  }

  fetch(): void {
    this.currentNewsConnector.fetchLatestNews();
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  goToSettings(): void {
    this.router.navigate(['settings']);
  }

  openNewTab(url: string): void {
    this.currentNewsConnector.openNewTab(url);
  }

  changeApiKey(apiKey: string): void {
    this.settings.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.settings.saveApiKey();
  }

}

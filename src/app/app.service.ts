import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesConnector } from './error-messages.connector';
import { CurrentsApiConnector } from './currentsapi.connector';
import { SettingsConnector } from './settings.connector';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly output$: rx.Observable<CurrentNewsState>;

  private readonly settings = new SettingsConnector();

  constructor(
    private currentNewsService: CurrentNewsService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
  ) {
    this.output$ = this.currentNewsService.output$;
  }

  attach(): void {
    const currentsapi = new CurrentsApiConnector(this.httpClient);
    const errorMessages = new ErrorMessagesConnector(this.snackBar);
    const settings = this.settings;

    currentsapi.connect(this.currentNewsService);
    errorMessages.connect(this.currentNewsService);
    settings.connect(this.currentNewsService);

    this.currentNewsService.start();
  }

  detach(): void {
    this.currentNewsService.stop();
    this.currentNewsService.finish();
  }

  fetch(): void {
    this.currentNewsService.fetchLatestNews();
  }

  goToHome(): void {
    this.currentNewsService.navigateHome();
  }

  goToSettings(): void {
    this.currentNewsService.navigateSettings();
  }

  openNewTab(url: string): void {
    this.currentNewsService.openNewTab(url);
  }

  changeApiKey(apiKey: string): void {
    this.settings.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.settings.saveApiKey();
  }

}

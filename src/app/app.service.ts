import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

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

  private readonly settings: SettingsConnector;

  constructor(
    private currentNewsService: CurrentNewsService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.output$ = this.currentNewsService.output$;
    this.settings = new SettingsConnector();
  }

  start(): void {
    const currentsapi = new CurrentsApiConnector(this.httpClient);
    const errorMessages = new ErrorMessagesConnector(this.snackBar);
    const settings = this.settings;

    currentsapi.connect(this.currentNewsService);
    errorMessages.connect(this.currentNewsService);
    settings.connect(this.currentNewsService);

    this.currentNewsService.start();
  }

  stop(): void {
    this.currentNewsService.stop();
    this.currentNewsService.finish();
  }

  fetch(): void {
    this.currentNewsService.fetchLatestNews();
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  goToSettings(): void {
    this.router.navigate(['settings']);
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

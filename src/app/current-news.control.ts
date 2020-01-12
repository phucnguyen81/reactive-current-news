import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpErrorResponse, HttpResponse, HttpHeaders
} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { LatestNewsResponse } from './current-news.adapter';
import { CurrentsApiPlant } from './currentsapi.plant';
import { CurrentNewsState } from './current-news.state';
import * as events from './current-news.events';
import { nextState } from './current-news.reducers';
import { CurrentsApiControl } from './currentsapi.control';
import { SettingsControl } from './settings.control';

export class CurrentNewsControl {

  readonly output$ = new rx.BehaviorSubject<CurrentNewsState>(
    new CurrentNewsState()
  );

  private readonly settingsControl = new SettingsControl();

  private readonly apiKey$ = this.settingsControl.apiKey$.pipe(
    ops.map(apiKey => new events.ApiKey(apiKey))
  );

  private readonly feedback$ = rx.merge(
    this.apiKey$,
  );

  readonly input$ = new rx.Subject<events.AppEvent>();

  private readonly finish$ = new rx.Subject<any>();

  private readonly state$: rx.Observable<CurrentNewsState> = rx.merge(
    this.input$,
    this.feedback$,
  ).pipe(
    ops.scan<events.AppEvent, CurrentNewsState>(
      nextState, new CurrentNewsState()
    ),
    ops.takeUntil(this.finish$),
  );

  constructor(private httpClient: HttpClient) {
    this.state$.subscribe(this.output$);
  }

  start(): void {
    this.input$.next(new events.Start());
  }

  stop(): void {
    this.input$.next(new events.Stop());
  }

  finish(): void {
    this.finish$.next(true);
  }

  fetchLatestNews(): void {
    this.input$.next(new events.FetchLatestNews());
  }

  cancelFetchingLatestNews(): void {
    this.input$.next(new events.CancelFetchingLatestNews());
  }

  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

  changeApiKey(apiKey: string): void {
    this.settingsControl.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.settingsControl.saveApiKey();
  }

}

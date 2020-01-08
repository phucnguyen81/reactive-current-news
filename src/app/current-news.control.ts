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

export class CurrentNewsControl {

  private readonly state$ = new rx.Subject<CurrentNewsState>();

  private readonly currentsapi$ = new CurrentsApiControl(
    this.state$,
    new CurrentsApiPlant(this.httpClient)
  );

  private readonly feedback$ = rx.merge(
    this.currentsapi$.output$
  );

  private readonly input$ = new rx.Subject<events.AppEvent>();

  readonly output$: rx.Observable<CurrentNewsState> = rx.merge(
    this.input$,
    this.feedback$,
  ).pipe(
    ops.scan<events.AppEvent, CurrentNewsState>(
      nextState, new CurrentNewsState()
    ),
    ops.tap(state => this.state$.next(state)),
  );

  constructor(private httpClient:HttpClient) {}

  start(): void {
    this.input$.next(new events.FetchLatestNews());
  }

  stop(): void {
    this.input$.next(new events.CancelFetchingLatestNews());
  }

  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

}

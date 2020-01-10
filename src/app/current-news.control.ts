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

  readonly output$ = new rx.BehaviorSubject<CurrentNewsState>(
    new CurrentNewsState()
  );

  private readonly currentsapi$ = new CurrentsApiControl(
    this.output$,
    new CurrentsApiPlant(this.httpClient)
  );

  private readonly feedback$ = rx.merge(
    this.currentsapi$.output$
  );

  private readonly input$ = new rx.Subject<events.AppEvent>();

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

  constructor(private httpClient:HttpClient) {
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

}

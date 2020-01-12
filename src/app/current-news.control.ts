import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { nextState } from './current-news.reducers';

export class CurrentNewsControl {

  readonly output$ = new rx.BehaviorSubject<CurrentNewsState>(
    new CurrentNewsState()
  );

  readonly input$ = new rx.Subject<events.AppEvent>();

  private readonly finish$ = new rx.Subject<any>();
  finished(): rx.Observable<any> {
    return this.finish$.asObservable();
  }

  private readonly state$: rx.Observable<CurrentNewsState> = rx.merge(
    this.input$,
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

}

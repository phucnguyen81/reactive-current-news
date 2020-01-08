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
import { fetchLatestNews } from './currentsapi.adapter';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  private readonly currentsapi = new CurrentsApiPlant(this.httpClient);

  private readonly stateLoop$ = new rx.Subject<CurrentNewsState>();

  private readonly fetchLatestNews$ = this.stateLoop$.pipe(
    fetchLatestNews(this.currentsapi)
  );

  private readonly input$ = new rx.Subject<events.AppEvent>();

  readonly state$: rx.Observable<CurrentNewsState> = rx.merge(
    this.input$,
    this.fetchLatestNews$,
    this.currentsapi.latestNewsOut$.pipe(
      ops.map(latestNews => new LatestNewsResponse(latestNews)),
      ops.map(latestNews => new events.ReceiveLatestNews(latestNews)),
    ),
    this.currentsapi.latestNewsErrorOut$.pipe(
      ops.mapTo(new events.AppEvent())
    ),
  ).pipe(
    ops.scan<events.AppEvent, CurrentNewsState>(
      nextState, new CurrentNewsState()
    ),
    ops.tap(state => this.stateLoop$.next(state)),
  );

  constructor(private httpClient:HttpClient) {}

  fetchLatestNews(): void {
    this.input$.next(new events.FetchLatestNews());
  }

  cancelLatestNews(): void {
    this.input$.next(new events.CancelFetchingLatestNews());
  }

  // TODO make this event too (with window plant?)
  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

}

import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpErrorResponse, HttpResponse,
  HttpHeaders
} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { LatestNews } from './current-news.interface';
import { LatestNewsResponse } from './current-news.adapter';

import { CurrentNewsState } from './current-news.state';
import {
  AppEvent, LatestNewsEvent, FetchLatestNewsEvent,
  CancelFetchingLatestNewsEvent
} from './current-news.events';
import { nextState } from './current-news.reducers';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  constructor(private httpClient:HttpClient) {}

  private readonly latestNewsFetch$ = new rx.Subject<FetchLatestNewsEvent>();
  private readonly latestNewsError$ = new rx.Subject<HttpErrorResponse>();
  private readonly latestNewsCancel$ = new rx.Subject<CancelFetchingLatestNewsEvent>();

  private readonly stateLoop$ = new rx.Subject<CurrentNewsState>();

  private readonly latestNews$ = this.stateLoop$.pipe(
    ops.distinctUntilChanged(
      (s1: CurrentNewsState, s2: CurrentNewsState) => {
        return (s1.fetchingLatestNews === s2.fetchingLatestNews);
      }
    ),
    ops.switchMap(state => {
      if (!state.fetchingLatestNews) {
        return rx.EMPTY;
      }

      const url = '/current-news/v1/latest-news';
      const apiKey ='dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';
      const headers = new HttpHeaders().set('Authorization', apiKey);
      const params = new HttpParams().set('language', 'en');

      return this.httpClient
        .get<LatestNews>(url, {observe: 'response', params, headers})
        .pipe(
          ops.map<HttpResponse<LatestNews>, LatestNews>(res => {
            return new LatestNewsResponse(res);
          }),
          ops.catchError<LatestNews, rx.Observable<LatestNews>>(
            (err, caught) => {
              this.latestNewsError$.next(err);
              return caught;
            }
          ),
          ops.takeUntil(this.latestNewsCancel$),
        );
    })
  );

  readonly state$: rx.Observable<CurrentNewsState> = rx.merge(
    this.latestNews$.pipe(ops.map(v => new LatestNewsEvent(v))),
    this.latestNewsFetch$,
    this.latestNewsError$.pipe(ops.mapTo(new AppEvent())),
    this.latestNewsCancel$,
  ).pipe(
    ops.scan<AppEvent, CurrentNewsState>(
      nextState, new CurrentNewsState()
    ),
    ops.tap(state => this.stateLoop$.next(state)),
  );

  fetchLatestNews(): void {
    this.latestNewsFetch$.next(new FetchLatestNewsEvent());
  }

  cancelLatestNews(): void {
    this.latestNewsCancel$.next(new CancelFetchingLatestNewsEvent());
  }

  // TODO make this event too (with window plant?)
  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

}

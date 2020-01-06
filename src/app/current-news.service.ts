import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpErrorResponse, HttpResponse, HttpHeaders
} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { LatestNews } from './current-news.interface';
import { LatestNewsResponse } from './current-news.adapter';

import { CurrentNewsState } from './current-news.state';
import { AppEvent, LatestNewsEvent } from './current-news.events';
import { nextState } from './current-news.reducers';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  constructor(private httpClient:HttpClient) {}

  private readonly latestNews$ = new rx.ReplaySubject<LatestNews>(1);
  private readonly latestNewsError$ = new rx.ReplaySubject<HttpErrorResponse>(1);
  private readonly latestNewsCancel$ = new rx.Subject<any>();

  private readonly stateLoop$ = new rx.Subject<CurrentNewsState>();

  readonly state$: rx.Observable<CurrentNewsState> = rx.merge(
    this.latestNews$.pipe(ops.map(v => new LatestNewsEvent(v))),
    this.latestNewsError$.pipe(ops.mapTo(new AppEvent())),
    this.latestNewsCancel$.pipe(ops.mapTo(new AppEvent())),
  ).pipe(
    ops.scan<AppEvent, CurrentNewsState>(
      nextState, new CurrentNewsState()
    ),
    ops.tap(state => this.stateLoop$.next(state)),
  );

  fetchLatestNews(): void {
    const url = '/current-news/v1/latest-news';
    const apiKey ='dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';
    const headers = new HttpHeaders().set('Authorization', apiKey);
    const params = new HttpParams().set('language', 'en');

    this.httpClient
      .get<LatestNews>(url, {observe: 'response', params, headers})
      .pipe(
        ops.map<HttpResponse<LatestNews>, LatestNews>(res => {
          return new LatestNewsResponse(res);
        }),
        ops.tap<LatestNews>(
          latestNews => this.latestNews$.next(latestNews)
        ),
        ops.catchError<LatestNews, rx.Observable<LatestNews>>(
          (err, caught) => {
            this.latestNewsError$.next(err);
            return caught;
          }
        ),
        ops.takeUntil(this.latestNewsCancel$),
      )
      .subscribe();
  }

  cancelLatestNews(): void {
    this.latestNewsCancel$.next(true);
  }

  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

}

import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpErrorResponse, HttpResponse, HttpHeaders
} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { LatestNews } from './current-news.interface';
import { LatestNewsResponse } from './current-news.adapter';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  constructor(private httpClient:HttpClient) {}

  readonly latestNews$ = new rx.ReplaySubject<LatestNews>(1);
  readonly latestNewsError$ = new rx.ReplaySubject<HttpErrorResponse>(1);
  readonly latestNewsCancel$ = new rx.Subject<any>();

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

}

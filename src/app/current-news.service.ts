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

  latestNews$ = new rx.Subject<LatestNews>();
  latestNewsError$ = new rx.Subject<HttpErrorResponse>();
  latestNewsCancel$ = new rx.Subject<any>();

  fetchLatestNews(): void {
    const url = 'https://api.currentsapi.services/v1/latest-news';

    const params = new HttpParams()
      .set('language', 'en')
      .set('apiKey', 'dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-');

    this.httpClient
      .get<LatestNews>(url, {observe: 'response', params})
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

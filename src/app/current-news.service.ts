import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpErrorResponse, HttpResponse
} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { LatestNews } from './current-news.response';

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
      .get<LatestNews>(url, {params})
      .pipe(
        ops.tap<LatestNews>(res => this.latestNews$.next(res)),
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

}

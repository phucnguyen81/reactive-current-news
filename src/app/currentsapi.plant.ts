import {
  HttpClient, HttpParams, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { LatestNews } from './current-news.interface';

/**
 * Basic control of the currentsapi.services.
 *
 *  -   Fetch latest news
 *  -   Show stream of latest news results
 *  -   Show errors from fetching
 *  -   Cancel all on-going fetches
 */
export class CurrentsApiPlant {

  private readonly latestNews$ = new rx.Subject<LatestNews>();
  private readonly latestNewsError$ = new rx.Subject<HttpErrorResponse>();
  private readonly latestNewsCancel$ = new rx.Subject<any>();

  readonly latestNewsOut$: Observable<LatestNews> = this.latestNews$.asObservable();
  readonly latestNewsErrorOut$: Observable<HttpErrorResponse> = this.latestNewsError$.asObservable();

  constructor(private httpClient: HttpClient) {}

  fetchLatestNews(): void {
    const url = '/current-news/v1/latest-news';
    const apiKey ='dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';
    const headers = new HttpHeaders().set('Authorization', apiKey);
    const params = new HttpParams().set('language', 'en');

    this.httpClient
      .get<LatestNews>(url, {observe: 'response', params, headers})
      .pipe(
        ops.tap(res => this.latestNews$.next(res)),
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

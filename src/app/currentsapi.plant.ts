import {
  HttpClient, HttpParams, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { LatestNews } from './current-news.interface';

/**
 * Basic control of the currentsapi.services.
 *
 *  -   Fetch latest news
 *  -   Notify latest news results
 *  -   Notify errors from fetching
 *  -   Notify completion of fetching
 *  -   Cancel all on-going fetches
 */
export class CurrentsApiPlant {

  private readonly latestNews$ = new rx.Subject<HttpResponse<LatestNews>>();
  private readonly latestNewsError$ = new rx.Subject<HttpErrorResponse>();
  private readonly latestNewsCancel$ = new rx.Subject<any>();
  private readonly latestNewsComplete$ = new rx.Subject<any>();

  readonly latestNewsOut$ = this.latestNews$.asObservable();
  readonly latestNewsErrorOut$ = this.latestNewsError$.asObservable();
  readonly latestNewsCompleteOut$ = this.latestNewsComplete$.asObservable();

  constructor(private httpClient: HttpClient) {}

  fetchLatestNews(): void {
    const url = '/current-news/v1/latest-news';
    const apiKey ='dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';
    const headers = new HttpHeaders().set('Authorization', apiKey);
    const params = new HttpParams().set('language', 'en');

    this.httpClient
      .get<LatestNews>(url, {observe: 'response', params, headers})
      .pipe(ops.takeUntil(this.latestNewsCancel$))
      .subscribe({
        next: latestNews => this.latestNews$.next(latestNews),
        error: err => this.latestNewsError$.next(err),
        complete: () => this.latestNewsComplete$.next(true),
      });
  }

  cancelLatestNews(): void {
    this.latestNewsCancel$.next(true);
  }

}

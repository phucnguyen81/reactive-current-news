import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsControl } from './current-news.control';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  private readonly control = new CurrentNewsControl(this.httpClient);

  readonly output$ = this.control.output$;

  constructor(private httpClient: HttpClient) {}

  start(): void {
    this.control.start();
    this.control.fetchLatestNews();
  }

  stop(): void {
    this.control.cancelFetchingLatestNews();
    this.control.stop();
  }

  fetchLatestNews(): void {
    this.control.fetchLatestNews();
  }

  openNewTab(url: string): void {
    this.control.openNewTab(url);
  }

}

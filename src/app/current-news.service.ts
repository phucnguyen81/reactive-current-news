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
import { CurrentsApiControl } from './currentsapi.control';

import { CurrentNewsControl } from './current-news.control';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  private readonly control = new CurrentNewsControl(this.httpClient);

  readonly output$ = this.control.output$;

  constructor(private httpClient:HttpClient) {}

  start(): void {
    this.control.start();
  }

  stop(): void {
    this.control.stop();
  }

  openNewTab(url: string): void {
    this.control.openNewTab(url);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsControl } from './current-news.control';
import { CurrentNewsState } from './current-news.state';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  private readonly control: CurrentNewsControl;

  readonly input$: rx.Subject<events.AppEvent>;

  readonly output$: rx.Observable<CurrentNewsState>;

  readonly finish$: rx.Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.control = new CurrentNewsControl(this.httpClient);
    this.input$ = this.control.input$;
    this.output$ = this.control.output$;
    this.finish$ = this.control.finished();
  }

  start(): void {
    this.control.start();
    this.control.fetchLatestNews();
  }

  stop(): void {
    // TODO stop() should already do the cancel
    this.control.cancelFetchingLatestNews();
    this.control.stop();
  }

  finish(): void {
    this.control.finish();
  }

  fetchLatestNews(): void {
    this.control.fetchLatestNews();
  }

  openNewTab(url: string): void {
    this.control.openNewTab(url);
  }

  navigateHome(): void {
    this.router.navigate(['']);
  }

  navigateSettings(): void {
    this.router.navigate(['settings']);
  }

  changeApiKey(apiKey: string): void {
    this.control.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.control.saveApiKey();
  }

}

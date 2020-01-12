import { HttpClient } from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsControl } from './current-news.control';
import { CurrentNewsState } from './current-news.state';

export class CurrentNewsConnector {

  private readonly control: CurrentNewsControl;

  readonly input$: rx.Subject<events.AppEvent>;

  readonly output$: rx.Observable<CurrentNewsState>;

  readonly finish$: rx.Observable<any>;

  constructor(private httpClient: HttpClient) {
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
    this.control.cancelFetchingLatestNews();
    this.control.stop();
  }

  finish(): void {
    this.control.finish();
  }

  fetchLatestNews(): void {
    this.control.fetchLatestNews();
  }

}
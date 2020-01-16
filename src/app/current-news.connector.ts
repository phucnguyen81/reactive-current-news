import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsControl } from './current-news.control';
import { CurrentNewsState } from './current-news.state';
import { AppService } from './app.service';

export class CurrentNewsConnector {

  private readonly control: CurrentNewsControl;

  readonly input$: rx.Subject<events.AppEvent>;

  readonly output$: rx.Observable<CurrentNewsState>;

  constructor() {
    this.control = new CurrentNewsControl();
    this.input$ = this.control.input$;
    this.output$ = this.control.output$;
  }

  connect(appService: AppService): rx.Observable<CurrentNewsState> {
    return this.control.output$;
  }

  start(): void {
    this.control.fetchLatestNews();
  }

  stop(): void {
    this.control.cancelFetchingLatestNews();
  }

  fetchLatestNews(): void {
    this.control.fetchLatestNews();
  }

}

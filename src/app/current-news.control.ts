import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { nextState } from './current-news.reducers';

export class CurrentNewsControl {

  readonly input$ = new rx.Subject<events.AppEvent>();

  readonly output$: rx.Observable<CurrentNewsState> = rx.merge(
    this.input$,
  ).pipe(
    ops.scan<events.AppEvent, CurrentNewsState>(
      nextState, new CurrentNewsState()
    )
  );

  start(): void {
    this.input$.next(new events.Start());
  }

  stop(): void {
    this.input$.next(new events.Stop());
  }

  fetchLatestNews(): void {
    this.input$.next(new events.FetchLatestNews());
  }

  cancelFetchingLatestNews(): void {
    this.input$.next(new events.CancelFetchingLatestNews());
  }

}

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { CurrentsApiPlant } from './currentsapi.plant';
import { LatestNewsResponse } from './current-news.adapter';

/**
 * Drive currentsapi plant from output of current-news control.
 * The output can become feedback of the current-news control.
 */
export class CurrentsApiControl {

  private readonly fetchLatestNews$: rx.Observable<events.AppEvent> =
    this.currentNews$.pipe(
      ops.distinctUntilChanged(
        (s1: CurrentNewsState, s2: CurrentNewsState) => {
          return (s1.fetchingLatestNews === s2.fetchingLatestNews);
        }
      ),
      ops.map(state => {
        if (state.fetchingLatestNews) {
          if (state.apiKey) {
            this.currentsapi.fetchLatestNews(state.apiKey);
            return new events.FetchingLatestNewsStarted();
          }
          else {
            return new events.FetchingLatestNewsDone();
          }
        }
        else {
          this.currentsapi.cancelLatestNews();
          return new events.FetchingLatestNewsCancelled();
        }
      }),
    );

  private readonly receiveLatestNews$: rx.Observable<events.AppEvent> =
    this.currentsapi.latestNewsOut$.pipe(
      ops.map(latestNews => new LatestNewsResponse(latestNews)),
      ops.map(latestNews => new events.ReceiveLatestNews(latestNews)),
    );

  private readonly latestNewsError$: rx.Observable<events.AppEvent> =
    this.currentsapi.latestNewsErrorOut$.pipe(
      ops.map(err => new events.AppError(err))
    );

  private readonly latestNewsComplete$: rx.Observable<events.AppEvent> =
    rx.merge(
      this.currentsapi.latestNewsCompleteOut$,
      this.currentsapi.latestNewsErrorOut$,
    ).pipe(
      ops.mapTo(new events.FetchingLatestNewsDone())
    );

  readonly output$: rx.Observable<events.AppEvent> = rx.merge(
    this.fetchLatestNews$,
    this.receiveLatestNews$,
    this.latestNewsError$,
    this.latestNewsComplete$,
  );

  constructor(
    private currentNews$: rx.Observable<CurrentNewsState>,
    private currentsapi: CurrentsApiPlant,
  ) { }

}

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { CurrentsApiPlant } from './currentsapi.plant';
import { LatestNewsResponse } from './current-news.adapter';

/**
 * Drive currentsapi plant from output of current-news control.
 */
export class CurrentsApiControl {

  private readonly fetchLatestNews$: rx.Observable<events.AppEvent> =
    this.currentNews$.pipe(
      ops.distinctUntilChanged(
        (s1: CurrentNewsState, s2: CurrentNewsState) => {
          return (s1.fetchingLatestNews === s2.fetchingLatestNews);
        }
      ),
      ops.tap(state => {
        if (state.fetchingLatestNews) {
          this.currentsapi.fetchLatestNews();
        }
        else {
          this.currentsapi.cancelLatestNews();
        }
      }),
      ops.mapTo(new events.Skip()),
    );

  private readonly receiveLatestNews$: rx.Observable<events.AppEvent> =
    this.currentsapi.latestNewsOut$.pipe(
      ops.map(latestNews => new LatestNewsResponse(latestNews)),
      ops.map(latestNews => new events.ReceiveLatestNews(latestNews)),
    );

  // TODO show errors
  private readonly latestNewsError$: rx.Observable<events.AppEvent> =
    this.currentsapi.latestNewsErrorOut$.pipe(
      ops.mapTo(new events.AppEvent())
    );

  readonly output$: rx.Observable<events.AppEvent> = rx.merge(
    this.fetchLatestNews$,
    this.receiveLatestNews$,
    this.latestNewsError$,
  );

  constructor(
    private currentNews$: rx.Observable<CurrentNewsState>,
    private currentsapi: CurrentsApiPlant,
  ) { }

}

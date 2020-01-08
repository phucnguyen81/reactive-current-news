import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsState } from './current-news.state';
import { CurrentsApiPlant } from './currentsapi.plant';
import * as events from './current-news.events';

/**
 * Drives currentsapi from outputs of current-news. Returns
 * feedback event stream.
 */
export function fetchLatestNews(
  currentsapi: CurrentsApiPlant
): rx.OperatorFunction<CurrentNewsState, events.AppEvent> {
  return (currentNews$: rx.Observable<CurrentNewsState>) => {
    return currentNews$.pipe(
      ops.distinctUntilChanged(
        (s1: CurrentNewsState, s2: CurrentNewsState) => {
          return (s1.fetchingLatestNews === s2.fetchingLatestNews);
        }
      ),
      ops.tap(state => {
        if (state.fetchingLatestNews) {
          currentsapi.fetchLatestNews();
        }
        else {
          currentsapi.cancelLatestNews();
        }
      }),
      ops.mapTo(new events.Skip()),
    );
  };
}

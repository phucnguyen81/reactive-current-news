import * as rx from 'rxjs';

import * as events from './current-news.events';
import { LatestNews, EMPTY_LATEST_NEWS } from './current-news.interface';

export class CurrentNewsState {
  title = 'Current News';

  apiKey = 'dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';

  latestNews: LatestNews = EMPTY_LATEST_NEWS;

  fetchingLatestNews = false;

  error?: Error;

  gotoEvent: events.GotoEvent = new events.GotoNowhere();
}

export type CurrentNewsEvents = rx.Observable<events.AppEvent>;

export type CurrentNewsInputs = rx.Subject<events.AppEvent>;

export type CurrentNewsOutputs = rx.Observable<CurrentNewsState>;


import { LatestNews, EMPTY_LATEST_NEWS } from './current-news.interface';
import * as events from './current-news.events';

export class CurrentNewsState {
  title = 'Current News';

  apiKey = 'dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';

  latestNews: LatestNews = EMPTY_LATEST_NEWS;

  fetchingLatestNews = false;

  error?: Error;

  gotoEvent: events.GotoEvent = new events.GotoNowhere();
}

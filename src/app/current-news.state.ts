import { LatestNews, EMPTY_LATEST_NEWS } from './current-news.interface';

export class CurrentNewsState {
  title = 'Current News';

  apiKey = 'dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';

  latestNews: LatestNews = EMPTY_LATEST_NEWS;

  fetchingLatestNews = false;

  latestNewsError = '';
}

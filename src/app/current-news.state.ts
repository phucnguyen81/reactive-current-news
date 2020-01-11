import { LatestNews } from './current-news.interface';

export class CurrentNewsState {
  state: On | Off = new Off();

  title = 'Current News';

  apiKey = 'dwZHTHEaDbirvOnTb3qm6yNyJbweQY3OebePf2RZV8O7iiz-';

  latestNews: LatestNews;

  fetchingLatestNews = false;

  latestNewsError = '';
}

export class On {}

export class Off {}


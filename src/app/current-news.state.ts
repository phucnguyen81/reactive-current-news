import { LatestNews } from './current-news.interface';

export class CurrentNewsState {
  state: On | Off = new Off();

  title = 'Current News';

  latestNews: LatestNews;

  fetchingLatestNews = false;

  latestNewsError = '';
}

export class On {}

export class Off {}


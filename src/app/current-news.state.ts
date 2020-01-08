import { LatestNews } from './current-news.interface';

export class CurrentNewsState {
  // TODO have default empty latest news
  latestNews?: LatestNews;

  fetchingLatestNews = false;

  latestNewsError = '';
}

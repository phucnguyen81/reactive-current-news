import { LatestNews } from './current-news.interface';

export class CurrentNewsState {
  isOn = false;

  // TODO have default empty latest news
  latestNews?: LatestNews;

  fetchingLatestNews = false;

  latestNewsError = '';
}



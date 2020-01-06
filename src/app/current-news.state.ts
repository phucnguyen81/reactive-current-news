import { LatestNews } from './current-news.interface';

export class CurrentNewsState {
  latestNews?: LatestNews;
  fetchingLatestNews = false;
}

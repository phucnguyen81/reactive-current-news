import { LatestNews } from './current-news.interface';

export class AppEvent {
}

export class LatestNewsEvent extends AppEvent {
  constructor(public latestNews: LatestNews) {
    super();
  }
}

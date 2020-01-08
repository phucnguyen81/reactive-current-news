import { LatestNews } from './current-news.interface';

export class AppEvent {
}

export class Skip extends AppEvent {
}

export class ReceiveLatestNews extends AppEvent {
  constructor(public latestNews: LatestNews) {
    super();
  }
}

export class FetchLatestNews extends AppEvent { }

export class CancelFetchingLatestNews extends AppEvent { }

import { LatestNews } from './current-news.interface';

export class AppEvent {
}

// TODO probably not needed, use skipWhile operator instead
export class Skip extends AppEvent {
}

export class ReceiveLatestNews extends AppEvent {
  constructor(public latestNews: LatestNews) {
    super();
  }
}

export class FetchLatestNews extends AppEvent { }

export class CancelFetchingLatestNews extends AppEvent { }

export class CompleteFetchingLatestNews extends AppEvent { }

export class LatestNewsError extends AppEvent {
  constructor(public message: string) {
    super();
  }
}


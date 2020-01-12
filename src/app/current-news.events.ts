import { LatestNews } from './current-news.interface';

export class AppEvent { }

export class Start extends AppEvent { }

export class Stop extends AppEvent { }

export class ReceiveLatestNews extends AppEvent {
  constructor(public latestNews: LatestNews) {
    super();
  }
}

export class FetchLatestNews extends AppEvent { }

export class CancelFetchingLatestNews extends AppEvent { }

export class FetchingLatestNewsDone extends AppEvent { }

export class LatestNewsError extends AppEvent {
  constructor(public message: string) {
    super();
  }
}

export class ApiKey extends AppEvent {
  constructor(public apiKey: string) {
    super();
  }
}

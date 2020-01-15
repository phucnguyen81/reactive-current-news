import { LatestNews } from './current-news.interface';

export class AppEvent { }

export class AppError extends AppEvent {
  readonly name: string;
  readonly message: string;

  constructor(readonly error: Error) {
    super();
    this.name = error.name;
    this.message = error.message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }
}

export class Skip extends AppEvent { }

export class ReceiveLatestNews extends AppEvent {
  constructor(public latestNews: LatestNews) {
    super();
  }
}

export class FetchLatestNews extends AppEvent { }

export class CancelFetchingLatestNews extends AppEvent { }
export class FetchingLatestNewsDone extends AppEvent { }
export class FetchingLatestNewsStarted extends AppEvent { }
export class FetchingLatestNewsCancelled extends AppEvent { }

export class ApiKey extends AppEvent {
  constructor(public apiKey: string) {
    super();
  }
}

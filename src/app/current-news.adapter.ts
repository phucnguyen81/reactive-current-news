import { HttpResponse, HttpHeaders } from '@angular/common/http';

import { LatestNews, News } from './current-news.interface';

export class LatestNewsResponse implements LatestNews {

  status: string = '';
  news: News[] = [];
  rateLimitRemaining: number;
  rateLimit: number;

  constructor(response: HttpResponse<LatestNews>) {
    this.status = response.body.status;
    this.news = response.body.news;
    this.rateLimitRemaining = Number(
      response.headers.get('X-RateLimit-Remaining')
    );
    this.rateLimit = Number(
      response.headers.get('X-RateLimit-Limit')
    );
  }
}

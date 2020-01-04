import { HttpResponse, HttpHeaders } from '@angular/common/http';

import { LatestNews, News } from './current-news.interface';

export class LatestNewsResponse implements LatestNews {

  status: string = '';
  news: News[] = [];
  rateLimitRemaining: number;
  rateLimit: number;

  constructor(response: HttpResponse<LatestNews>) {
    this.status = response.body.status;
    this.news = response.body.news.map(news => this.newsResponse(news));
    if (response.headers.has('X-RateLimit-Remaining')) {
      this.rateLimitRemaining = Number(
        response.headers.get('X-RateLimit-Remaining')
      );
    }
    if (response.headers.has('X-RateLimit-Limit')) {
      this.rateLimit = Number(
        response.headers.get('X-RateLimit-Limit')
      );
    }
  }

  newsResponse(news: News): News {
    const newsRes: News = {...news};
    if (!newsRes.image || (newsRes.image === 'None')) {
      delete newsRes.image;
    }
    return newsRes;
  }

}

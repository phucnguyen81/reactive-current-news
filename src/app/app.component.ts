import { Component, OnInit, OnDestroy } from '@angular/core';

import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { LatestNews, News } from './current-news.interface';
import { CurrentNewsState } from './current-news.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Current News';

  latestNews$ = this.currentNewsService.state$.pipe(
    ops.map(state => state.latestNews)
  );

  constructor(private currentNewsService: CurrentNewsService) {}

  ngOnInit(): void {
    this.currentNewsService.fetchLatestNews();
  }

  ngOnDestroy(): void {
    this.currentNewsService.cancelLatestNews();
  }

  openNewTab(news: News, event: Event): void {
    event.preventDefault();
    this.currentNewsService.openNewTab(news.url);
  }

}

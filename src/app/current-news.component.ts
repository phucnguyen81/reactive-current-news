import { Component, OnInit, OnDestroy } from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { LatestNews, News } from './current-news.interface';
import { CurrentNewsState } from './current-news.state';

@Component({
  selector: 'app-current-news',
  templateUrl: './current-news.component.html',
  styleUrls: ['./current-news.component.css']
})
export class CurrentNewsComponent implements OnInit, OnDestroy {

  view$ = this.currentNewsService.output$;

  constructor(private currentNewsService: CurrentNewsService) {}

  ngOnInit(): void {
    this.currentNewsService.start();
  }

  ngOnDestroy(): void {
    this.currentNewsService.stop();
    this.currentNewsService.finish();
  }

  openNewTab(news: News, event: Event): void {
    event.preventDefault();
    this.currentNewsService.openNewTab(news.url);
  }

  fetch(): void {
    this.currentNewsService.fetchLatestNews();
  }

}

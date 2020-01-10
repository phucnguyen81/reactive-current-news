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

  view$: rx.Observable<CurrentNewsState>;

  constructor(private currentNewsService: CurrentNewsService) {
    this.view$ = this.currentNewsService.output$;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  openNewTab(news: News, event: Event): void {
    event.preventDefault();
    this.currentNewsService.openNewTab(news.url);
  }

  fetch(): void {
    this.currentNewsService.fetchLatestNews();
  }

}

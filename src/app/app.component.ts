import {
  Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef
} from '@angular/core';

import * as rx from 'rxjs';
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

  view$ = this.currentNewsService.output$;

  constructor(
    private currentNewsService: CurrentNewsService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.currentNewsService.fetchLatestNews();
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.currentNewsService.cancelLatestNews();
  }

  openNewTab(news: News, event: Event): void {
    event.preventDefault();
    this.currentNewsService.openNewTab(news.url);
  }

}

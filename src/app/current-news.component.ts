import {
  Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef
} from '@angular/core';

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

  constructor(
    private currentNewsService: CurrentNewsService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.currentNewsService.start();
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.currentNewsService.stop();
  }

  openNewTab(news: News, event: Event): void {
    event.preventDefault();
    this.currentNewsService.openNewTab(news.url);
  }

}

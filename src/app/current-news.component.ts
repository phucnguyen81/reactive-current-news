import {
  Component, OnInit, OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';
import { LatestNews, News } from './current-news.interface';
import { CurrentNewsState } from './current-news.state';

@Component({
  selector: 'app-current-news',
  templateUrl: './current-news.component.html',
  styleUrls: ['./current-news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentNewsComponent implements OnInit, OnDestroy {

  view$: rx.Observable<CurrentNewsState>;

  constructor(private appService: AppService) {
    this.view$ = this.appService.output$;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  openNewTab(news: News, event: Event): void {
    event.preventDefault();
    this.appService.openNewTab(news.url);
  }

}

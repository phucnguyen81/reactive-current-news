import { Component, OnInit, OnDestroy } from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesService } from './error-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  view$: rx.Observable<CurrentNewsState>;

  constructor(
    private currentNewsService: CurrentNewsService,
    private errorMessagesService: ErrorMessagesService,
  ) {
    this.view$ = this.currentNewsService.output$;
  }

  ngOnInit(): void {
    this.currentNewsService.start();
  }

  ngOnDestroy(): void {
    this.errorMessagesService.detach();
    this.currentNewsService.stop();
    this.currentNewsService.finish();
  }

  fetch(): void {
    this.currentNewsService.fetchLatestNews();
  }

  goHome(): void {
    this.currentNewsService.navigateHome();
  }

  goSettings(): void {
    this.currentNewsService.navigateSettings();
  }

}

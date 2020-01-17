import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsState } from './current-news.state';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  readonly output$: rx.Observable<CurrentNewsState> =
    this.appService.output$;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.start();
  }

  ngOnDestroy(): void {
    this.appService.stop();
  }

  fetch(): void {
    this.appService.fetchLatestNews();
  }

  goToHome(): void {
    this.appService.goToHome();
  }

  goToSettings(): void {
    this.appService.goToSettings();
  }

  goToStatus(): void {
    this.appService.goToStatus();
  }

}

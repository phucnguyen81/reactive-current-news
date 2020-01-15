import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef
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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  readonly output$: rx.Observable<CurrentNewsState>;

  constructor(
    private appService: AppService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.output$ = this.appService.output$;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.appService.start();
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.appService.stop();
  }

  fetch(): void {
    this.appService.fetch();
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

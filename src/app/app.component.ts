import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesService } from './error-messages.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  readonly view$: rx.Observable<CurrentNewsState>;

  constructor(
    private appService: AppService,
  ) {
    this.view$ = this.appService.view$;
  }

  ngOnInit(): void {
    this.appService.attach();
  }

  ngOnDestroy(): void {
    this.appService.detach();
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

}

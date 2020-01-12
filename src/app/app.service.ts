import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesService } from './error-messages.service';
import { CurrentsApiService } from './currentsapi.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly view$: rx.Observable<CurrentNewsState>;

  constructor(
    private currentNewsService: CurrentNewsService,
    private errorMessagesService: ErrorMessagesService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
  ) {
    this.view$ = this.currentNewsService.output$;
  }

  attach(): void {
    new CurrentsApiService(this.httpClient).attach(
      this.currentNewsService
    );
    this.errorMessagesService.attach(
      this.currentNewsService,
      this.snackBar,
    );
    this.currentNewsService.start();
  }

  detach(): void {
    this.currentNewsService.stop();
    this.currentNewsService.finish();
    this.errorMessagesService.detach();
  }

  fetch(): void {
    this.currentNewsService.fetchLatestNews();
  }

  goToHome(): void {
    this.currentNewsService.navigateHome();
  }

  goToSettings(): void {
    this.currentNewsService.navigateSettings();
  }

}

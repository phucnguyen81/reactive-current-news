import { HttpClient } from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';

import { AppService } from './app.service';
import { CurrentsApiPlant } from './currentsapi.plant';
import { CurrentsApiControl } from './currentsapi.control';

export class CurrentsApiConnector {

  readonly output$: rx.Observable<events.AppEvent> = new CurrentsApiControl(
    this.appService.output$,
    new CurrentsApiPlant(this.httpClient),
  ).output$;

  constructor(
    private httpClient: HttpClient,
    private appService: AppService,
  ) {}

}

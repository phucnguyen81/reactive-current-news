import { HttpClient } from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';

import { AppService } from './app.service';
import { CurrentsApiPlant } from './currentsapi.plant';
import { CurrentsApiControl } from './currentsapi.control';

export class CurrentsApiConnector {
  constructor(private httpClient: HttpClient) {}

  connect(appService: AppService): rx.Observable<events.AppEvent> {
    const currentsapi = new CurrentsApiControl(
      appService.output$,
      new CurrentsApiPlant(this.httpClient),
    );

    return currentsapi.output$;
  }
}

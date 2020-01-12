import { HttpClient } from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';
import { CurrentsApiPlant } from './currentsapi.plant';
import { CurrentsApiControl } from './currentsapi.control';

/**
 * Connect currentsapi to current-news
 */
export class CurrentsApiConnector {

  constructor(private httpClient: HttpClient) {}

  connect(currentNews: CurrentNewsService): void {
    const currentsapi = new CurrentsApiControl(
      currentNews.output$,
      new CurrentsApiPlant(this.httpClient),
    );

    currentsapi.output$.pipe(
      ops.takeUntil(currentNews.finish$)
    ).subscribe(currentNews.input$);
  }

}

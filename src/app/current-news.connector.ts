import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsControl } from './current-news.control';
import { CurrentNewsState } from './current-news.state';
import { AppService } from './app.service';

export class CurrentNewsConnector {

  private readonly control = new CurrentNewsControl();

  readonly input$ = this.control.input$;

  readonly output$ = this.control.output$.pipe(ops.shareReplay(1));

  fetchLatestNews(): void {
    this.control.fetchLatestNews();
  }

  cancelFetchingLatestNews(): void {
    this.control.cancelFetchingLatestNews();
  }

}

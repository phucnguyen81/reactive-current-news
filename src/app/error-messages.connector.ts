import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';
import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { ErrorMessagesControl } from './error-messages.control';

export class ErrorMessagesConnector {

  readonly output$: rx.Observable<events.AppEvent> = this.connect();

  constructor(
    private snackBar: MatSnackBar,
    private appService: AppService,
  ) {}

  private connect(): rx.Observable<events.AppEvent> {
    const error$ = this.appService.output$.pipe(
      ops.map<CurrentNewsState, Error>(
        state => state.error
      )
    );

    const errorMessages = new ErrorMessagesControl(
      error$,
      this.snackBar,
    );

    return errorMessages.output$.pipe(
      ops.mapTo(new events.Skip())
    );
  }

}

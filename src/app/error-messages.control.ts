import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';


export class ErrorMessagesControl {

  readonly output$: rx.Observable<Error>;

  constructor(
    private snackBar: MatSnackBar,
    private error$: rx.Observable<Error>,
  ) {
    this.output$ = error$.pipe(
      ops.distinctUntilChanged(),
      ops.filter(error => !!error),
      ops.tap(error => this.openSnackBar(
        `${error.name}: ${error.message}`
      )),
    );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 4000, });
  }

}

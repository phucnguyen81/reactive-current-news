import { MatSnackBar } from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';


export class MissingApiKeyControl {

  readonly output$: rx.Observable<string>;

  constructor(
    private snackBar: MatSnackBar,
    private message$: rx.Observable<string>,
  ) {
    this.output$ = message$.pipe(
      ops.distinctUntilChanged(),
      ops.filter(message => !!message),
      ops.tap(message => this.openSnackBar(message)),
    );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', { duration: 4000, });
  }

}

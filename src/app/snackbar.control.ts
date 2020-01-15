import {
  MatSnackBar, MatSnackBarRef, SimpleSnackBar
} from '@angular/material/snack-bar';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';


export class SnackBarControl {

  readonly onAction$: rx.Observable<string> = this.message$.pipe(
    ops.distinctUntilChanged(),
    ops.filter(message => !!message),
    ops.switchMap(message => this.openSnackBar(message)),
  );

  constructor(
    private snackBar: MatSnackBar,
    private message$: rx.Observable<string>,
    private action: string,
  ) { }

  private openSnackBar(message: string): rx.Observable<any> {
    let snackBarRef: MatSnackBarRef<SimpleSnackBar>;
    snackBarRef = this.snackBar.open(
      message, this.action, { duration: 4000, }
    );
    return snackBarRef.onAction();
  }

}

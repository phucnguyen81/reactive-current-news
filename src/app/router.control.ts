import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';


export class RouterControl {

  constructor(private router: Router) { }

  navigate(commands: string[]): rx.Observable<RouterResult> {
    return rx.from<Promise<boolean>>(
      this.router.navigate(commands)
    ).pipe(
      ops.map<boolean, RouterResult>(success => {
        return new RouterResult(success);
      }),
      ops.catchError(err => {
        return rx.of(new RouterResult(false, err));
      }),
    );
  }

  navigateHome(): rx.Observable<RouterResult> {
    return this.navigate(['']);
  }

  navigateSettings(): rx.Observable<RouterResult> {
    return this.navigate(['settings']);
  }

  navigateStatus(): rx.Observable<RouterResult> {
    return this.navigate(['status']);
  }
}

export class RouterResult {
  constructor(
    readonly success: boolean,
    readonly error?: Error,
  ) {}
}

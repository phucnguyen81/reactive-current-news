import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsState } from './current-news.state';
import { AppService } from './app.service';
import { RouterControl, RouterResult } from './router.control';

export class RouterConnector {

  private readonly control: RouterControl;

  constructor(private router: Router) {
    this.control = new RouterControl(router);
  }

  connect(appService: AppService): void {
    appService.output$.pipe(
      ops.map<CurrentNewsState, events.GotoEvent>(
        state => state.gotoEvent
      ),
      ops.distinctUntilChanged(),
      ops.switchMap(gotoEvent => {
        return this.gotoAction(gotoEvent);
      }),
      ops.takeUntil(appService.finish$),
    ).subscribe(appService.input$);
  }

  private gotoAction(
    gotoEvent: events.GotoEvent
  ): rx.Observable<events.GotoEvent> {
    if (gotoEvent instanceof events.GotoHome) {
      return this.routerNavigate(gotoEvent, ['']);
    }
    else if (gotoEvent instanceof events.GotoSettings) {
      return this.routerNavigate(gotoEvent, ['settings']);
    }
    else if (gotoEvent instanceof events.GotoStatus) {
      return this.routerNavigate(gotoEvent, ['status']);
    }
    else {
      return rx.of([new events.Skip()]);
    }
  }

  private routerNavigate(
    gotoEvent: events.GotoEvent,
    commands: string[]
  ): rx.Observable<events.GotoEvent> {
    return this.control.navigate(commands).pipe(
      ops.map<RouterResult, events.GotoEvent>(result => {
        if (result.success) {
          return new events.GotoSuccess(gotoEvent);
        }
        else if (result.error) {
          return new events.GotoError(gotoEvent, result.error);
        }
        else {
          return new events.GotoFailed(gotoEvent);
        }
      })
    );
  }

}

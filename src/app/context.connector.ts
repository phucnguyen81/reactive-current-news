import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';

import { AppService } from './app.service';
import { ContextService } from './context.service';
import { CurrentNewsState } from './current-news.state';
import { LocalStorageData } from './context.service.io';

const STORAGE_KEY = String(LocalStorageData);

export class ContextConnector {

  private readonly saveAction = new rx.Subject<any>();

  readonly output$: rx.Observable<events.StateSaved> =
    this.saveAction.pipe(
      ops.withLatestFrom(this.app.output$, (_, state) => state),
      ops.tap(state => { this.save(state); }),
      ops.map(state => { return new events.StateSaved(state); }),
    );

  constructor(
    private context: ContextService,
    private app: AppService,
  ) {}

  openNewTab(url: string): void {
    this.context.openNewTab(url);
  }

  saveState(): void {
    this.saveAction.next(true);
  }

  private save(state: CurrentNewsState): void {
    const data: LocalStorageData = {
      title: state.title,
      apiKey: state.apiKey,
    };
    this.context.save<LocalStorageData>(STORAGE_KEY, data);
  }

  loadState(): CurrentNewsState {
    const data: LocalStorageData =
      this.context.load<LocalStorageData>(STORAGE_KEY);
    const defaultState = new CurrentNewsState();
    return {...defaultState, ...data};
  }

}

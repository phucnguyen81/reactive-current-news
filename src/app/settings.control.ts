import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

export class SettingsControl {

  private readonly apiKeyInput$ = new rx.Subject<string>();
  private readonly apiKeySaved$ = new rx.Subject<any>();
  readonly apiKey$: rx.Observable<string> = this.apiKeySaved$.pipe(
    ops.withLatestFrom(this.apiKeyInput$),
    ops.map(([_, apiKey]) => apiKey),
  );

  constructor() { }

  changeApiKey(apiKey: string): void {
    this.apiKeyInput$.next(apiKey);
  }

  saveApiKey(): void {
    this.apiKeySaved$.next(true);
  }

}

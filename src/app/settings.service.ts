import { Injectable } from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { SettingsControl } from './settings.control';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly control = new SettingsControl();
  private readonly cancel$ = new rx.Subject<any>();

  attach(apiKey: rx.Subject<string>): void {
    this.control.apiKey$.pipe(
      ops.takeUntil(this.cancel$)
    ).subscribe(apiKey);
  }

  detach(): void {
    this.cancel$.next(true);
  }

  changeApiKey(apiKey: string): void {
    this.control.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.control.saveApiKey();
  }

}

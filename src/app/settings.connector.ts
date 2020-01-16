import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { SettingsControl } from './settings.control';
import { AppService } from './app.service';


export class SettingsConnector {

  private readonly settings = new SettingsControl();

  connect(appService: AppService): rx.Observable<events.AppEvent> {
    return this.settings.apiKey$.pipe(
      ops.map(apiKey => new events.ApiKey(apiKey)),
    );
  }

  changeApiKey(apiKey: string): void {
    this.settings.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.settings.saveApiKey();
  }

}

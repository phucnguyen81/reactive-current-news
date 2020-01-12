import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { SettingsControl } from './settings.control';
import { AppService } from './app.service';


export class SettingsConnector {

  private readonly settings = new SettingsControl();

  connect(appService: AppService): void {
    this.settings.apiKey$.pipe(
      ops.map(apiKey => new events.ApiKey(apiKey)),
      ops.takeUntil(appService.finish$),
    ).subscribe(appService.input$)
  }

  changeApiKey(apiKey: string): void {
    this.settings.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.settings.saveApiKey();
  }

}

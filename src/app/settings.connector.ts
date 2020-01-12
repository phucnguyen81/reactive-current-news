import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { SettingsControl } from './settings.control';
import { CurrentNewsConnector } from './current-news.connector';


export class SettingsConnector {

  private readonly settings = new SettingsControl();

  connect(currentNews: CurrentNewsConnector): void {
    this.settings.apiKey$.pipe(
      ops.map(apiKey => new events.ApiKey(apiKey)),
      ops.takeUntil(currentNews.finish$),
    ).subscribe(currentNews.input$)
  }

  changeApiKey(apiKey: string): void {
    this.settings.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.settings.saveApiKey();
  }

}

import {
  Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';
import { CurrentNewsState } from './current-news.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  readonly output$: rx.Observable<CurrentNewsState> =
    this.appService.output$;

  readonly apiKey$: rx.Observable<string> =
    this.output$.pipe(ops.map(state => state.apiKey));

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  changeApiKey(apiKey: string): void {
    this.appService.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.appService.saveApiKey();
  }

  save(): void {
    this.saveApiKey();
  }

  goToHome(): void {
    this.appService.goToHome();
  }

  goToSettings(): void {
    this.appService.goToSettings();
  }

  goToStatus(): void {
    this.appService.goToStatus();
  }

}

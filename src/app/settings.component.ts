import {
  Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  readonly apiKey$: rx.Observable<string> =
    this.appService.output$.pipe(
      ops.map(state => state.apiKey)
    );

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  changeApiKey(apiKey: string): void {
    this.appService.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.appService.saveApiKey();
  }

}

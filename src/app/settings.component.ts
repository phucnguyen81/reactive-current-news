import { Component, OnInit } from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  readonly apiKey$: rx.Observable<string> =
    this.currentNewsService.output$.pipe(
      ops.map(state => state.apiKey)
    );

  constructor(private currentNewsService: CurrentNewsService) { }

  ngOnInit(): void {
  }

  changeApiKey(apiKey: string): void {
    this.currentNewsService.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.currentNewsService.saveApiKey();
  }

}

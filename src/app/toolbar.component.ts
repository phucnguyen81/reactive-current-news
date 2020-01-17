import { Component, OnInit } from '@angular/core';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { AppService } from './app.service';
import { LatestNews, News } from './current-news.interface';
import { CurrentNewsState } from './current-news.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  view$: rx.Observable<CurrentNewsState>;

  constructor(private appService: AppService) {
    this.view$ = this.appService.output$;
  }

  ngOnInit(): void { }

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

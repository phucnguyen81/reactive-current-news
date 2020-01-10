import { Component, OnInit, OnDestroy } from '@angular/core';

import { CurrentNewsService } from './current-news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private currentNewsService: CurrentNewsService) {}

  ngOnInit(): void {
    this.currentNewsService.start();
  }

  ngOnDestroy(): void {
    this.currentNewsService.stop();
    this.currentNewsService.finish();
  }

}

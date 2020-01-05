import { Component, OnInit } from '@angular/core';

import { CurrentNewsService } from './current-news.service';
import { LatestNews, News } from './current-news.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Current News';

  latestNews$ = this.currentNewsService.latestNews$;

  constructor(private currentNewsService: CurrentNewsService) {}

  ngOnInit(): void {
    this.currentNewsService.fetchLatestNews();
  }

  openNewTab(news: News, event: Event): void {
    event.preventDefault();
    this.currentNewsService.openNewTab(news.url);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import * as rx from 'rxjs';

import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  view$: rx.Observable<CurrentNewsState>;

  constructor(
    private currentNewsService: CurrentNewsService,
    private router: Router,
  ) {
    this.view$ = this.currentNewsService.output$;
  }

  ngOnInit(): void {
    this.currentNewsService.start();
  }

  ngOnDestroy(): void {
    this.currentNewsService.stop();
    this.currentNewsService.finish();
  }

  fetch(): void {
    this.currentNewsService.fetchLatestNews();
  }

  home(): void {
    this.router.navigate(['']);
  }

  settings(): void {
    this.router.navigate(['settings']).then(sucess => {
      if (sucess) {
        console.log('done');
      }
      else {
        console.log('failed');
      }
    });
  }

}

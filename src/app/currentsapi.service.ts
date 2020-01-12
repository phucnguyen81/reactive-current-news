import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import * as events from './current-news.events';
import { CurrentNewsService } from './current-news.service';
import { CurrentNewsState } from './current-news.state';
import { CurrentsApiPlant } from './currentsapi.plant';
import { CurrentsApiControl } from './currentsapi.control';
import { LatestNewsResponse } from './current-news.adapter';

/**
 * Connect currentsapi to current-news
 */
export class CurrentsApiService {

  constructor(private httpClient: HttpClient) {}

  attach(currentNews: CurrentNewsService) {
    const currentsapi = new CurrentsApiControl(
      currentNews.output$,
      new CurrentsApiPlant(this.httpClient),
    );

    currentsapi.output$.pipe(
      ops.takeUntil(currentNews.finish$)
    ).subscribe(currentNews.input$);
  }

}

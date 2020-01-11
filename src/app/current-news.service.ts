import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsControl } from './current-news.control';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  private readonly control = new CurrentNewsControl(this.httpClient);

  readonly output$ = this.control.output$;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  start(): void {
    this.control.start();
    this.control.fetchLatestNews();
  }

  stop(): void {
    // TODO stop() should already do the cancel
    this.control.cancelFetchingLatestNews();
    this.control.stop();
  }

  finish(): void {
    this.control.finish();
  }

  fetchLatestNews(): void {
    this.control.fetchLatestNews();
  }

  openNewTab(url: string): void {
    this.control.openNewTab(url);
  }

  navigateHome(): void {
    this.router.navigate(['']);
  }

  navigateSettings(): void {
    this.router.navigate(['settings']);
  }

  changeApiKey(apiKey: string): void {
    this.control.changeApiKey(apiKey);
  }

  saveApiKey(): void {
    this.control.saveApiKey();
  }

}

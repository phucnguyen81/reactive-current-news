import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private readonly window: Window = window;
  private readonly localStorage = this.window.localStorage;

  openNewTab(url: string): void {
    this.window.open(url, '_blank');
  }

  save<T>(key: string, value: T): void {
    const json: string = JSON.stringify(value);
    this.localStorage.setItem(key, json);
  }

  load<T>(key): T {
    const json: string = this.localStorage.getItem(key);
    return (json ? (JSON.parse(json) as T) : null);
  }

}

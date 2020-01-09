import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import * as rx from 'rxjs';
import * as ops from 'rxjs/operators';

import { CurrentNewsService } from './current-news.service';

describe('CurrentNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [CurrentNewsService]
  }));

  it('should be created', () => {
    const service: CurrentNewsService = TestBed.get(CurrentNewsService);
    expect(service).toBeTruthy();
  });

  it('should get either response or error from api', (done: DoneFn) => {
    const service: CurrentNewsService = TestBed.get(CurrentNewsService);

    service.output$.subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });

    service.start();
  });
});

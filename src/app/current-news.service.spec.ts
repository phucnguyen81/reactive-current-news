import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

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
});

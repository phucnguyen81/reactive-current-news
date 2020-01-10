import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CurrentNewsComponent } from './current-news.component';

import {
  APP_MODULE_BOOTSTRAP,
  APP_MODULE_DECLARATIONS,
  APP_MODULE_IMPORTS,
} from './app.module.dependencies';


describe('CurrentNewsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ...APP_MODULE_IMPORTS,
      ],
      declarations: [
        ...APP_MODULE_DECLARATIONS,
        CurrentNewsComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CurrentNewsComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });

});

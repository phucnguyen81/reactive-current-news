import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import {
  APP_MODULE_BOOTSTRAP,
  APP_MODULE_DECLARATIONS,
  APP_MODULE_IMPORTS,
} from './app.module.dependencies';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ...APP_MODULE_IMPORTS,
      ],
      declarations: [
        ...APP_MODULE_DECLARATIONS,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Current News'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Current News');
  });
});

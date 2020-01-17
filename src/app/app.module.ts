import { NgModule } from '@angular/core';

import {
  APP_MODULE_BOOTSTRAP,
  APP_MODULE_DECLARATIONS,
  APP_MODULE_IMPORTS,
} from './app.module.dependencies';


@NgModule({
  declarations: [
    ...APP_MODULE_DECLARATIONS
  ],
  imports: [
    ...APP_MODULE_IMPORTS
  ],
  providers: [],
  bootstrap: [
    ...APP_MODULE_BOOTSTRAP
  ]
})
export class AppModule { }

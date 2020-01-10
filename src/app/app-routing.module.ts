import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentNewsComponent } from './current-news.component';


const routes: Routes = [
  { path: '', component: CurrentNewsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

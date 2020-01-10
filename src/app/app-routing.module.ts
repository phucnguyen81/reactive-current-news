import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentNewsComponent } from './current-news.component';
import { SettingsComponent } from './settings.component';


const routes: Routes = [
  { path: '', component: CurrentNewsComponent, pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

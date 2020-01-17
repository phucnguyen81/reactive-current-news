import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToolbarComponent } from './toolbar.component';
import { SettingsComponent } from './settings.component';
import { CurrentNewsComponent } from './current-news.component';
import { StatusComponent } from './status.component';


export const APP_MODULE_BOOTSTRAP = [
  AppComponent,
]

export const APP_MODULE_DECLARATIONS = [
  AppComponent,
  ToolbarComponent,
  CurrentNewsComponent,
  SettingsComponent,
  StatusComponent,
];

export const APP_MODULE_IMPORTS = [
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatToolbarModule,
];

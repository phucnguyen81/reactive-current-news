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
  MatToolbarModule,
} from '@angular/material';

import { AppComponent } from './app.component';


export const APP_MODULE_BOOTSTRAP = [
  AppComponent,
]

export const APP_MODULE_DECLARATIONS = [
  AppComponent,
];

export const APP_MODULE_IMPORTS = [
  BrowserModule,
  BrowserAnimationsModule,
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
  MatToolbarModule,
];
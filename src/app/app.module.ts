import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { routes } from './app.router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {DialogComponent} from './dialog/dialog.component';

import 'hammerjs';
import { DashboardComponent } from './dashboard/dashboard.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DashboardComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ChartsModule
  ],
   exports: [
    LoadingSpinnerComponent
  ],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

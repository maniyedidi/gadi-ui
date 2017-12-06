import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';


import { MatAutocompleteModule, MatCardModule, MatMenuModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { UploadComponent } from './components/upload/upload.component';
import { SearchBikesComponent } from './components/search-bikes/search-bikes.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AppRoutes } from './app.router';

// Services

import { GadiService } from './services/gadi.service';
import { httpFactory } from './commons/http.factory';

import { SafePipe } from './commons/pipes';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UploadComponent,
    SearchBikesComponent,
    SearchResultsComponent,
    UploadFormComponent,
    SearchBarComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    MatAutocompleteModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [GadiService, {
    provide: Http,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions]
  }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

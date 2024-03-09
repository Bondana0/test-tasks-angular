import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ShortComponent } from './components/short/short.component';

@NgModule({
  declarations: [
    AppComponent,
    ShortComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgFor,
    NgxDaterangepickerMd.forRoot()
  ],

  bootstrap: [AppComponent],

  providers: [
     provideAnimationsAsync()

  ],
})

export class AppModule {
}

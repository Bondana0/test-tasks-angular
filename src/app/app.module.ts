import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ShortComponent } from './components/short/short.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




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
    NgxDaterangepickerMd.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],

  bootstrap: [AppComponent],

  providers: [
    provideAnimationsAsync(),
    provideMomentDateAdapter(MY_FORMATS)

  ],
})

export class AppModule {
}

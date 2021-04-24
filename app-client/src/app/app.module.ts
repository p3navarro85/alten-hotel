import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfigService, ConfigModule } from './shared/services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteInterceptorService } from './core/interceptors/route-interceptor.service';
import { DatePipe } from '@angular/common';
import { CKEditorModule } from 'ckeditor4-angular';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CKEditorModule,
    DataTablesModule.forRoot()
  ],
  providers: [
    ConfigService,
    DatePipe,
    ConfigModule.init(),
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RouteInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

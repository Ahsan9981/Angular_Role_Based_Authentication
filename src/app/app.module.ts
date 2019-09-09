import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Custom Interceptors
import { FakeBackendInterceptor, JwtInterceptor, ErrorInterceptor } from './_helpers';

// Feature Modules
import { AdminModule  } from 'app/modules/core/admin/admin.module';


// Common Functionality Modules

// App Module Related Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FakeBackendInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

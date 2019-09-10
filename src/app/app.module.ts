import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Custom Interceptors
import { FakeBackendInterceptor, JwtInterceptor, ErrorInterceptor } from './_helpers';

// Feature Modules
import { PublicModule } from 'app/modules/core/public/public.module';
import { AdminModule } from 'app/modules/core/admin/admin.module';
import { UserModule } from 'app/modules/core/user/user.module';

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
    ReactiveFormsModule,
    UserModule,
    AdminModule,
    PublicModule,
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

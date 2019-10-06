import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Custom Interceptors
import { FakeBackendInterceptor, JwtInterceptor, ErrorInterceptor } from './_helpers';

// Data Resolvers
import { SingleUserResolverService } from 'app/_resolvers';

// Feature Modules
import { PublicModule } from 'app/modules/core/public/public.module';
import { AdminModule } from 'app/modules/core/admin/admin.module';
import { UserModule } from 'app/modules/core/user/user.module';

// Common Functionality Modules
import { SharedModule } from 'app/modules/shared/shared.module';

// User Defind Functionality Modules


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
    SharedModule,
    UserModule,
    AdminModule,
    PublicModule,
    AppRoutingModule
  ],
  providers: [
    SingleUserResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

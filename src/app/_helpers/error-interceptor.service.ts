import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent,  HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {

      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      if ([401, 403].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
        location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);

    }));

  }

}

import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {

            // Check if user is unauthorized (401) or request is forbidden (403)
            if ([401, 403].indexOf(err.status ) !== -1) {
                this.authenticationService.logout();
                window.location.reload();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);

        }));

    }

}

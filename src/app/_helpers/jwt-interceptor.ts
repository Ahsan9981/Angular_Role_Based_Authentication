import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment  } from '../../environments/environment';
import {  AuthenticationService  } from '../_services';


// import { environment  } from 'environments/environment';
// import {  AuthenticationService  } from 'app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = this.authenticationService.CurrentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrlValid = request.url.startsWith(environment.apiUrl);

        if (isLoggedIn && isApiUrlValid) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(request);
    }

}

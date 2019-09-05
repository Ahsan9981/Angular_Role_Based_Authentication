import { Injectable } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { delay, merge, materialize, dematerialize, mergeMap } from 'rxjs/operators';

import { User, Role } from '../_models';

// import { User, Role } from 'app/_models';

const users: User[] = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'User', lastName: 'Normal', role: Role.User }
];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body} = request;

    return of(null)
    .pipe(mergeMap(handleRoute))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());

    function handleRoute() {

      switch (true) {

        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          return next.handle(request);
      }

    }

    //#region Route Handling Functions
    function authenticate() {

      const { username, password } = body;

      const user = users.find(x => x.username === username && x.password === password);

      if (!user)  {
        return error('Invalid username or password');
      }

      return ok({
        id: user.id,
        username:  user.username,
        firstName: user.firstName,
        lastName:  user.lastName,
        role:      user.role,
        token:     `fake-jwt-token.${user.id}`
      });

    }

    function getUsers() {

      return (isAdmin()) ? ok(users) : unauthorized();

    }

    function getUserById() {

      if (!isLoggedIn()) {
        return unauthorized();
      }

      // Only users with admin role can access other user data.
      if (!isAdmin() && currentUser().id !== getIdFromUrl()) {
        return unauthorized();
      }

      // Return user data if user is admin.
      const user = users.find(x => x.id === getIdFromUrl());
      return ok(user);

    }
    //#endregion

    //#region Helper Methods
    function getIdFromUrl() {

      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 10);

    }

    function isAdmin() {

      return (isLoggedIn() && currentUser().role === Role.Admin);

    }

    function isLoggedIn() {

      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');

    }

    function currentUser() {

      if (!isLoggedIn()) { return; }
      const id = parseInt(headers.get('Authorization').split('.')[1], 10);
      return users.find(x => x.id === id);

    }

    function error(message) {

      return throwError({status: 400, error: { message }});

    }

    function ok(body) {

      return of(new HttpResponse({status: 200, body}));

    }

    function unauthorized() {

      return throwError({status: 401, error: { message: 'unauthorized' } });

    }
    //#endregion Helper Methods

  }

}

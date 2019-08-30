import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


import { User, Role } from '@app/_models';

const users: User[] = [
  {
    id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin
  },
  {
    id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User
  }
];

@Injectable({
  providedIn: 'root'
})
export class FakeBackendInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const {url, method, headers, body} = request;


    return of(null)
    .pipe(mergeMap(handleRoute))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());


    function handleRoute() {

      switch (true) {

        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method  === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          next.handle(request);

      }

    }

    function authenticate() {

      const {username, password} = body;

      const user = users.find(x => x.username === username && x.password === password);

      if (!user) {
        return error('Username  or password is incorrect');
      }

      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token${user.id}`
      });

    }

    function ok(body) {

      return of(new HttpResponse({status: 200, body}));
    }

    function error(message) {

      return throwError({status: 400,  error: message});
    }

    function getUsers() {

      return (isAdmin()) ? ok(users) : unAuthorized();
    }

    function getUserById() {

      if (!isLoggedIn()) {

        return unAuthorized();
      }

      if (!isAdmin() &&  currentUser().id !== idFromUrl()) {
        return unAuthorized();
      }

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);

    }

    function isAdmin() {

      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    function isLoggedIn() {

      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function currentUser() {

      if (!isLoggedIn()) {
        return;
      }

      const id = parseInt(headers.get('Authorization').split('.')[1], 10);
      return users.find(x => x.id === id);
    }

    function unAuthorized() {

      return throwError({status: 401, error: 'unauthorized'});
    }

    function idFromUrl() {

      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 10);
    }

  }

}

export const fakeBackendProvider = {

  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptorService,
  multi: true

};

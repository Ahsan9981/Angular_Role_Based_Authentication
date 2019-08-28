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
}

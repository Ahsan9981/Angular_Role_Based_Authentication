import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable  } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User } from 'app/_models';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  get CurrentUserValue(): User {

    return this.currentUserSubject.value;

  }

  login(username: string, password: string): Observable<User> {

    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, {username, password}).pipe(map(user => {

      // Login is successful if there's a jwt token in the response.
      if (user && user.token) {
        // Store user information and jwt token in session storage to keep user logged in between page refreshes.
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
    }));

  }

  logout() {

    // Remove  current user information from session storage to log user out of the application.
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }

}

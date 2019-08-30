import { Injectable } from '@angular/core';
import { HttpClient  } from "@angular/common/http";
import { Observable, BehaviorSubject  } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment  } from "@environments/environment";
import { User } from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(userName: string, password: string): Observable<User> {

    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`,{userName, password}).pipe(map(user => {

      if (user && user.token) {
        sessionStorage.setItem('currentUser',  JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }


}

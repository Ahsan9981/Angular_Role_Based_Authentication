import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User, Role } from 'app/_models';
import { AuthenticationService } from 'app/_services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;


  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }


  constructor(private router: Router,
              private authenticationService: AuthenticationService) {


    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}

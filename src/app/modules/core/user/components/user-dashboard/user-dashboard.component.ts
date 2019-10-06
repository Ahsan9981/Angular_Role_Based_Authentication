import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from 'app/_models';
import { UserService, AuthenticationService } from 'app/_services';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  loading = false;
  currentUser: User;
  userFromApi: User;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {

    this.currentUser = this.authenticationService.CurrentUserValue;
  }

  ngOnInit() {

    this.userFromApi = this.route.snapshot.data.user as User;
  }

}

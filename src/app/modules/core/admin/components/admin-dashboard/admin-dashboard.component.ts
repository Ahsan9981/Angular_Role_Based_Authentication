import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'app/_models';
import { UserService  } from 'app/_services';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loading = false;
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }

}

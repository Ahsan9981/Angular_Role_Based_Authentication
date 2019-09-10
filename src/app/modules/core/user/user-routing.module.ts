import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

import { AuthGuard } from 'app/_helpers';

const routes: Routes = [
  { path: '', component: UserDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }

export const userRoutedComponents = [
  UserDashboardComponent
];

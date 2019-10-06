import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

import { AuthGuard } from 'app/_helpers';
import { SingleUserResolverService } from 'app/_resolvers';

const routes: Routes = [
  { path: '', component: UserDashboardComponent, canActivate: [AuthGuard], resolve: {user: SingleUserResolverService} }
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

// import { AuthGuard } from 'app/_helpers';
// import { Role } from 'app/_models';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


export const adminRoutedComponents = [
  AdminDashboardComponent
];

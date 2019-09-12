import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/_helpers';
import { Role } from 'app/_models';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/core/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard], data: { roles: [Role.Admin] }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

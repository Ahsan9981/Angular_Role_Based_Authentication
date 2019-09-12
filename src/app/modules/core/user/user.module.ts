import { NgModule } from '@angular/core';

import { UserRoutingModule, userRoutedComponents } from './user-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';


@NgModule({
  declarations: [
    userRoutedComponents
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }

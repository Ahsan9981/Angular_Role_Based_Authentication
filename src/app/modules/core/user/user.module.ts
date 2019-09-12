import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule, userRoutedComponents } from './user-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';


@NgModule({
  declarations: [
    userRoutedComponents
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }

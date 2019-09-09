import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule, userRoutedComponents } from './user-routing.module';



@NgModule({
  declarations: [
    userRoutedComponents
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

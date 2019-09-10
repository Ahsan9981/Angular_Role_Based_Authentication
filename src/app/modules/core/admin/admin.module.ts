import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule, adminRoutedComponents } from './admin-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  declarations: [
    adminRoutedComponents
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

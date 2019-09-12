import { NgModule } from '@angular/core';

import { AdminRoutingModule, adminRoutedComponents } from './admin-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  declarations: [
    adminRoutedComponents
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

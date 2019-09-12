import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { PublicRoutingModule, publicRoutedComponents } from './public-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  declarations: [
    publicRoutedComponents
  ],
  imports: [
  //  CommonModule,
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }

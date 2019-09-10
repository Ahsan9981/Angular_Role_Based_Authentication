import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule, publicRoutedComponents } from './public-routing.module';


@NgModule({
  declarations: [
    publicRoutedComponents
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }

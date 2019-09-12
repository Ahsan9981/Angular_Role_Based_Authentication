import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

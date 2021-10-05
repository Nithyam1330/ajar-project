import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { PreDefinedModule } from './modules/pre-defined/pre-defined.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomMaterialModule,
    PreDefinedModule
  ],
  exports: [
    CustomMaterialModule,
    PreDefinedModule
  ]
})
export class SharedModule { }

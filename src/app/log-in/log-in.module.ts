import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import { LogInComponent } from './log-in/log-in.component';



@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    LogInComponent
  ]
})
export class LogInModule { }

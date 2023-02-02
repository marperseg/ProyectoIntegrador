import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import { SingUpComponent } from './sing-up/sing-up.component';

@NgModule({
  declarations: [SingUpComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [SingUpComponent],
})
export class SingUpModule {}

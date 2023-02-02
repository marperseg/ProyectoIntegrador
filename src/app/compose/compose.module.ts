import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import { ComposeComponent } from './compose/compose.component';
import { MsgToComponent } from './msg-to/msg-to.component';

@NgModule({
  declarations: [ComposeComponent, MsgToComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [ComposeComponent],
})
export class ComposeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { OutboxComponent } from './outbox/outbox.component';

@NgModule({
  declarations: [OutboxComponent],
  imports: [CommonModule, MaterialModule],
  exports:[OutboxComponent]
})
export class OutboxModule {}

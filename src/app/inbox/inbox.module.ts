import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { InboxComponent } from './inbox/inbox.component';

@NgModule({
  declarations: [InboxComponent],
  imports: [CommonModule, MaterialModule],
  exports: [InboxComponent]
})
export class InboxModule {}

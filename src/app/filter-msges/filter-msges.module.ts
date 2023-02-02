import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { FilterMsgesComponent } from './filter-msges/filter-msges.component';

@NgModule({
  declarations: [FilterMsgesComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [FilterMsgesComponent]
})
export class FilterMsgesModule {}

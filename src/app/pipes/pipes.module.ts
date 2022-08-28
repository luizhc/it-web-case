import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SumPipe } from './sum.pipe';
import { TimestampToDatePipe } from './timestamp-to-date.pipe';

@NgModule({
  declarations: [TimestampToDatePipe, SumPipe],
  imports: [CommonModule],
  exports: [TimestampToDatePipe, SumPipe],
})
export class PipesModule {}

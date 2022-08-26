import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageControlErrorComponent } from './message-control-error/message-control-error.component';

@NgModule({
  declarations: [MessageControlErrorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, MessageControlErrorComponent],
})
export class SharedModule {}

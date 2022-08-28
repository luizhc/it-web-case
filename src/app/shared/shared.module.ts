import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

import { PipesModule } from '../pipes/pipes.module';
import { MessageControlErrorComponent } from './message-control-error/message-control-error.component';
import { NoResultsFoundComponent } from './no-results-found/no-results-found.component';

@NgModule({
  declarations: [MessageControlErrorComponent, NoResultsFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    InputNumberModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MessageControlErrorComponent,
    NoResultsFoundComponent,
    PipesModule,
    InputNumberModule,
  ],
})
export class SharedModule {}

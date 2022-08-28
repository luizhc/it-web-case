import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';
import { MessageControlErrorComponent } from './message-control-error/message-control-error.component';
import { NoResultsFoundComponent } from './no-results-found/no-results-found.component';

@NgModule({
  declarations: [MessageControlErrorComponent, NoResultsFoundComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PipesModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MessageControlErrorComponent,
    NoResultsFoundComponent,
    PipesModule,
  ],
})
export class SharedModule {}

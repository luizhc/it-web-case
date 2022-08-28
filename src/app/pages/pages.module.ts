import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';

import { CategoryComponent } from './category/category.component';
import { CategoryEffects } from './category/state/category.component.effects';
import { CategoryFacade } from './category/state/category.component.facade';
import {
  categoryFeatureKey,
  categoryReducer,
} from './category/state/category.component.reducer';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ExpenseListEffects } from './expense/expense-list/state/expense-list.component.effects';
import { ExpenseListFacade } from './expense/expense-list/state/expense-list.component.facade';
import {
  expenseListFeatureKey,
  expenseListReducer,
} from './expense/expense-list/state/expense-list.component.reducer';

@NgModule({
  declarations: [
    CategoryComponent,
    ExpenseListComponent,
    ExpenseDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(categoryFeatureKey, categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
    StoreModule.forFeature(expenseListFeatureKey, expenseListReducer),
    EffectsModule.forFeature([ExpenseListEffects]),
  ],
  providers: [CategoryFacade, ExpenseListFacade],
})
export class PagesModule {}

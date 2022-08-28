import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  expenseDetailFeatureKey,
  ExpenseDetailState,
} from './expense-detail.component.reducer';

export const selectExpenseDetailState =
  createFeatureSelector<ExpenseDetailState>(expenseDetailFeatureKey);

export const selectIsLoading = createSelector(
  selectExpenseDetailState,
  (state: ExpenseDetailState) => state.isLoading
);

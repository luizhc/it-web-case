import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  expenseListFeatureKey,
  ExpenseListState,
} from './expense-list.component.reducer';

export const selectExpenseListState = createFeatureSelector<ExpenseListState>(
  expenseListFeatureKey
);

export const selectIsLoading = createSelector(
  selectExpenseListState,
  (state: ExpenseListState) => state.isLoading
);

export const selectExpenses = createSelector(
  selectExpenseListState,
  (state: ExpenseListState) => state.expenses
);

export const selectExpenseSelected = createSelector(
  selectExpenseListState,
  (state: ExpenseListState) => state.expenseSelected
);

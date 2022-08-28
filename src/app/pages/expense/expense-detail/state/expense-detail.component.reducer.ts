import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { resetState } from './expense-detail.component.actions';

export const expenseDetailFeatureKey = 'expense-detail';

export interface ExpenseDetailState {
  isLoading: boolean;
}

export const initialState: ExpenseDetailState = {
  isLoading: false,
};

export const expenseDetailReducer: ActionReducer<ExpenseDetailState, Action> =
  createReducer(
    initialState,
    on(resetState, () => ({
      ...initialState,
    }))
  );

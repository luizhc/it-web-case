import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Expense } from '../../../../models/expense.model';
import {
  expenseSelected,
  getExpenses,
  getExpensesFailure,
  getExpensesSuccess,
  resetState,
} from './expense-list.component.actions';

export const expenseListFeatureKey = 'expense-list';

export interface ExpenseListState {
  isLoading: boolean;
  expenses: Expense[];
  expenseSelected: Expense;
}

export const initialState: ExpenseListState = {
  isLoading: false,
  expenses: [],
  expenseSelected: undefined,
};

export const expenseListReducer: ActionReducer<ExpenseListState, Action> =
  createReducer(
    initialState,
    on(resetState, () => ({
      ...initialState,
    })),
    on(getExpenses, (state) => ({
      ...state,
      isLoading: true,
      expenses: [],
    })),
    on(getExpensesSuccess, (state, { expenses }) => ({
      ...state,
      isLoading: false,
      expenses,
    })),
    on(getExpensesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(expenseSelected, (state, { expenseSelected }) => ({
      ...state,
      expenseSelected,
    }))
  );

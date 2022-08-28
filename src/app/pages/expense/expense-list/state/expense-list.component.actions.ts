import { createAction, props } from '@ngrx/store';
import { Expense } from '../../../../models/expense.model';

const actionPrefixName = '[ExpenseList]';

export const resetState = createAction(`${actionPrefixName} Reset State`);

export const getExpenses = createAction(`${actionPrefixName} Get Expenses`);

export const getExpensesSuccess = createAction(
  `${actionPrefixName} Get Expenses Success`,
  props<{ expenses: Expense[] }>()
);

export const getExpensesFailure = createAction(
  `${actionPrefixName} Get Expenses Failure`
);

export const expenseSelected = createAction(
  `${actionPrefixName} Expense Selected`,
  props<{ expenseSelected: Expense }>()
);

export const deleteExpense = createAction(
  `${actionPrefixName} Delete Expense`,
  props<{ expense: Expense }>()
);

export const deleteExpenseSuccess = createAction(
  `${actionPrefixName} Delete Expense Success`
);

export const deleteExpenseFailure = createAction(
  `${actionPrefixName} Delete Expense Failure`
);

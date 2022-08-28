import { createAction, props } from '@ngrx/store';
import { Expense } from '../../../../models/expense.model';

const actionPrefixName = '[ExpenseDetail]';

export const resetState = createAction(`${actionPrefixName} Reset State`);

export const addExpense = createAction(
  `${actionPrefixName} Add Expense`,
  props<{ data: Expense }>()
);

export const addExpenseSuccess = createAction(
  `${actionPrefixName} Add Expense Success`
);

export const addExpenseFailure = createAction(
  `${actionPrefixName} Add Expense Failure`
);

export const updateExpense = createAction(
  `${actionPrefixName} Update Expense`,
  props<{ uid: string; data: Expense }>()
);

export const updateExpenseSuccess = createAction(
  `${actionPrefixName} Update Expense Success`
);

export const updateExpenseFailure = createAction(
  `${actionPrefixName} Update Expense Failure`
);

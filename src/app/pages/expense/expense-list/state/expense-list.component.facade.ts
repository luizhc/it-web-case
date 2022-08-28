import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';

import { Expense } from '../../../../models/expense.model';
import {
  deleteExpense,
  expenseSelected,
  getExpenses,
  resetState,
} from './expense-list.component.actions';
import { ExpenseListState } from './expense-list.component.reducer';
import {
  selectExpenseListState,
  selectExpenses,
  selectExpenseSelected,
  selectIsLoading,
} from './expense-list.component.selectors';

@Injectable()
export class ExpenseListFacade {
  constructor(private store: Store) {}

  resetState() {
    this.store.dispatch(resetState());
  }

  getExpenses() {
    this.store.dispatch(getExpenses());
  }

  deleteExpense(expense: Expense) {
    this.store.dispatch(deleteExpense({ expense }));
  }

  expenseSelected(item: Expense) {
    this.store.dispatch(expenseSelected({ expenseSelected: item }));
  }

  selectExpenseListState$(): Observable<ExpenseListState> {
    return this.store
      .select(selectExpenseListState)
      .pipe(distinctUntilChanged());
  }

  selectExpenseListState(): Observable<ExpenseListState> {
    return this.selectExpenseListState$().pipe(take(1));
  }

  selectExpenses$(): Observable<Expense[]> {
    return this.store.select(selectExpenses).pipe(distinctUntilChanged());
  }

  selectExpenses(): Observable<Expense[]> {
    return this.selectExpenses$().pipe(take(1));
  }

  selectExpenseSelected$(): Observable<Expense> {
    return this.store
      .select(selectExpenseSelected)
      .pipe(distinctUntilChanged());
  }

  selectExpenseSelected(): Observable<Expense> {
    return this.selectExpenseSelected$().pipe(take(1));
  }

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }
}

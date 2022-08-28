import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';

import { Expense } from '../../../../models/expense.model';
import {
  addExpense,
  resetState,
  updateExpense,
} from './expense-detail.component.actions';
import { ExpenseDetailState } from './expense-detail.component.reducer';
import {
  selectExpenseDetailState,
  selectIsLoading,
} from './expense-detail.component.selectors';

@Injectable()
export class ExpenseDetailFacade {
  constructor(private store: Store) {}

  resetState() {
    this.store.dispatch(resetState());
  }

  addExpense(data: Expense) {
    this.store.dispatch(addExpense({ data }));
  }

  updateExpense(uid: string, data: Expense) {
    this.store.dispatch(updateExpense({ uid, data }));
  }

  selectExpenseDetailState$(): Observable<ExpenseDetailState> {
    return this.store
      .select(selectExpenseDetailState)
      .pipe(distinctUntilChanged());
  }

  selectExpenseDetailState(): Observable<ExpenseDetailState> {
    return this.selectExpenseDetailState$().pipe(take(1));
  }

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { SweetAlertIcon } from 'sweetalert2';

import { Messages } from '../../../../constants/messages.constants';
import { AnalyticsEnum } from '../../../../enums/analytics.enum';
import { Expense } from '../../../../models/expense.model';
import { ExpenseService } from '../../../../services/expense.service';
import { MessageService } from '../../../../services/message.service';
import { GlobalFacade } from '../../../../state/global.facade';
import {
  deleteExpense,
  deleteExpenseFailure,
  deleteExpenseSuccess,
  getExpenses,
  getExpensesFailure,
  getExpensesSuccess,
} from './expense-list.component.actions';
import { ExpenseListState } from './expense-list.component.reducer';

@Injectable()
export class ExpenseListEffects {
  constructor(
    private actions$: Actions,
    private store: Store<ExpenseListState>,
    private expenseService: ExpenseService,
    private messageService: MessageService,
    private globalFacade: GlobalFacade
  ) {}

  getExpenses$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getExpenses),
        tap(() => {
          this.expenseService.get().subscribe({
            next: (expenses: Expense[]) =>
              this.store.dispatch(getExpensesSuccess({ expenses })),
            error: () => {
              this.store.dispatch(getExpensesFailure());
              this.messageService.alertWithIcon(
                Messages.ERROR.TITLE,
                Messages.ERROR.TEXT,
                Messages.ERROR.ICON as SweetAlertIcon
              );
            },
          });
        })
      ),
    { dispatch: false }
  );

  deleteExpense$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteExpense),
        tap(({ expense }) => {
          this.messageService
            .confirmBoxDelete(`Lançamento <strong>${expense.name}</strong>`)
            .then((res) => {
              if (res) {
                this.expenseService
                  .delete(expense.uid)
                  .then(() => {
                    this.store.dispatch(deleteExpenseSuccess());
                    this.globalFacade.saveAnalytic(
                      AnalyticsEnum.EXPENSES_DELETED
                    );
                  })
                  .catch(() => {
                    this.store.dispatch(deleteExpenseFailure());
                    this.messageService.alertWithIcon(
                      Messages.ERROR.TITLE,
                      Messages.ERROR.TEXT,
                      Messages.ERROR.ICON as SweetAlertIcon
                    );
                  });
              }
            });
        })
      ),
    { dispatch: false }
  );
}

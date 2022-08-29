import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { SweetAlertIcon } from 'sweetalert2';
import { Messages } from '../../../../constants/messages.constants';
import { AnalyticsEnum } from '../../../../enums/analytics.enum';
import { ExpenseService } from '../../../../services/expense.service';
import { MessageService } from '../../../../services/message.service';
import { GlobalFacade } from '../../../../state/global.facade';
import {
  addExpense,
  addExpenseFailure,
  addExpenseSuccess,
  updateExpense,
  updateExpenseFailure,
  updateExpenseSuccess,
} from './expense-detail.component.actions';
import { ExpenseDetailState } from './expense-detail.component.reducer';

@Injectable()
export class ExpenseDetailEffects {
  constructor(
    private actions$: Actions,
    private store: Store<ExpenseDetailState>,
    private expenseService: ExpenseService,
    private messageService: MessageService,
    private globalFacade: GlobalFacade
  ) {}

  addExpense$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addExpense),
        tap(({ data }) =>
          this.expenseService
            .create(data)
            .then(() => {
              this.messageService.alertWithIcon(
                Messages.INSERT.TITLE,
                Messages.INSERT.TEXT.replace(
                  '{text}',
                  `Lançamento <strong>${data.name}</strong>`
                ),
                Messages.INSERT.ICON as SweetAlertIcon
              );
              this.globalFacade.saveAnalytic(AnalyticsEnum.EXPENSES_CREATED);
              this.store.dispatch(addExpenseSuccess());
            })
            .catch(() => {
              this.store.dispatch(addExpenseFailure());
              this.messageService.alertWithIcon(
                Messages.ERROR.TITLE,
                Messages.ERROR.TEXT,
                Messages.ERROR.ICON as SweetAlertIcon
              );
            })
        )
      ),
    { dispatch: false }
  );

  updateExpense$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateExpense),
        tap(({ uid, data }) =>
          this.expenseService
            .update(uid, data)
            .then(() => {
              this.messageService.alertWithIcon(
                Messages.UPDATE.TITLE,
                Messages.UPDATE.TEXT.replace('{text}', `Lançamento`),
                Messages.UPDATE.ICON as SweetAlertIcon
              );
              this.store.dispatch(updateExpenseSuccess());
              this.globalFacade.saveAnalytic(AnalyticsEnum.EXPENSES_EDITED);
            })
            .catch(() => {
              this.store.dispatch(updateExpenseFailure());
              this.messageService.alertWithIcon(
                Messages.ERROR.TITLE,
                Messages.ERROR.TEXT,
                Messages.ERROR.ICON as SweetAlertIcon
              );
            })
        )
      ),
    { dispatch: false }
  );
}

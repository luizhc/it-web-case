import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { SweetAlertIcon } from 'sweetalert2';
import { Category } from './../../../models/category.model';

import { Messages } from '../../../constants/messages.constants';
import { AnalyticsEnum } from '../../../enums/analytics.enum';
import { CategoryService } from '../../../services/category.service';
import { MessageService } from '../../../services/message.service';
import { GlobalFacade } from '../../../state/global.facade';
import {
  addCategory,
  addCategoryFailure,
  addCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  getCategories,
  getCategoriesFailure,
  getCategoriesSuccess,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess,
} from './category.component.actions';
import { CategoryState } from './category.component.reducer';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CategoryState>,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private globalFacade: GlobalFacade
  ) {}

  getCategories$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCategories),
        tap(() => {
          this.categoryService.get().subscribe({
            next: (categories: Category[]) =>
              this.store.dispatch(getCategoriesSuccess({ categories })),
            error: () => this.store.dispatch(getCategoriesFailure()),
          });
        })
      ),
    { dispatch: false }
  );

  addCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCategory),
        tap(({ data }) =>
          this.categoryService
            .create(data)
            .then(() => {
              this.messageService.alertWithIcon(
                Messages.INSERT.TITLE,
                Messages.INSERT.TEXT.replace(
                  '{text}',
                  `Categoria <strong>${data.description}</strong>`
                ),
                Messages.INSERT.ICON as SweetAlertIcon
              );
              this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_CREATED);
              this.store.dispatch(addCategorySuccess());
            })
            .catch(() => this.store.dispatch(addCategoryFailure()))
        )
      ),
    { dispatch: false }
  );

  updateCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCategory),
        tap(({ uid, data }) =>
          this.categoryService
            .update(uid, data)
            .then(() => {
              this.messageService.alertWithIcon(
                Messages.UPDATE.TITLE,
                Messages.UPDATE.TEXT.replace('{text}', `Categoria`),
                Messages.UPDATE.ICON as SweetAlertIcon
              );
              this.store.dispatch(updateCategorySuccess());
              this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_EDITED);
            })
            .catch(() => this.store.dispatch(updateCategoryFailure()))
        )
      ),
    { dispatch: false }
  );

  deleteCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCategory),
        tap(({ category }) => {
          this.messageService
            .confirmBoxDelete(
              `Categoria <strong>${category.description}</strong>`
            )
            .then((res) => {
              if (res) {
                this.categoryService
                  .delete(category.uid)
                  .then(() => {
                    this.store.dispatch(deleteCategorySuccess());
                    this.globalFacade.saveAnalytic(
                      AnalyticsEnum.CATEGORIES_DELETED
                    );
                  })
                  .catch(() => this.store.dispatch(deleteCategoryFailure()));
              }
            });
        })
      ),
    { dispatch: false }
  );
}

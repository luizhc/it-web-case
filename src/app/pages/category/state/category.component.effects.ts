import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { SweetAlertIcon } from 'sweetalert2';
import { Category } from './../../../models/category.model';

import { Messages } from '../../../constants/messages.constants';
import { CategoryService } from '../../../services/category.service';
import { MessageService } from '../../../services/message.service';
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
    private messageService: MessageService
  ) {}

  getCategories$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getCategories),
        tap(() => {
          this.categoryService.getAll().subscribe({
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
            .add(data)
            .then(() => {
              this.messageService.alertWithIcon(
                Messages.CATEGORY_ADDED.TITLE,
                Messages.CATEGORY_ADDED.TEXT.replace(
                  '{categoria}',
                  `<b>${data.description}</b>`
                ),
                Messages.CATEGORY_ADDED.ICON as SweetAlertIcon
              );
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
                Messages.CATEGORY_UPDATED.TITLE,
                Messages.CATEGORY_UPDATED.TEXT,
                Messages.CATEGORY_UPDATED.ICON as SweetAlertIcon
              );
              this.store.dispatch(updateCategorySuccess());
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
            .confirmBoxDelete(`Categoria <b>${category.description}</b>`)
            .then((res) => {
              if (res) {
                this.categoryService
                  .delete(category.uid)
                  .then(() => this.store.dispatch(deleteCategorySuccess()))
                  .catch(() => this.store.dispatch(deleteCategoryFailure()));
              }
            });
        })
      ),
    { dispatch: false }
  );
}

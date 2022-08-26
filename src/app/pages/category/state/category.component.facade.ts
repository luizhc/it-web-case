import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';

import { Category } from '../../../models/category.model';
import {
  addCategory,
  categorySelected,
  deleteCategory,
  getCategories,
  resetState,
  updateCategory,
} from './category.component.actions';
import { CategoryState } from './category.component.reducer';
import {
  selectCategories,
  selectCategorySelected,
  selectCategoryState,
  selectIsLoading,
} from './category.component.selectors';
@Injectable()
export class CategoryFacade {
  constructor(private store: Store) {}

  resetState() {
    this.store.dispatch(resetState());
  }

  getCategories() {
    this.store.dispatch(getCategories());
  }

  categorySelected(item: Category) {
    this.store.dispatch(categorySelected({ categorySelected: item }));
  }

  addCategory(data: Category) {
    this.store.dispatch(addCategory({ data }));
  }

  updateCategory(uid: string, data: Category) {
    this.store.dispatch(updateCategory({ uid, data }));
  }

  deleteCategory(category: Category) {
    this.store.dispatch(deleteCategory({ category }));
  }

  selectCategoryState$(): Observable<CategoryState> {
    return this.store.select(selectCategoryState).pipe(distinctUntilChanged());
  }

  selectCategoryState(): Observable<CategoryState> {
    return this.selectCategoryState$().pipe(take(1));
  }

  selectCategories$(): Observable<Category[]> {
    return this.store.select(selectCategories).pipe(distinctUntilChanged());
  }

  selectCategories(): Observable<Category[]> {
    return this.selectCategories$().pipe(take(1));
  }

  selectCategorySelected$(): Observable<Category> {
    return this.store
      .select(selectCategorySelected)
      .pipe(distinctUntilChanged());
  }

  selectCategorySelected(): Observable<Category> {
    return this.selectCategorySelected$().pipe(take(1));
  }

  selectIsLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading).pipe(distinctUntilChanged());
  }
}

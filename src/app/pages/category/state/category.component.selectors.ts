import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  categoryFeatureKey,
  CategoryState,
} from './category.component.reducer';

export const selectCategoryState =
  createFeatureSelector<CategoryState>(categoryFeatureKey);

export const selectIsLoading = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.isLoading
);

export const selectCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories
);

export const selectCategorySelected = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categorySelected
);

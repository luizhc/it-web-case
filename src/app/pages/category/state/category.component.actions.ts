import { createAction, props } from '@ngrx/store';
import { Category } from './../../../models/category.model';

const actionPrefixName = '[Category]';

export const resetState = createAction(`${actionPrefixName} Reset State`);

export const getCategories = createAction(`${actionPrefixName} Get Categories`);

export const getCategoriesSuccess = createAction(
  `${actionPrefixName} Get Categories Success`,
  props<{ categories: Category[] }>()
);

export const getCategoriesFailure = createAction(
  `${actionPrefixName} Get Categories Failure`
);

export const categorySelected = createAction(
  `${actionPrefixName} Category Selected`,
  props<{ categorySelected: Category }>()
);

export const addCategory = createAction(
  `${actionPrefixName} Add Category`,
  props<{ data: Category }>()
);

export const addCategorySuccess = createAction(
  `${actionPrefixName} Add Category Success`
);

export const addCategoryFailure = createAction(
  `${actionPrefixName} Add Category Failure`
);

export const updateCategory = createAction(
  `${actionPrefixName} Update Category`,
  props<{ uid: string; data: Category }>()
);

export const updateCategorySuccess = createAction(
  `${actionPrefixName} Update Category Success`
);

export const updateCategoryFailure = createAction(
  `${actionPrefixName} Update Category Failure`
);

export const deleteCategory = createAction(
  `${actionPrefixName} Delete Category`,
  props<{ category: Category }>()
);

export const deleteCategorySuccess = createAction(
  `${actionPrefixName} Delete Category Success`
);

export const deleteCategoryFailure = createAction(
  `${actionPrefixName} Delete Category Failure`
);

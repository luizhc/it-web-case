import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Category } from '../../../models/category.model';
import {
  categorySelected,
  getCategories,
  getCategoriesFailure,
  getCategoriesSuccess,
  resetState,
} from './category.component.actions';

export const categoryFeatureKey = 'category';

export interface CategoryState {
  isLoading: boolean;
  categories: Category[];
  categorySelected: Category;
}

export const initialState: CategoryState = {
  isLoading: false,
  categories: [],
  categorySelected: undefined,
};

export const categoryReducer: ActionReducer<CategoryState, Action> =
  createReducer(
    initialState,
    on(resetState, () => ({
      ...initialState,
    })),
    on(getCategories, (state) => ({
      ...state,
      isLoading: true,
      categories: [],
    })),
    on(getCategoriesSuccess, (state, { categories }) => ({
      ...state,
      isLoading: false,
      categories,
    })),
    on(getCategoriesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(categorySelected, (state, { categorySelected }) => ({
      ...state,
      categorySelected,
    }))
  );

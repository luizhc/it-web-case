import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticsEnum } from '../enums/analytics.enum';
import { globalFeatureKey, GlobalState } from './global.reducer';

export const selectGlobalState =
  createFeatureSelector<GlobalState>(globalFeatureKey);

export const selectVisits = createSelector(
  selectGlobalState,
  (state: GlobalState) =>
    state.analytics.filter((res) => res.analytic === AnalyticsEnum.APP_INIT)
);

export const selectActions = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.analytics
);

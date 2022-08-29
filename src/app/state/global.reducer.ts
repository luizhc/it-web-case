import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Analytics } from '../models/analytics.models';
import {
  getAnalytics,
  getAnalyticsFailure,
  getAnalyticsSuccess,
  resetState,
} from './global.actions';

export const globalFeatureKey = 'global';

export interface GlobalState {
  analytics: Analytics[];
}

export const initialState: GlobalState = {
  analytics: [],
};

export const globalReducer: ActionReducer<GlobalState, Action> = createReducer(
  initialState,
  on(resetState, () => ({
    ...initialState,
  })),
  on(getAnalytics, (state) => ({
    ...state,
    analytics: [],
  })),
  on(getAnalyticsSuccess, (state, { analytics }) => ({
    ...state,
    analytics,
  })),
  on(getAnalyticsFailure, (state) => ({
    ...state,
  }))
);

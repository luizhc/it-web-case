import { createAction, props } from '@ngrx/store';
import { AnalyticsEnum } from '../enums/analytics.enum';
import { Analytics } from '../models/analytics.models';

const actionPrefixName = '[Global]';

export const resetState = createAction(`${actionPrefixName} Reset State`);

export const getAnalytics = createAction(`${actionPrefixName} Get Visits`);

export const getAnalyticsSuccess = createAction(
  `${actionPrefixName} Get Analytics Success`,
  props<{ analytics: Analytics[] }>()
);

export const getAnalyticsFailure = createAction(
  `${actionPrefixName} Get Analytics Failure`
);

export const saveAnalytic = createAction(
  `${actionPrefixName} Save Analytic`,
  props<{ analytic: AnalyticsEnum }>()
);

export const saveAnalyticSuccess = createAction(
  `${actionPrefixName} Save Analytic Success`
);

export const saveAnalyticFailure = createAction(
  `${actionPrefixName} Save Analytic Failure`
);

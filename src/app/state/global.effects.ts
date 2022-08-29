import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { Analytics } from '../models/analytics.models';
import { AnalyticsService } from '../services/analytics.service';
import {
  getAnalytics,
  getAnalyticsFailure,
  getAnalyticsSuccess,
  saveAnalytic,
} from './global.actions';
import { GlobalState } from './global.reducer';

@Injectable()
export class GlobalEffects {
  constructor(
    private actions$: Actions,
    private store: Store<GlobalState>,
    private analyticsService: AnalyticsService
  ) {}

  getAnalytics$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getAnalytics),
        tap(() => {
          this.analyticsService.getAll().subscribe({
            next: (analytics: Analytics[]) =>
              this.store.dispatch(getAnalyticsSuccess({ analytics })),
            error: () => this.store.dispatch(getAnalyticsFailure()),
          });
        })
      ),
    { dispatch: false }
  );

  saveAnalytic$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveAnalytic),
        tap(({ analytic }) => this.analyticsService.save(analytic))
      ),
    { dispatch: false }
  );
}

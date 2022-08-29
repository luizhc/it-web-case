import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  take,
} from 'rxjs/operators';
import { AnalyticsEnum } from '../enums/analytics.enum';
import { Analytics } from '../models/analytics.models';
import { getAnalytics, resetState, saveAnalytic } from './global.actions';
import { GlobalState } from './global.reducer';
import {
  selectActions,
  selectGlobalState,
  selectVisits,
} from './global.selectors';

@Injectable()
export class GlobalFacade {
  constructor(private store: Store) {}

  resetState() {
    this.store.dispatch(resetState());
  }

  getAnalytics() {
    this.store.dispatch(getAnalytics());
  }

  saveAnalytic(analytic: AnalyticsEnum) {
    this.store.dispatch(saveAnalytic({ analytic }));
  }

  selectGlobalState$(): Observable<GlobalState> {
    return this.store.select(selectGlobalState).pipe(distinctUntilChanged());
  }

  selectGlobalState(): Observable<GlobalState> {
    return this.selectGlobalState$().pipe(take(1));
  }

  selectVisits$(): Observable<Analytics[]> {
    return this.store.select(selectVisits).pipe(
      filter((data) => data.length > 0),
      debounceTime(500),
      distinctUntilChanged()
    );
  }

  selectVisits(): Observable<Analytics[]> {
    return this.selectVisits$().pipe(take(1));
  }

  selectActions$(): Observable<Analytics[]> {
    return this.store.select(selectActions).pipe(
      filter((data) => data.length > 0),
      debounceTime(500),
      distinctUntilChanged()
    );
  }

  selectActions(): Observable<Analytics[]> {
    return this.selectActions$().pipe(take(1));
  }
}

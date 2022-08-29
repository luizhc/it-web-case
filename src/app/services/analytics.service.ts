import { FirestoreService } from './firestore.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsEnum } from '../enums/analytics.enum';
import { APIs } from '../enums/apis.enums';
import { Collection } from '../enums/collections.enums';
import { Analytics } from '../models/analytics.models';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    private httpClient: HttpClient,
    private firestoreService: FirestoreService
  ) {}

  save(analytic: AnalyticsEnum) {
    console.info('analytic ===>', analytic);
    this.httpClient.get<Geolocation>(APIs.GEOLOCATION).subscribe({
      next: (geolocation: Geolocation) => {
        this.firestoreService.createOrUpdate(Collection.ANALYTICS, {
          ...geolocation,
          analytic,
        });
      },
      error: () => {
        this.firestoreService.createOrUpdate(Collection.ANALYTICS, {
          analytic,
        });
      },
    });
  }

  getAll(): Observable<Analytics[]> {
    return this.firestoreService.collection$(Collection.ANALYTICS);
  }

  getInit(): Observable<Analytics[]> {
    return this.firestoreService.collection$(Collection.ANALYTICS, (query) =>
      query.where('analytic', '==', AnalyticsEnum.APP_INIT)
    );
  }
}

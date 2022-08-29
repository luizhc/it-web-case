import { AnalyticsEnum } from './../enums/analytics.enum';
import { Geolocation } from './geolocation.model';

export class Analytics {
  analytic: AnalyticsEnum;
  createdAt: string;
  geolocation?: Geolocation;
}

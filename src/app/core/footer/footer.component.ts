import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AnalyticsEnum } from '../../enums/analytics.enum';
import { Analytics } from '../../models/analytics.models';
import { GlobalFacade } from '../../state/global.facade';

@Component({
  selector: 'Footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  visits: string = '';
  actions: string = '';
  destroyed$ = new Subject<void>();

  constructor(private globalFacade: GlobalFacade) {}

  ngOnInit(): void {
    this.setup();
  }

  private setup() {
    this.globalFacade.getAnalytics();
    this.globalFacade
      .selectVisits$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((visits: Analytics[]) => {
        this.visits = ` | ${visits.length} visitas`;
      });
    this.globalFacade
      .selectActions$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((actions: Analytics[]) => {
        this.actions = ` | ${actions.length} ações`;
      });
  }

  goTo(action: 'github' | 'linkedin' | 'instagram') {
    let analyticEnum: AnalyticsEnum;
    switch (action) {
      case 'github':
        analyticEnum = AnalyticsEnum.FOOTER_GITHUB;
        break;
      case 'linkedin':
        analyticEnum = AnalyticsEnum.FOOTER_LINKEDIN;
        break;
      case 'instagram':
        analyticEnum = AnalyticsEnum.FOOTER_INSTAGRAM;
        break;
    }
    this.globalFacade.saveAnalytic(analyticEnum);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

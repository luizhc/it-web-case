import { Component, OnInit } from '@angular/core';
import { AnalyticsEnum } from './enums/analytics.enum';
import { GlobalFacade } from './state/global.facade';

@Component({
  selector: 'Root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'it-web-case';

  constructor(private globalFacade: GlobalFacade) {}

  ngOnInit() {
    this.globalFacade.saveAnalytic(AnalyticsEnum.APP_INIT);
  }
}

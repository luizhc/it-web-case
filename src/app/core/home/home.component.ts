import { Component, OnInit } from '@angular/core';

import { AnalyticsEnum } from '../../enums/analytics.enum';
import { UtilService } from '../../services/util.service';
import { GlobalFacade } from '../../state/global.facade';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public utilService: UtilService,
    private globalFacade: GlobalFacade
  ) {}

  ngOnInit() {}

  goToCategories() {
    this.utilService.navigateByUrl('categorias');
    this.globalFacade.saveAnalytic(AnalyticsEnum.CATEGORIES_INIT);
  }

  goToExpenses() {
    this.utilService.navigateByUrl('lancamentos');
    this.globalFacade.saveAnalytic(AnalyticsEnum.EXPENSES_INIT);
  }
}

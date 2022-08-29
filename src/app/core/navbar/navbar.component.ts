import { Component, OnInit } from '@angular/core';

import { AnalyticsEnum } from '../../enums/analytics.enum';
import { UtilService } from '../../services/util.service';
import { GlobalFacade } from '../../state/global.facade';

@Component({
  selector: 'Navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public utilService: UtilService,
    private globalFacade: GlobalFacade
  ) {}

  ngOnInit() {}

  goToHome(action: 'logo' | 'text') {
    this.utilService.navigateByUrl('/');
    this.globalFacade.saveAnalytic(
      action === 'logo' ? AnalyticsEnum.NAVBAR_LOGO : AnalyticsEnum.NAVBAR_TEXT
    );
  }
}

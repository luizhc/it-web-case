import { Component, OnInit } from '@angular/core';

import { UtilService } from '../../services/util.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
}

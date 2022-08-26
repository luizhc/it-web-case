import { Component, OnInit } from '@angular/core';

import { UtilService } from '../../services/util.service';

@Component({
  selector: 'Navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
}

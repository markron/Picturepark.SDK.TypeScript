import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {

  menuOptions: any[] = [{
    name: 'Search',
    icon: 'search',
    link: ''
  },
  {
    name: 'Collections',
    icon: 'star',
    link: ''
  },
  {
    name: 'Shares',
    icon: 'share',
    link: ''
  }];

  constructor() { }

  ngOnInit() {
  }

}

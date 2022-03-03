import { LoginComponent } from './../login/login.component';
import { Tab3Component } from './../tab3/tab3.component';
import { Tab2Component } from './../tab2/tab2.component';
import { Tab1Component } from './../tab1/tab1.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  tab1 = Tab1Component
  tab2 = Tab2Component
  tab3 = LoginComponent
  tab4 = Tab3Component
  constructor() { }

  ngOnInit() {
  }

}

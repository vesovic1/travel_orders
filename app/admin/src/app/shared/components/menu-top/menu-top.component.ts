import { Component, Input, OnInit } from '@angular/core';
import { appMenuItems } from '@core/components/menu-main/menu_config';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {

  @Input() menu: string = '';
  @Input() position: string = 'top';
  @Input() mainMenuSettings: any;

  public template: any;

  ngOnInit():void {

    this.mainMenuSettings = appMenuItems.find((item:any) => {
      return item.code === this.menu;
    });
  }

}

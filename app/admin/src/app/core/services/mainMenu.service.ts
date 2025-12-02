import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { appMenuItems } from '@core/components/menu-main/menu_config';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

    private menuConfig: any[] = appMenuItems;

    public getMenu(): Observable<any> {
        return of(this.filterMenuItems(this.menuConfig));
    }

    private filterMenuItems(menuItems: any[]): any[] {
        return menuItems.map((item) => {

            if (item.devOnly && environment.production) {
                 return null;
            }

            if (item.children && item.children.length > 0) {
                item.activateOnRoutes = item.children.map((c: any) => {
                    return c.link.join('/').substring(1);
                });
                item.children = this.filterMenuItems(item.children);
            } else {
                if (item.link) {
                    item.activateOnRoutes = [`/${item.link.join('/')}`];
                }
            }

            return item;

        }).filter((item) => item !== null);
    }
}
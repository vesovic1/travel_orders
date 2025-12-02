import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Dialog } from '@angular/cdk/dialog';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { Subject, finalize, takeUntil } from 'rxjs';
import { NotificationService } from '@features/notify/service/notify.service';
import { MenuService } from '@core/services/menu.service';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss']
})
export class MenuMainComponent implements OnInit, OnDestroy {

  public user: any;

  public menuClass:string = '';
  public isClosed: boolean = false;
  public isSticky: boolean = false;
  public loadingMenu: boolean = true;

  public menuItems: any[] = [];

  @ViewChild('mainMenu') mainMenu!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  private _onDestroy = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: Dialog,
    private _notify: NotificationService,
    private menuService: MenuService,
  ) {

  this.menuService.getMenu()
    .pipe(
      takeUntil(this._onDestroy),
      finalize(() => {
        this.loadingMenu = false;
      })
    ).subscribe((menu: any[]) => {
      this.menuItems = menu;

      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          if (this.menuItems.length) {
            const url = val.url.split('?')[0];
            this.menuItems.map((i:any) => {
              if (i.activateOnRoutes && i.activateOnRoutes.length) {
                i.isActive = i.activateOnRoutes.includes(url);
              }
              return i;
            });
          }
        }
      });

    });
  }

  ngOnInit(): void {
    this.authService.userData$.subscribe((user: any) => {
      this.user = user;
    });
  }


  public navigate(item: any): any[] {
    if (item.children.length) {
      return item.children[0].link
    } else {
      return item.link

    }
  }

  public toggleMenu():void {
    if(this.mainMenu.nativeElement.classList.contains('sticky')) {
      this.menuClass = '';
      this.isClosed = false;
      this.isSticky = false;
    } else {
      this.menuClass = 'closed';
      this.isClosed = true;
      this.isSticky = false;
    }
  }

  public menuMouseEnter():void {
    if(this.mainMenu.nativeElement.classList.contains('closed')) {
      this.menuClass = 'sticky';
      this.isSticky = true;
    }
  }

  public menuMouseLeave():void {
    if (this.isClosed) {
      this.menuClass = 'closed';
      this.isSticky = false;
    }
  }


public logout():void {
    this.authService.logout();
    this.router.navigate(['/auth/signin']);

  }

  public profile(): void {
    const profileModal = this.dialog.open(ProfileModalComponent, {
      disableClose: true,
      width: '450px'
    });

    profileModal.closed.pipe(
      takeUntil(this._onDestroy)
    ).subscribe(response => {
      if (response) {
        this.logout();
        this._notify.success('Lozinka je uspešno promenjena');
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}

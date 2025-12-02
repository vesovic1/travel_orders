import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuMainComponent } from './components/menu-main/menu-main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationsHolderComponent } from './components/notifications-holder/notifications-holder.component';
import { ApiService } from './services/api.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorsInterceptor } from './interceptors/error.interceptor';
import { ProfileModalComponent } from './components/menu-main/profile-modal/profile-modal.component';
import { ForbiddenAccessComponent } from './components/forbidden-access/forbidden-access.component';
import { ForbiddenAccessModalComponent } from './components/forbidden-access-modal/forbidden-access-modal.component';

@NgModule({
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorsInterceptor,
        multi: true,
    },
],
  exports: [
    MenuMainComponent,
    NotificationsHolderComponent,
    ProfileModalComponent,
    ForbiddenAccessModalComponent,
    ForbiddenAccessComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    MenuMainComponent,
    NotFoundComponent,
    NotificationsHolderComponent,
    ProfileModalComponent,
    ForbiddenAccessModalComponent,
    ForbiddenAccessComponent
  ]
})
export class CoreModule {

}
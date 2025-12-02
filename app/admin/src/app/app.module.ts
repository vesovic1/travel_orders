import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeRs from '@angular/common/locales/sr-Latn';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { NotificationService } from '@features/notify/service/notify.service';
import { HttpClientModule } from '@angular/common/http';


registerLocaleData(localeRs);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    // HttpClientModule,
  ],
  providers: [
    NotificationService,
    { provide: LOCALE_ID, useValue: 'sr-Latn'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

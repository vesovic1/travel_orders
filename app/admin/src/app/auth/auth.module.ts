import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

@NgModule({
    declarations: [SigninComponent],
    imports: [CommonModule, AuthRoutingModule, SharedModule, CoreModule],
    providers: [],
})
export class AuthModule {}

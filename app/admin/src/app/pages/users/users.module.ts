import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users.routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditModalComponent } from './users-edit-modal/users-edit-modal.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersEditModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
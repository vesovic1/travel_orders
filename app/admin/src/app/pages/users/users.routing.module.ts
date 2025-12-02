import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { PermissionAuthGuard } from '@core/auth-permission.guard';

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: UsersListComponent,
        canActivate: [PermissionAuthGuard],
        data: {
            permissions: ['users']
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
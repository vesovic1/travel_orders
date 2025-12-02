import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForbiddenAccessComponent } from '@core/components/forbidden-access/forbidden-access.component';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';
import { environment } from 'src/environments/environment';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./pages/users/users.module').then((m) => m.UsersModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    { path: '404', component: NotFoundComponent },
    { path: '403', component: ForbiddenAccessComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];



let devRoutes: Routes = [];
if (!environment.production) {
    devRoutes = [
        {
            path: 'components',
            loadChildren: () =>
                import('./pages/components/components.module').then(
                    (m) => m.ComponentsModule,
                ),
        }
    ];
}



@NgModule({
    imports: [RouterModule.forRoot([...devRoutes, ...routes])],
    exports: [RouterModule],
})
export class AppRoutingModule {}

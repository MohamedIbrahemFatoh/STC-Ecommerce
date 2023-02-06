import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard';
import {BasicLayoutComponent} from './layout/basic/basic-layout.component';
import {NoPermissionComponent} from './shared/components/no-permission/no-permission.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'admin',
    component: BasicLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', loadChildren: () => import('./features/admin-view/admin-view.module').then(m => m.AdminViewModule) },


      {path: 'no-permission', component: NoPermissionComponent},
    ],
  },
  {
    path: 'user',
    component: BasicLayoutComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', loadChildren: () => import('./features/user-view/user-view.module').then(m => m.UserViewModule) },


      {path: 'no-permission', component: NoPermissionComponent},
    ],
  },
  {path: '**', component: PageNotFoundComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

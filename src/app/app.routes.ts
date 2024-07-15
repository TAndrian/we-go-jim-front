import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      return '/login';
    },
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./layout/home/home-routes').then((m) => m.routes)
  },
  {
    path: 'login',
    loadChildren: () => import('./layout/login/login-routes').then((m) => m.routes)
  },
  {
    path: 'register',
    loadChildren: () => import('./layout/register/register-routes').then((m) => m.routes)
  }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { CalendarSkeletonComponent } from './shared/skeleton/calendar/calendar-skeleton.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      return '/home/calendar';
    },
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'calendar', component: CalendarSkeletonComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

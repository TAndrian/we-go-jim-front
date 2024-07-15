import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CalendarSkeletonComponent } from '../../shared/skeleton/calendar/calendar-skeleton.component';
import { BookingComponent } from '../../features/booking/component/booking.component';
import { SettingsComponent } from '../../features/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'calendar', component: CalendarSkeletonComponent },
      { path: 'history', component: BookingComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

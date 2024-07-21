import { Routes } from '@angular/router';
import { BookingComponent } from '../../features/booking/component/booking.component';
import { HistoryComponent } from '../../features/history/component/history.component';
import { SettingsComponent } from '../../features/settings/settings.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'calendar', component: BookingComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

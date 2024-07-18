import { Routes } from '@angular/router';
import { SettingsComponent } from '../../features/settings/settings.component';
import { CalendarSkeletonComponent } from '../../shared/skeleton/calendar/calendar-skeleton.component';
import { HomeComponent } from './home.component';
import { HistoryComponent } from '../../features/history/component/history.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'calendar', component: CalendarSkeletonComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

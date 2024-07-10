import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SIDENAV_MAIN_SECTIONS, SIDNAV_UTIL_SECTIONS } from './util/sidenav-sections';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AvatarComponent } from '../avatar/avatar.component';
import { AvatarModule } from 'primeng/avatar';
import { CalendarSkeletonComponent } from '../skeleton/calendar/calendar-skeleton.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    PanelMenuModule,
    AvatarComponent,
    AvatarModule,
    CalendarSkeletonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  mainSections: MenuItem[] = SIDENAV_MAIN_SECTIONS;
  utilSections: MenuItem[] = SIDNAV_UTIL_SECTIONS;
}

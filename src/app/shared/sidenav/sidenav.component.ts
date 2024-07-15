import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SIDENAV_MAIN_SECTIONS, SIDNAV_UTIL_SECTIONS } from './util/sidenav-sections';
import { AvatarComponent } from '../avatar/avatar.component';
import { CalendarSkeletonComponent } from '../skeleton/calendar/calendar-skeleton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    AvatarComponent,
    CalendarSkeletonComponent,
    CommonModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  mainSections = SIDENAV_MAIN_SECTIONS;
  utilSections = SIDNAV_UTIL_SECTIONS;
}

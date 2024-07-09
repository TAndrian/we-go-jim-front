import { SidenavSection } from '../model/sidenav-section';
import { PrimeIcons } from 'primeng/api';

export const SIDENAV__MAIN_SECTIONS: Array<SidenavSection> = [
  {
    label: 'Planing',
    icon: PrimeIcons.CALENDAR_PLUS,
    routerLink: '/home/calendar'
  },
  {
    label: 'History',
    icon: PrimeIcons.HISTORY,
    routerLink: '/home/history'
  }
];

export const SIDNAV_UTIL_SECTIONS: Array<SidenavSection> = [
  {
    label: 'Settings',
    icon: PrimeIcons.COG,
    routerLink: '/home/settings'
  },
  {
    label: 'Logout',
    icon: PrimeIcons.SIGN_OUT,
    routerLink: '/login'
  }
];

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-skeleton.component.html',
  styleUrl: './calendar-skeleton.component.scss'
})
export class CalendarSkeletonComponent {}

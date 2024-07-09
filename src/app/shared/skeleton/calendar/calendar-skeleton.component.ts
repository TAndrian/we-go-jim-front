import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-calendar-skeleton',
  standalone: true,
  imports: [SkeletonModule, CommonModule],
  templateUrl: './calendar-skeleton.component.html',
  styleUrl: './calendar-skeleton.component.scss'
})
export class CalendarSkeletonComponent {}

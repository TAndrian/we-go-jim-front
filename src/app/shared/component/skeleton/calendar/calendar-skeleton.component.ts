import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-calendar-skeleton',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './calendar-skeleton.component.html',
  styleUrl: './calendar-skeleton.component.scss'
})
export class CalendarSkeletonComponent {}

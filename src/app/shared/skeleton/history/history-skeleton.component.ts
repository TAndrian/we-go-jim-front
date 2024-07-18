import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-history-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CommonModule],
  templateUrl: './history-skeleton.component.html',
  styleUrl: './history-skeleton.component.scss'
})
export class HistorySkeletonComponent {}
